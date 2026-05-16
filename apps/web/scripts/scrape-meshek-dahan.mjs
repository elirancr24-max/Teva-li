// Scraper for meshek-dahan.co.il product catalog.
// Visits 6 categories, scrolls a virtualized product grid, extracts cards.
//
// Usage: node scripts/scrape-meshek-dahan.mjs
//
// Output: scripts/meshek-dahan-catalog.json

import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, 'meshek-dahan-catalog.json');

const CATEGORIES = [
  { slug: 'vegetables', label: 'ירקניה', url: 'https://www.meshek-dahan.co.il/category/9499/%D7%99%D7%A8%D7%A7%D7%A0%D7%99%D7%94' },
  { slug: 'fruits', label: 'פירות', url: 'https://www.meshek-dahan.co.il/category/5134/%D7%A4%D7%99%D7%A8%D7%95%D7%AA' },
  { slug: 'mushrooms-sprouts', label: 'פטריות ונבטים', url: 'https://www.meshek-dahan.co.il/category/5197/%D7%A4%D7%98%D7%A8%D7%99%D7%95%D7%AA_%D7%95%D7%A0%D7%91%D7%98%D7%99%D7%9D' },
  { slug: 'general', label: 'מוצרים כלליים', url: 'https://www.meshek-dahan.co.il/category/5353/%D7%9E%D7%95%D7%A6%D7%A8%D7%99%D7%9D_%D7%9B%D7%9C%D7%9C%D7%99%D7%99%D7%9D' },
  { slug: 'dried', label: 'פירות יבשים במשקל', url: 'https://www.meshek-dahan.co.il/category/7926/%D7%A4%D7%99%D7%A8%D7%95%D7%AA_%D7%99%D7%91%D7%A9%D7%99%D7%9D_%D7%91%D7%9E%D7%A9%D7%A7%D7%9C' },
  { slug: 'spreads', label: 'ממרחים ורטבים', url: 'https://www.meshek-dahan.co.il/category/8021/%D7%9E%D7%9E%D7%A8%D7%97%D7%99%D7%9D_%D7%95%D7%A8%D7%98%D7%91%D7%99%D7%9D' },
];

const UNITS = ['ק"ג', 'יח\'', 'מארז', 'צרור', 'חב\'', 'גרם'];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(fn, label, attempts = 3) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      console.warn(`  [retry ${i}/${attempts}] ${label}: ${err.message}`);
      await sleep(1000 * i);
    }
  }
  throw lastErr;
}

function unwrapNextImageUrl(src) {
  if (!src) return src;
  try {
    if (src.includes('/_next/image')) {
      // src is relative like /_next/image?url=...&w=...
      const u = new URL(src, 'https://www.meshek-dahan.co.il');
      const inner = u.searchParams.get('url');
      if (inner) return decodeURIComponent(inner);
    }
    if (src.startsWith('//')) return 'https:' + src;
    if (src.startsWith('/')) return 'https://www.meshek-dahan.co.il' + src;
    return src;
  } catch {
    return src;
  }
}

async function extractCardsOnPage(page) {
  // Collect cards present in DOM right now.
  return await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('[class*="StyledProductCardWrapper"]'));
    return cards.map((card) => {
      const link = card.querySelector('a[href*="/product-details/"]');
      const href = link ? link.getAttribute('href') : null;
      let id = null;
      if (href) {
        const m = href.match(/\/product-details\/(\d+)/);
        if (m) id = m[1];
      }
      // Product image: explicitly EXCLUDE anything inside country-flag wrapper.
      const imgs = Array.from(card.querySelectorAll('img')).filter((i) => {
        // Skip flag wrapper
        if (i.closest('[class*="StyledCountryIcon"], [class*="CountryIcon"]')) return false;
        const src = i.getAttribute('src') || '';
        if (src.includes('/country/') || src.includes('il.svg')) return false;
        const alt = i.getAttribute('alt') || '';
        if (alt === 'il' || alt.length <= 3) return false;
        return true;
      });
      const productImg = imgs[0] || null;
      let imageUrl = null;
      let name = '';
      if (productImg) {
        imageUrl = productImg.getAttribute('src') || productImg.getAttribute('data-src') || '';
        if (!imageUrl) {
          const ss = productImg.getAttribute('srcset') || '';
          const first = ss.split(',')[0]?.trim().split(/\s+/)[0];
          if (first) imageUrl = first;
        }
        name = (productImg.getAttribute('alt') || '').replace(/\n/g, ' ').trim();
      }
      // Fallback: try product name from a known label class
      if (!name) {
        const titleEl = card.querySelector('[class*="ProductName"], [class*="StyledTitle"], h3, h4');
        if (titleEl) name = (titleEl.textContent || '').replace(/\n/g, ' ').trim();
      }

      // Tag detection from DOM, not card text (text may include partial matches).
      const tagWrapper = card.querySelector('[class*="StyledQualityTagWrapper"]');
      const tagLabel = tagWrapper ? (tagWrapper.querySelector('[class*="StyledTagLabel"]')?.textContent || '').trim() : '';
      const isPremium = tagLabel.includes('פרימיום');

      const promoWrapper = card.querySelector('[class*="StyledPromotionTagWrapper"]');
      const promoText = promoWrapper ? (promoWrapper.textContent || '').trim() : '';
      const isDiscount = promoText.includes('הנחה');

      const text = card.innerText || card.textContent || '';
      return { id, name, imageUrl, text, isPremium, isDiscount };
    }).filter((c) => c.id);
  });
}

function parseCardExtras(text) {
  // First ₪ number is the current (possibly discounted) price.
  const priceMatch = text.match(/₪\s*([0-9]+(?:\.[0-9]+)?)/);
  const priceShekels = priceMatch ? Number(priceMatch[1]) : null;

  // Unit normally appears after "/" e.g. "/ק\"ג", but a plain mention is fine.
  let unit = null;
  for (const u of UNITS) {
    if (text.includes(u)) {
      unit = u;
      break;
    }
  }
  return { priceShekels, unit };
}

async function scrapeCategory(browser, category) {
  console.log(`\n[category] ${category.label} (${category.slug})`);
  const context = await browser.newContext({
    viewport: { width: 1366, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    locale: 'he-IL',
  });
  const page = await context.newPage();
  const map = new Map();

  try {
    await withRetry(async () => {
      await page.goto(category.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    }, `goto ${category.slug}`);

    // Wait for at least one card to appear
    try {
      await page.waitForSelector('[class*="StyledProductCardWrapper"]', { timeout: 30000 });
    } catch (e) {
      console.warn(`  no cards appeared within 30s, will try anyway`);
    }

    // Incremental scroll loop. Keep going while we keep adding products.
    let lastCount = 0;
    let stagnantRounds = 0;
    const maxStagnant = 10;
    const maxRounds = 300;

    for (let round = 0; round < maxRounds; round++) {
      const cards = await extractCardsOnPage(page);
      for (const c of cards) {
        if (!map.has(c.id)) {
          const extras = parseCardExtras(c.text || '');
          map.set(c.id, {
            id: c.id,
            name: c.name,
            imageUrl: unwrapNextImageUrl(c.imageUrl),
            priceShekels: extras.priceShekels,
            unit: extras.unit,
            isPremium: !!c.isPremium,
            isDiscount: !!c.isDiscount,
            category: category.label,
            categorySlug: category.slug,
          });
        }
      }

      if (map.size === lastCount) {
        stagnantRounds++;
      } else {
        stagnantRounds = 0;
        lastCount = map.size;
      }

      if (stagnantRounds >= maxStagnant) break;

      // Scroll a bit
      await page.evaluate(() => {
        window.scrollBy(0, Math.max(400, window.innerHeight * 0.8));
      });
      await sleep(700);

      if (round % 10 === 0) {
        console.log(`  [round ${round}] products so far: ${map.size}`);
      }
    }

    // Final pass: scroll back to top to recapture any virtualized rows
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(800);
    const topCards = await extractCardsOnPage(page);
    for (const c of topCards) {
      if (!map.has(c.id)) {
        const extras = parseCardExtras(c.text || '');
        map.set(c.id, {
          id: c.id,
          name: c.name,
          imageUrl: unwrapNextImageUrl(c.imageUrl),
          priceShekels: extras.priceShekels,
          unit: extras.unit,
          isPremium: extras.isPremium,
          isDiscount: extras.isDiscount,
          category: category.label,
          categorySlug: category.slug,
        });
      }
    }

    console.log(`  [done] ${category.label}: ${map.size} products`);
  } catch (err) {
    console.error(`  [error] category ${category.slug}: ${err.message}`);
  } finally {
    await context.close();
  }

  return Array.from(map.values());
}

async function main() {
  console.log(`[scraper] launching chromium...`);
  const browser = await chromium.launch({ headless: true });
  const allByCategory = {};
  const merged = new Map();

  try {
    for (const cat of CATEGORIES) {
      const products = await scrapeCategory(browser, cat);
      allByCategory[cat.slug] = products.length;
      for (const p of products) {
        if (!merged.has(p.id)) merged.set(p.id, p);
      }
    }
  } finally {
    await browser.close();
  }

  const products = Array.from(merged.values());
  const payload = {
    generatedAt: new Date().toISOString(),
    perCategoryCount: allByCategory,
    totalUnique: products.length,
    products,
  };
  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`\n[scraper] wrote ${products.length} unique products to ${OUTPUT_PATH}`);
  console.log(`[scraper] per category:`, allByCategory);
}

main().catch((err) => {
  console.error('[scraper] fatal:', err);
  process.exit(1);
});

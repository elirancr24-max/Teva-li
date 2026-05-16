#!/usr/bin/env node
// seed-from-catalog.mjs
// Reads meshek-dahan-catalog-mirrored.json (from B1) and UPSERTs into Supabase.
// Idempotent — safe to re-run.
//
// Usage:
//   node scripts/seed-from-catalog.mjs
//
// Requires .env.local with:
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ENV_PATH = resolve(ROOT, '.env.local');
// B1 may emit either filename — prefer the mirrored variant.
const CATALOG_CANDIDATES = [
  resolve(ROOT, 'meshek-dahan-catalog-mirrored.json'),
  resolve(ROOT, 'scripts', 'meshek-dahan-catalog-mirrored.json'),
  resolve(ROOT, 'meshek-dahan-catalog.json'),
  resolve(ROOT, 'scripts', 'meshek-dahan-catalog.json'),
];

// ─── Env parser (no dotenv) ──────────────────────────────────────────────────
function loadEnv(file) {
  const txt = readFileSync(file, 'utf8');
  const out = {};
  for (const raw of txt.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

// ─── Wait for catalog file (B1 may still be running) ─────────────────────────
async function waitForCatalog(candidates, maxMinutes = 10) {
  const deadline = Date.now() + maxMinutes * 60_000;
  let warned = false;
  while (Date.now() < deadline) {
    for (const path of candidates) {
      if (existsSync(path)) {
        try {
          const txt = readFileSync(path, 'utf8');
          if (txt.trim().length > 10) {
            console.log(`[seed] using catalog: ${path}`);
            return JSON.parse(txt);
          }
        } catch {
          // partial write, keep waiting
        }
      }
    }
    if (!warned) {
      console.log(`[seed] waiting for catalog file from B1 scraper...`);
      console.log(`[seed] checking: ${candidates.join(', ')}`);
      warned = true;
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error(`Catalog file not found after ${maxMinutes}min`);
}

// ─── Hebrew → latin slug ─────────────────────────────────────────────────────
const HE_LATIN = {
  א: 'a', ב: 'b', ג: 'g', ד: 'd', ה: 'h', ו: 'v', ז: 'z', ח: 'ch',
  ט: 't', י: 'y', כ: 'k', ך: 'k', ל: 'l', מ: 'm', ם: 'm', נ: 'n', ן: 'n',
  ס: 's', ע: 'a', פ: 'p', ף: 'p', צ: 'tz', ץ: 'tz', ק: 'q', ר: 'r',
  ש: 'sh', ת: 't',
};
function toSlug(s, fallback) {
  if (!s) return fallback;
  const latin = [...String(s)]
    .map((ch) => HE_LATIN[ch] ?? (/[a-z0-9]/i.test(ch) ? ch : '-'))
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return latin || fallback;
}

// ─── Heuristic: kind from Hebrew name ────────────────────────────────────────
const KIND_RULES = [
  [/אבטיח/, 'watermelon'],
  [/מנגו/, 'mango'],
  [/אננס/, 'pineapple'],
  [/תות/, 'strawberry'],
  [/אוכמנ/, 'blueberry'],
  [/פטל/, 'berry'],
  [/דובדבן|דובדבנ/, 'cherry'],
  [/ענב/, 'grape'],
  [/קיווי/, 'kiwi'],
  [/אגס/, 'pear'],
  [/אפרסק/, 'peach'],
  [/נקטרינ/, 'nectarine'],
  [/שזיפ|שזיף/, 'plum'],
  [/משמש|מישמיש/, 'apricot'],
  [/רימון|רימונ/, 'pomegranate'],
  [/פומל/, 'pomelo'],
  [/אשכולית|אשכולי/, 'grapefruit'],
  [/תפוז|קלמנטינ/, 'orange'],
  [/לימון|לימונ/, 'lemon'],
  [/בננ/, 'banana'],
  [/פסיפלור/, 'passion-fruit'],
  [/ליצ/, 'lychee'],
  [/קוקוס/, 'coconut'],
  [/תאנ/, 'fig'],
  [/גויב/, 'guava'],
  [/סברס/, 'cactus-pear'],
  [/תפוח עץ|תפוח/, 'apple'],
  [/מלון/, 'melon'],
  [/עגבני/, 'tomato'],
  [/מלפפון|מלפפונ/, 'cucumber'],
  [/חציל/, 'eggplant'],
  [/קישוא/, 'zucchini'],
  [/גזר/, 'carrot'],
  [/בצל/, 'onion'],
  [/שום/, 'garlic'],
  [/תפו"א|תפוח אדמה|תפוא/, 'potato'],
  [/גמבה|פלפל/, 'pepper'],
  [/כרוב/, 'cabbage'],
  [/סלק/, 'beet'],
  [/חס/, 'lettuce'],
  [/לפת/, 'turnip'],
  [/כולרבי/, 'kohlrabi'],
  [/צנון/, 'radish'],
  [/תירס/, 'corn'],
  [/פרסה|פרס/, 'leek'],
  [/פטרוזיל/, 'parsley'],
  [/כוסבר/, 'coriander'],
  [/שמיר/, 'dill'],
  [/נענ/, 'mint'],
  [/סלרי|כרפס/, 'celery'],
  [/פטרי/, 'mushroom'],
  [/נבט/, 'sprout'],
  [/תמר/, 'date'],
  [/אגוז|שקד|קשיו|בוטן/, 'nut'],
  [/צימוק|פרי יבש/, 'dried-fruit'],
  [/חמאת|ממרח|רוטב|טחינ/, 'spread'],
  [/דבש/, 'honey'],
  [/שמן/, 'oil'],
];
function inferKind(name, fallback) {
  for (const [re, k] of KIND_RULES) if (re.test(name)) return k;
  return fallback || 'misc';
}

// ─── Map JSON category → our DB slug ─────────────────────────────────────────
const CATEGORY_MAP = {
  // direct slug matches → as-is
  vegetables: 'vegetables',
  fruits: 'fruits',
  mushrooms: 'mushrooms',
  'mushrooms-sprouts': 'mushrooms',
  sprouts: 'mushrooms',
  dried: 'dried',
  'dried-fruits': 'dried',
  spreads: 'spreads',
  sauces: 'spreads',
  grocery: 'grocery',
  general: 'grocery',
  // Hebrew labels (in case scraper passes name_he as category)
  'ירקות': 'vegetables',
  'ירקניה': 'vegetables',
  'פירות': 'fruits',
  'פטריות ונבטים': 'mushrooms',
  'פטריות': 'mushrooms',
  'נבטים': 'mushrooms',
  'פירות יבשים': 'dried',
  'פירות יבשים במשקל': 'dried',
  'ממרחים ורטבים': 'spreads',
  'ממרחים': 'spreads',
  'רטבים': 'spreads',
  'מוצרים כלליים': 'grocery',
  'מכולת': 'grocery',
};

function mapCategorySlug(raw) {
  if (!raw) return 'grocery';
  const key = String(raw).trim();
  return CATEGORY_MAP[key] ?? CATEGORY_MAP[key.toLowerCase()] ?? 'grocery';
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const env = loadEnv(ENV_PATH);
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  }

  console.log(`[seed] supabase: ${url}`);

  const catalog = await waitForCatalog(CATALOG_CANDIDATES, 10);
  const items = Array.isArray(catalog) ? catalog : (catalog.products ?? []);
  console.log(`[seed] loaded ${items.length} catalog items`);

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Fetch our category slug → id map
  const { data: cats, error: catErr } = await supabase
    .from('categories')
    .select('id, slug');
  if (catErr) throw catErr;
  const catBySlug = new Map((cats ?? []).map((c) => [c.slug, c.id]));
  console.log(`[seed] ${catBySlug.size} categories in db`);

  // Build product rows
  const rows = [];
  let skipped = 0;
  const seenSlugs = new Set();
  for (const item of items) {
    const name_he = (item.name_he || item.name || '').trim();
    // Guard against B1 scraper extracting flag SVG alt-text ('il', 'us', etc.)
    // or empty names — those would poison the storefront.
    if (!name_he || name_he.length < 2 || /^[a-z]{2,3}$/i.test(name_he)) {
      skipped++;
      continue;
    }
    const idPart = item.id || item.sku || '';
    let slug = toSlug(name_he, idPart ? `md-${idPart}` : `md-${rows.length + 1}`);
    // De-dupe slugs (different items can transliterate to the same)
    if (seenSlugs.has(slug)) slug = `${slug}-${idPart || rows.length + 1}`;
    seenSlugs.add(slug);

    const catSlug = mapCategorySlug(
      item.categorySlug || item.category_slug || item.category || item.category_he,
    );
    const category_id = catBySlug.get(catSlug) ?? catBySlug.get('grocery') ?? null;
    const weight = (item.weight || item.unit_label || item.unit || 'יחידה').toString();
    const price_cents = Math.round(
      Number(
        item.price_cents ??
          (item.priceShekels != null
            ? Number(item.priceShekels) * 100
            : item.price != null
            ? Number(item.price) * 100
            : 0),
      ),
    );
    // Prefer mirroredUrl (our Supabase Storage) over the original rexail CDN URL.
    const image_url = item.mirroredUrl || item.image_url || item.imageUrl || item.image || null;
    const kind = item.kind || inferKind(name_he);
    const tag = item.tag ?? (item.isPremium ? 'פרימיום' : item.isDiscount ? 'מבצע' : null);

    // NOTE: omit `stock` and `sort_order` — those columns don't exist in current DB
    // (migration 004 only ran partially — `image_url` exists but `stock`/`sort_order` missing).
    // Will be added when user runs the leftover migrations in morning.
    rows.push({
      slug,
      name_he,
      name_en: item.name_en ?? null,
      category_id,
      kind,
      price_cents,
      weight,
      description_he: item.description_he ?? item.description ?? null,
      tag,
      active: true,
      image_url,
    });
  }
  console.log(`[seed] prepared ${rows.length} product rows (skipped ${skipped})`);

  if (process.env.DRY_RUN === '1') {
    console.log('[seed] DRY_RUN=1 — printing first 3 rows then exiting');
    for (const r of rows.slice(0, 3)) console.log(JSON.stringify(r, null, 2));
    const byCat = {};
    for (const r of rows) byCat[r.category_id || 'null'] = (byCat[r.category_id || 'null'] || 0) + 1;
    console.log('[seed] rows per category_id:', byCat);
    return;
  }

  // UPSERT in batches of 20, in parallel of 4 batches at a time
  const BATCH = 20;
  const CONCURRENCY = 4;
  const batches = [];
  for (let i = 0; i < rows.length; i += BATCH) batches.push(rows.slice(i, i + BATCH));

  let done = 0;
  let failed = 0;
  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const slice = batches.slice(i, i + CONCURRENCY);
    const results = await Promise.allSettled(
      slice.map((batch) =>
        supabase
          .from('products')
          .upsert(batch, { onConflict: 'slug' })
          .select('slug'),
      ),
    );
    for (const r of results) {
      if (r.status === 'fulfilled' && !r.value.error) {
        done += r.value.data?.length ?? 0;
      } else {
        failed += 1;
        const err = r.status === 'rejected' ? r.reason : r.value.error;
        console.error('[seed] batch error:', err?.message || err);
      }
    }
    console.log(`[seed] progress: ${done}/${rows.length}`);
  }

  console.log(`[seed] done. upserted=${done} batches_failed=${failed}`);
}

main().catch((err) => {
  console.error('[seed] FATAL:', err);
  process.exit(1);
});

import { Box } from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryNavbar } from '@/components/layout/CategoryNavbar';
import { Hero } from '@/components/home/Hero';
import { TrustBadges } from '@/components/home/TrustBadges';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { HomeFeatured } from '@/components/home/HomeFeatured';
import { DeliveryAreas } from '@/components/home/DeliveryAreas';
import { AboutSection } from '@/components/home/AboutSection';
import { KayakTeaser } from '@/components/home/KayakTeaser';
import { CTABanner } from '@/components/home/CTABanner';
import { getCatalog } from '@/lib/data/products';
import { getSettings, whatsappLink } from '@/lib/settings';
import { BRAND } from '@/lib/brand';
import type { Product } from '@/types/shop';

export default async function Home() {
  const [{ products, categories }, settings] = await Promise.all([
    getCatalog(),
    getSettings(),
  ]);

  const wa = whatsappLink(
    settings.business_whatsapp,
    `היי ${settings.business_name}, אשמח לפרטים על הזמנה.`,
  );

  // Featured = balanced mix across categories so the home rail isn't all from one
  // section (cups, fruits, vegetables, peeled, etc). We take up to 2 per category
  // in round-robin order, then pad up to 8 from the remaining catalog.
  const FEATURED_COUNT = 8;
  const MAX_PER_CATEGORY = 2;
  const byCategory = new Map<string, Product[]>();
  for (const p of products) {
    const key = p.categoryId ?? 'misc';
    if (!byCategory.has(key)) byCategory.set(key, []);
    byCategory.get(key)!.push(p);
  }
  // Sort categories so the catalog-defined order leads
  const orderedCatIds = categories.map((c) => c.id);
  for (const c of byCategory.keys()) {
    if (!orderedCatIds.includes(c)) orderedCatIds.push(c);
  }
  const pickedIds = new Set<string>();
  const featured: Product[] = [];
  // Round 1: one per category
  for (const cid of orderedCatIds) {
    if (featured.length >= FEATURED_COUNT) break;
    const list = byCategory.get(cid);
    if (!list || list.length === 0) continue;
    const pick = list[0];
    if (pick && !pickedIds.has(pick.id)) {
      featured.push(pick);
      pickedIds.add(pick.id);
    }
  }
  // Round 2: optional second from each category
  for (const cid of orderedCatIds) {
    if (featured.length >= FEATURED_COUNT) break;
    const list = byCategory.get(cid);
    if (!list || list.length < 2) continue;
    const pick = list[1];
    if (pick && !pickedIds.has(pick.id)) {
      featured.push(pick);
      pickedIds.add(pick.id);
    }
    if (featured.filter((p) => p.categoryId === cid).length > MAX_PER_CATEGORY) break;
  }
  // Pad: fall back to remaining catalog (popular first since data is ordered by reviews_count)
  for (const p of products) {
    if (featured.length >= FEATURED_COUNT) break;
    if (!pickedIds.has(p.id)) {
      featured.push(p);
      pickedIds.add(p.id);
    }
  }

  return (
    <>
      <Header />
      <CategoryNavbar categories={categories} />

      {/* Optional admin-controlled banner strip */}
      {settings.banner_message?.trim() && (
        <Box
          sx={{
            bgcolor: BRAND.green,
            color: BRAND.ink,
            py: 1.25,
            textAlign: 'center',
            borderBottom: `2px solid ${BRAND.ink}`,
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.02em',
          }}
        >
          {settings.banner_message}
        </Box>
      )}

      {/* Full-width hero banner */}
      <Hero />

      {/* Trust badges */}
      <TrustBadges />

      {/* Featured products — horizontal rail (hydrates Redux for cart/category flows) */}
      <HomeFeatured products={featured} catalog={products} categories={categories} />

      {/* Visual category tiles with real product images */}
      <CategoryGrid products={products} />

      {/* Delivery cities pill list */}
      <DeliveryAreas />

      {/* About / story */}
      <AboutSection />

      {/* Kayak event experience teaser */}
      <KayakTeaser />

      {/* WhatsApp CTA strip */}
      <CTABanner whatsappHref={wa} phone={settings.business_phone} />

      <Footer />
    </>
  );
}

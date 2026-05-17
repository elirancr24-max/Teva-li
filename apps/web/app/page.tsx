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

export default async function Home() {
  const [{ products, categories }, settings] = await Promise.all([
    getCatalog(),
    getSettings(),
  ]);

  const wa = whatsappLink(
    settings.business_whatsapp,
    `היי ${settings.business_name}, אשמח לפרטים על הזמנה.`,
  );

  // Featured = products tagged "פופולרי", up to 8. Falls back to top 8 if no tags exist.
  const tagged = products.filter((p) => p.tag === 'פופולרי').slice(0, 8);
  const featured = tagged.length > 0 ? tagged : products.slice(0, 8);

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

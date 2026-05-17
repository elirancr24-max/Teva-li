import { createClient } from '@/lib/supabase/server';
import type { Category, Product } from '@/types/shop';
import { mockCategories, mockProducts } from './mock-products';

// Known supplier placeholder images ("משק דהן" wooden crate, etc) — swap to our brand logo
// so products without a real photo show טבע-לי, not another company.
const PLACEHOLDER_IMAGE_URLS = new Set<string>([
  'https://iyjxsdxebxmbrrquxbnw.supabase.co/storage/v1/object/public/product-images/meshek/65fcc5fafc5906b55e045940a9cdb4c0.jpg',
]);
const BRAND_LOGO_URL = '/logo-teva-trans.png';

function resolveImageUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  if (PLACEHOLDER_IMAGE_URLS.has(raw)) return BRAND_LOGO_URL;
  return raw;
}

function resolveUnit(weight: string | undefined): { unit: Product['unit']; step: number } {
  const w = (weight ?? '').toString();
  // Weight-based (per kilo) — 'ק"ג', 'ק״ג', 'קג', 'קילו'
  if (/ק["״]?ג|קג|קילו/.test(w)) return { unit: 'kg', step: 0.5 };
  // Bunch — 'צרור'
  if (/צרור/.test(w)) return { unit: 'bunch', step: 1 };
  // Pack / unit — 'מארז', 'יח', 'יחידה', 'מיכל', 'קופסה', 'פחית'
  if (/מארז|יח|יחיד|מיכל|קופס|פחית/.test(w)) return { unit: 'unit', step: 1 };
  // Default: discrete unit
  return { unit: 'unit', step: 1 };
}

function dbProductToProduct(p: {
  id: string;
  slug: string;
  name_he: string;
  price_cents: number;
  weight: string;
  kind: string;
  category_id: string | null;
  tag: string | null;
  image_url?: string | null;
}): Product {
  const { unit, step } = resolveUnit(p.weight);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name_he,
    priceCents: p.price_cents,
    unit,
    step,
    categoryId: p.category_id,
    kind: p.kind,
    weight: p.weight,
    tag: p.tag,
    imageUrl: resolveImageUrl(p.image_url),
  };
}

export async function getCatalog(): Promise<{ products: Product[]; categories: Category[] }> {
  try {
    const supabase = await createClient();
    const [{ data: rawCategories }, { data: rawProducts }] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('products').select('*').eq('active', true).order('reviews_count', { ascending: false }),
    ]);

    if (!rawProducts || rawProducts.length === 0) {
      return { products: mockProducts, categories: mockCategories };
    }

    const products: Product[] = (rawProducts as Parameters<typeof dbProductToProduct>[0][]).map(
      dbProductToProduct,
    );

    // Only surface categories that actually have at least one active product.
    const activeCategoryIds = new Set(products.map((p) => p.categoryId).filter(Boolean));
    const categories: Category[] = ((rawCategories ?? []) as Array<{
      id: string;
      slug: string;
      name_he: string;
      sort_order: number;
    }>)
      .filter((c) => activeCategoryIds.has(c.id))
      .map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name_he,
        sortOrder: c.sort_order,
      }));

    return { products, categories };
  } catch {
    return { products: mockProducts, categories: mockCategories };
  }
}

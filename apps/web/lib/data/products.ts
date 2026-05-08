import { createClient } from '@/lib/supabase/server';
import type { Category, Product } from '@/types/shop';
import { mockCategories, mockProducts } from './mock-products';

function dbProductToProduct(p: {
  id: string;
  slug: string;
  name_he: string;
  price_cents: number;
  weight: string;
  kind: string;
  category_id: string | null;
  tag: string | null;
}): Product {
  const isWeight = p.weight?.includes('ק״ג') || p.weight?.includes('קג');
  return {
    id: p.id,
    slug: p.slug,
    name: p.name_he,
    priceCents: p.price_cents,
    unit: isWeight ? 'kg' : 'unit',
    step: isWeight ? 0.5 : 1,
    categoryId: p.category_id,
    kind: p.kind,
    weight: p.weight,
    tag: p.tag,
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

    const categories: Category[] = ((rawCategories ?? []) as Array<{
      id: string;
      slug: string;
      name_he: string;
      sort_order: number;
    }>).map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name_he,
      sortOrder: c.sort_order,
    }));

    const products: Product[] = (rawProducts as Parameters<typeof dbProductToProduct>[0][]).map(
      dbProductToProduct,
    );

    return { products, categories };
  } catch {
    return { products: mockProducts, categories: mockCategories };
  }
}

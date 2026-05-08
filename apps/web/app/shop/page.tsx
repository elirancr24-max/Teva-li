import type { Metadata } from 'next';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionTag } from '@/components/brand/SectionTag';
import { FilterChips } from '@/components/shop/FilterChips';
import { CatalogGrid } from '@/components/shop/CatalogGrid';
import type { Category, Product } from '@/types/db';

export const metadata: Metadata = {
  title: 'קטלוג · פרי לי',
  description: '12 זנים זמינים היום, נחתכו בבוקר ונארזו במקרר. משלוח חינם בדימונה.',
};

type SearchParams = Promise<{ cat?: string }>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const { cat } = await searchParams;
  const supabase = await createClient();

  const { data: rawCategories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order');
  const categories = rawCategories as Category[] | null;

  // Resolve category slug → id safely (no raw SQL injection)
  let categoryId: string | null = null;
  if (cat && categories) {
    categoryId = categories.find((c) => c.slug === cat)?.id ?? null;
  }

  const query = supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('reviews_count', { ascending: false });

  if (categoryId) query.eq('category_id', categoryId);

  const { data: rawProducts } = await query;
  const products = rawProducts as Product[] | null;

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader active="shop" />

      <main
        style={{
          flex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(80px,8vw,120px) clamp(20px,5vw,60px) 80px',
        }}
      >
        <div style={{ marginBottom: 'clamp(32px,5vw,56px)' }}>
          <SectionTag num="02" label="הקטלוג" />
          <h1
            className="display"
            style={{
              fontSize: 'clamp(64px,10vw,140px)',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
              margin: '16px 0 24px',
            }}
          >
            פירות
            <span style={{ color: 'var(--watermelon)' }}>.</span>
            <br />
            <span style={{ fontStyle: 'italic' }}>טריים</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(16px,2vw,22px)',
              maxWidth: 480,
              opacity: 0.75,
              lineHeight: 1.5,
            }}
          >
            נחתכו הבוקר. נארזו בקירור. מגיעים אליך תוך שעתיים.
          </p>
        </div>

        <Suspense>
          <FilterChips categories={categories ?? []} activeSlug={cat ?? null} />
        </Suspense>

        <CatalogGrid products={products ?? []} />
      </main>

      <SiteFooter />
    </div>
  );
}

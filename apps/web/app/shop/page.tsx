import type { Metadata } from 'next';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { CategoryNav } from '@/components/shop/CategoryNav';
import { CatalogGrid } from '@/components/shop/CatalogGrid';
import { CartSidebar } from '@/components/shop/CartSidebar';
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

      {/* Category navigation bar — sticky below header */}
      <Suspense>
        <CategoryNav categories={categories ?? []} activeSlug={cat ?? null} />
      </Suspense>

      {/* Shop hero strip */}
      <div
        style={{
          background: '#0a0a0a',
          borderBottom: '1px solid rgba(245,240,232,0.1)',
          padding: '20px clamp(20px,4vw,40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div>
          <h1
            className="display"
            style={{ fontSize: 'clamp(28px,5vw,48px)', lineHeight: 1, letterSpacing: '-0.04em', margin: 0 }}
          >
            כל המוצרים<span style={{ color: 'var(--citrus)' }}>.</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              opacity: 0.5,
              margin: '6px 0 0',
              letterSpacing: '0.06em',
            }}
          >
            {products?.length ?? 0} מוצרים · נחתכו הבוקר
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="pulse-dot" />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6, letterSpacing: '0.1em' }}>
            זמין עכשיו
          </span>
        </div>
      </div>

      {/* Main content: sidebar + grid */}
      <div
        style={{
          flex: 1,
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          padding: '24px clamp(12px,3vw,32px) 48px',
          display: 'flex',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        {/* Product grid — first in DOM = right side in RTL */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Sort bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: '1px solid rgba(245,240,232,0.1)',
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.5, letterSpacing: '0.06em' }}>
              {cat ? `קטגוריה: ${categories?.find((c) => c.slug === cat)?.name_he ?? cat}` : 'כל הקטגוריות'}
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.5 }}>
              {products?.length ?? 0} מוצרים
            </div>
          </div>

          <CatalogGrid products={products ?? []} />
        </div>

        {/* Cart sidebar — second in DOM = left side in RTL — hidden on mobile */}
        <div className="cart-sidebar-wrapper">
          <Suspense>
            <CartSidebar />
          </Suspense>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

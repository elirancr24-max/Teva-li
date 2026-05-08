'use client';
import { useCompact } from '@/hooks/use-compact';
import { CatalogCard } from './CatalogCard';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';
import type { Product } from '@/types/db';

type Props = { products: Product[] };

export function CatalogGrid({ products }: Props) {
  const m = useCompact();

  if (products.length === 0) {
    return (
      <div
        style={{
          padding: '80px 0',
          textAlign: 'center',
          fontFamily: 'var(--serif)',
          fontSize: 22,
          opacity: 0.6,
        }}
      >
        אין מוצרים בקטגוריה זו כרגע.
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: m
            ? 'repeat(2, 1fr)'
            : 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: m ? 16 : 24,
        }}
      >
        {products.map((p) => (
          <CatalogCard key={p.id} product={p} compact={m} />
        ))}
      </div>
      {m && <MobileBottomNav active="shop" />}
    </>
  );
}

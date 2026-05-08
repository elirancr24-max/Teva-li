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
          padding: '80px 20px',
          textAlign: 'center',
          opacity: 0.5,
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 22, marginBottom: 8 }}>
          אין מוצרים בקטגוריה זו כרגע
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 15 }}>
          נסה קטגוריה אחרת או חזור מחר
        </div>
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
            : 'repeat(4, 1fr)',
          gap: m ? 10 : 14,
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

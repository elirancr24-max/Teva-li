'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Fruit, type FruitKind } from '@/components/fruits/Fruit';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/store/cart';
import type { Product } from '@/types/db';

type Props = { product: Product; compact?: boolean };

export function CatalogCard({ product, compact: m = false }: Props) {
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({
      product_id: product.id,
      slug: product.slug,
      qty: 1,
      price_cents: product.price_cents,
      name_he: product.name_he,
      weight: product.weight,
      kind: product.kind,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <Link href={`/shop/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: hover ? '#1c1c1c' : '#161616',
          border: `1px solid ${hover ? 'rgba(245,240,232,0.22)' : 'rgba(245,240,232,0.08)'}`,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          transform: hover ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hover ? '0 8px 24px rgba(0,0,0,0.5)' : 'none',
          overflow: 'hidden',
        }}
      >
        {/* Discount/tag badge */}
        {product.tag && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 3,
              background: product.tag === 'חדש' ? 'var(--leaf)' : 'var(--watermelon)',
              color: '#fff',
              padding: '3px 9px',
              fontFamily: 'var(--mono)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            {product.tag}
          </div>
        )}

        {/* Delivery badge */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 3,
            background: 'rgba(0,0,0,0.6)',
            borderRadius: 4,
            padding: '3px 6px',
            fontSize: 14,
          }}
          title="משלוח מהיר"
        >
          🚀
        </div>

        {/* Image area */}
        <div
          style={{
            height: m ? 130 : 170,
            background: '#0f0f0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 50% 60%, ${
                product.kind === 'watermelon' ? 'rgba(201,24,74,0.18)' :
                product.kind === 'pineapple' ? 'rgba(255,214,10,0.15)' :
                product.kind === 'mango' ? 'rgba(255,122,26,0.15)' :
                'rgba(139,195,74,0.12)'
              } 0%, transparent 70%)`,
              transition: 'opacity 200ms',
              opacity: hover ? 1 : 0.6,
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              transform: hover ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 320ms ease',
            }}
          >
            <Fruit kind={product.kind as FruitKind} size={m ? 100 : 135} alt={product.name_he} />
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: m ? '12px 14px 14px' : '14px 16px 16px' }}>
          {/* Rating */}
          {product.rating != null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
              <span style={{ color: 'var(--citrus)', fontSize: 11 }}>★</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700 }}>
                {product.rating.toFixed(1)}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.4 }}>
                ({product.reviews_count})
              </span>
            </div>
          )}

          {/* Name */}
          <div
            style={{
              fontFamily: 'var(--display)',
              fontSize: m ? 15 : 17,
              fontWeight: 700,
              lineHeight: 1.25,
              marginBottom: 4,
              letterSpacing: '-0.02em',
            }}
          >
            {product.name_he}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.4, marginBottom: 12 }}>
            {product.weight}
          </div>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <div>
              <span
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 900,
                  fontSize: m ? 19 : 22,
                  color: 'var(--citrus)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}
              >
                {formatPrice(product.price_cents)}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.5, marginRight: 3 }}>
                /{product.weight}
              </span>
            </div>

            <button
              onClick={handleAdd}
              style={{
                background: added ? 'var(--leaf)' : hover ? 'var(--watermelon)' : 'rgba(245,240,232,0.1)',
                color: added || hover ? '#fff' : 'var(--ink)',
                border: 'none',
                width: m ? 32 : 36,
                height: m ? 32 : 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: m ? 17 : 20,
                fontWeight: 900,
                transition: 'all 200ms ease',
                flexShrink: 0,
              }}
              aria-label="הוסף לסל"
            >
              {added ? '✓' : '+'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

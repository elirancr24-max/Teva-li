'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCompact } from '@/hooks/use-compact';
import { Fruit, type FruitKind } from '@/components/fruits/Fruit';
import { Sticker } from '@/components/brand/Sticker';
import { PriceTag } from '@/components/brand/PriceTag';
import { SectionTag } from '@/components/brand/SectionTag';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';
import { MobileBuyBar } from '@/components/mobile/MobileBuyBar';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import type { Product, Review } from '@/types/db';

type Props = { product: Product; reviews: Review[] };

export function ProductDetail({ product, reviews }: Props) {
  const m = useCompact();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  function handleAdd() {
    add({
      product_id: product.id,
      slug: product.slug,
      qty,
      price_cents: product.price_cents,
      name_he: product.name_he,
      weight: product.weight,
      kind: product.kind,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  const accent = 'var(--watermelon)';

  return (
    <main
      style={{
        flex: 1,
        maxWidth: 1100,
        margin: '0 auto',
        width: '100%',
        padding: m ? '70px 20px 120px' : '100px clamp(20px,5vw,60px) 80px',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.08em',
          opacity: 0.5,
          marginBottom: m ? 20 : 32,
        }}
      >
        <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>
          ← חזרה לקטלוג
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '1fr 1fr',
          gap: m ? 32 : 60,
          alignItems: 'start',
        }}
      >
        {/* Fruit visual */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: m ? '40px 20px' : '60px 40px',
            border: '2px solid var(--ink)',
            boxShadow: '8px 8px 0 var(--ink)',
            position: 'relative',
            background: 'var(--paper-2)',
          }}
        >
          {product.tag && (
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
              <Sticker
                color={product.tag === 'חדש' ? 'var(--leaf)' : 'var(--citrus)'}
                rotate={-8}
                dark={product.tag === 'חדש'}
              >
                {product.tag}
              </Sticker>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              width: m ? 240 : 340,
              height: m ? 240 : 340,
              background: `radial-gradient(circle, ${accent} 0%, transparent 60%)`,
              opacity: 0.25,
              filter: 'blur(40px)',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Fruit kind={product.kind as FruitKind} size={m ? 220 : 320} alt={product.name_he} priority />
          </div>
        </div>

        {/* Info panel */}
        <div>
          <SectionTag num="02" label="מוצר" />
          <h1
            className="display"
            style={{
              fontSize: m ? 'clamp(44px,12vw,72px)' : 'clamp(52px,6vw,90px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              margin: '16px 0 20px',
            }}
          >
            {product.name_he}
            <span style={{ color: accent }}>.</span>
          </h1>

          {product.rating != null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span
                  key={s}
                  style={{
                    color: s <= Math.round(product.rating ?? 0) ? 'var(--citrus)' : 'rgba(0,0,0,0.2)',
                    fontSize: 20,
                  }}
                >
                  ★
                </span>
              ))}
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, marginRight: 4 }}>
                {product.rating.toFixed(1)}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.45 }}>
                ({product.reviews_count} ביקורות)
              </span>
            </div>
          )}

          {product.description_he && (
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontSize: m ? 17 : 20,
                lineHeight: 1.6,
                opacity: 0.8,
                marginBottom: 28,
              }}
            >
              {product.description_he}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px 0',
              borderTop: '1.5px dashed rgba(0,0,0,0.18)',
              borderBottom: '1.5px dashed rgba(0,0,0,0.18)',
              marginBottom: 28,
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.5, letterSpacing: '0.06em' }}>
              משקל:
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700 }}>{product.weight}</span>
          </div>

          {/* Price + qty + add to cart */}
          {!m && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <PriceTag variant="accent" size={28} style={{ alignSelf: 'flex-start', padding: '8px 18px' }}>
                {formatPrice(product.price_cents)}
              </PriceTag>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    display: 'flex',
                    border: '2px solid var(--ink)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{
                      width: 40,
                      height: 48,
                      background: 'var(--paper)',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--mono)',
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    −
                  </button>
                  <div
                    style={{
                      width: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--mono)',
                      fontSize: 16,
                      fontWeight: 700,
                      borderInline: '2px solid var(--ink)',
                    }}
                  >
                    {qty}
                  </div>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    style={{
                      width: 40,
                      height: 48,
                      background: 'var(--paper)',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--mono)',
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  style={{
                    flex: 1,
                    padding: '14px 24px',
                    background: added ? 'var(--leaf)' : 'var(--ink)',
                    color: 'var(--paper)',
                    border: '2px solid var(--ink)',
                    fontFamily: 'var(--mono)',
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    boxShadow: '5px 5px 0 var(--watermelon)',
                    transition: 'all 240ms var(--easing)',
                  }}
                >
                  {added ? '✓ נוסף לסל!' : 'הוסף לסל →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <section style={{ marginTop: m ? 48 : 72 }}>
          <h2
            className="display"
            style={{ fontSize: m ? 36 : 52, letterSpacing: '-0.04em', marginBottom: 28 }}
          >
            ביקורות
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reviews.map((r) => (
              <div
                key={r.id}
                style={{
                  padding: m ? '16px 18px' : '20px 24px',
                  border: '1.5px solid var(--ink)',
                  background: 'var(--paper-2)',
                }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: s <= r.rating ? 'var(--citrus)' : 'rgba(0,0,0,0.2)', fontSize: 16 }}>
                      ★
                    </span>
                  ))}
                </div>
                {r.body_he && (
                  <p style={{ fontFamily: 'var(--serif)', fontSize: m ? 15 : 17, lineHeight: 1.5, margin: 0 }}>
                    {r.body_he}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {m && <MobileBottomNav active="shop" />}
      {m && (
        <MobileBuyBar
          priceCents={product.price_cents}
          weight={product.weight}
          onAdd={handleAdd}
        />
      )}
    </main>
  );
}

'use client';
import Link from 'next/link';
import { useCompact } from '@/hooks/use-compact';
import { useCart } from '@/store/cart';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionTag } from '@/components/brand/SectionTag';
import { PriceTag } from '@/components/brand/PriceTag';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';
import { Fruit, type FruitKind } from '@/components/fruits/Fruit';
import { formatPrice } from '@/lib/utils';

const DELIVERY_FREE_CITY = 'דימונה';
const DELIVERY_FEE_CENTS = 2500;

export function CartView() {
  const m = useCompact();
  const { items, remove, setQty, clear, totalCents, itemCount } = useCart();
  const subtotal = totalCents();
  const delivery = subtotal > 0 ? DELIVERY_FEE_CENTS : 0;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SiteHeader active="shop" />
        <main
          style={{
            flex: 1,
            maxWidth: 900,
            margin: '0 auto',
            width: '100%',
            padding: m ? '80px 20px 100px' : '120px 60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <SectionTag num="03" label="הסל" />
          <h1 className="display" style={{ fontSize: m ? 64 : 120, lineHeight: 0.85, letterSpacing: '-0.05em', margin: '16px 0 24px' }}>
            הסל ריק<span style={{ color: 'var(--watermelon)' }}>.</span>
          </h1>
          <p style={{ fontFamily: 'var(--serif)', fontSize: m ? 18 : 22, opacity: 0.7, marginBottom: 32 }}>
            עוד לא בחרת פירות. כנס לקטלוג ובחר.
          </p>
          <Link
            href="/shop"
            style={{
              padding: '14px 28px',
              background: 'var(--ink)',
              color: 'var(--paper)',
              fontFamily: 'var(--mono)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textDecoration: 'none',
              border: '2px solid var(--ink)',
              boxShadow: '5px 5px 0 var(--watermelon)',
              display: 'inline-block',
            }}
          >
            לקטלוג →
          </Link>
        </main>
        <SiteFooter />
        {m && <MobileBottomNav active="cart" />}
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader active="shop" />

      <main
        style={{
          flex: 1,
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          padding: m ? '70px 20px 120px' : '100px clamp(20px,5vw,60px) 80px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <SectionTag num="03" label="הסל" />
            <h1 className="display" style={{ fontSize: m ? 56 : 100, lineHeight: 0.85, letterSpacing: '-0.05em', margin: '12px 0 0' }}>
              הסל שלי<span style={{ color: 'var(--watermelon)' }}>.</span>
            </h1>
          </div>
          <button
            onClick={clear}
            style={{
              background: 'none',
              border: '1.5px solid rgba(245,240,232,0.25)',
              padding: '8px 14px',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              cursor: 'pointer',
              letterSpacing: '0.08em',
              opacity: 0.6,
              alignSelf: 'flex-end',
            }}
          >
            נקה סל
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 340px', gap: m ? 24 : 40, alignItems: 'start' }}>
          {/* Item list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {items.map((item, i) => (
              <div
                key={item.product_id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: m ? 14 : 20,
                  padding: m ? '16px 0' : '20px 0',
                  borderTop: i === 0 ? '2px solid var(--ink)' : '1px dashed rgba(245,240,232,0.18)',
                  borderBottom: i === items.length - 1 ? '2px solid var(--ink)' : 'none',
                }}
              >
                <Fruit kind={item.kind as FruitKind} size={m ? 64 : 88} alt={item.name_he} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="display" style={{ fontSize: m ? 20 : 26, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    {item.name_he}
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 10 : 11, opacity: 0.45, marginTop: 4, letterSpacing: '0.06em' }}>
                    {item.weight} · {formatPrice(item.price_cents)} ליח׳
                  </div>
                </div>

                {/* Qty stepper */}
                <div style={{ display: 'flex', border: '1.5px solid var(--ink)', overflow: 'hidden' }}>
                  <button
                    onClick={() => setQty(item.product_id, item.qty - 1)}
                    style={{ width: m ? 32 : 36, height: m ? 36 : 40, background: 'var(--paper)', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700 }}
                  >
                    −
                  </button>
                  <div style={{ width: m ? 32 : 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700, borderInline: '1.5px solid var(--ink)' }}>
                    {item.qty}
                  </div>
                  <button
                    onClick={() => setQty(item.product_id, item.qty + 1)}
                    style={{ width: m ? 32 : 36, height: m ? 36 : 40, background: 'var(--paper)', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 18, fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>

                <div style={{ minWidth: m ? 64 : 80, textAlign: 'end' }}>
                  <PriceTag variant="ink" size={m ? 14 : 16} style={{ padding: '4px 8px' }}>
                    {formatPrice(item.price_cents * item.qty)}
                  </PriceTag>
                </div>

                <button
                  onClick={() => remove(item.product_id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, fontSize: 18, padding: '4px', lineHeight: 1 }}
                  aria-label="הסר"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div
            style={{
              border: '2px solid var(--ink)',
              padding: m ? '20px' : '28px',
              boxShadow: '6px 6px 0 var(--ink)',
              position: m ? 'static' : 'sticky',
              top: 100,
            }}
          >
            <h2 className="display" style={{ fontSize: m ? 28 : 36, letterSpacing: '-0.04em', marginBottom: 20 }}>
              סיכום הזמנה
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20, borderBottom: '1px dashed rgba(245,240,232,0.18)', paddingBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 13 }}>
                <span style={{ opacity: 0.6 }}>{itemCount()} פריטים</span>
                <span style={{ fontWeight: 700 }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 13 }}>
                <span style={{ opacity: 0.6 }}>משלוח</span>
                <span style={{ fontWeight: 700, color: 'var(--leaf)' }}>
                  {delivery === 0 ? 'חינם' : formatPrice(delivery)}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.45, letterSpacing: '0.06em' }}>
                * משלוח חינם ב{DELIVERY_FREE_CITY}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span className="display" style={{ fontSize: 20, letterSpacing: '-0.03em' }}>סה"כ לתשלום</span>
              <PriceTag variant="accent" size={22} style={{ padding: '6px 14px' }}>
                {formatPrice(total)}
              </PriceTag>
            </div>

            <Link
              href="/checkout"
              style={{
                display: 'block',
                padding: '16px',
                background: 'var(--ink)',
                color: 'var(--paper)',
                fontFamily: 'var(--mono)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textDecoration: 'none',
                textAlign: 'center',
                border: '2px solid var(--ink)',
                boxShadow: '5px 5px 0 var(--watermelon)',
                transition: 'all 200ms var(--easing)',
              }}
            >
              המשך לתשלום →
            </Link>

            <Link
              href="/shop"
              style={{
                display: 'block',
                padding: '12px',
                textAlign: 'center',
                fontFamily: 'var(--mono)',
                fontSize: 12,
                opacity: 0.5,
                textDecoration: 'none',
                color: 'inherit',
                marginTop: 12,
                letterSpacing: '0.06em',
              }}
            >
              ← המשך קנייה
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
      {m && <MobileBottomNav active="cart" />}
    </div>
  );
}

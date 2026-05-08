'use client';
import Link from 'next/link';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

const DELIVERY_FEE = 2500;

export function CartSidebar() {
  const { items, totalCents, itemCount } = useCart();
  const subtotal = totalCents();
  const delivery = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;
  const count = itemCount();

  return (
    <div
      style={{
        width: 260,
        flexShrink: 0,
        position: 'sticky',
        top: 80,
        alignSelf: 'flex-start',
        border: '1px solid rgba(245,240,232,0.12)',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background: '#1a1208',
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(245,240,232,0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🧺</span>
          <span style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 15 }}>
            הסל שלי
          </span>
          {count > 0 && (
            <span
              style={{
                background: 'var(--watermelon)',
                color: '#fff',
                borderRadius: 999,
                padding: '1px 7px',
                fontFamily: 'var(--mono)',
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {count}
            </span>
          )}
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--citrus)', fontWeight: 700 }}>
          {formatPrice(total)}
        </span>
      </div>

      {/* Body */}
      <div style={{ background: 'var(--paper-2)', minHeight: 180 }}>
        {items.length === 0 ? (
          <div style={{ padding: '32px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 44, marginBottom: 10, opacity: 0.35 }}>🛒</div>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 17, marginBottom: 6 }}>
              הסל שלך ריק
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 13, opacity: 0.5, lineHeight: 1.5 }}>
              התחל להוסיף מוצרים טריים
            </div>
          </div>
        ) : (
          <div>
            {items.map((item) => (
              <div
                key={item.product_id}
                style={{
                  padding: '11px 16px',
                  borderBottom: '1px solid rgba(245,240,232,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: 14,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.name_he}
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.45 }}>
                    ×{item.qty} · {item.weight}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--citrus)', fontWeight: 700, flexShrink: 0 }}>
                  {formatPrice(item.price_cents * item.qty)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          background: '#1a1208',
          padding: '14px 16px',
          borderTop: '1px solid rgba(245,240,232,0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontFamily: 'var(--mono)',
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          <span>משלוח</span>
          <span style={{ color: 'var(--leaf)' }}>
            {subtotal === 0 ? '—' : subtotal > 10000 ? 'חינם!' : formatPrice(DELIVERY_FEE)}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 14,
            fontFamily: 'var(--display)',
            fontWeight: 900,
            fontSize: 16,
          }}
        >
          <span>סה"כ</span>
          <span style={{ color: 'var(--citrus)' }}>{formatPrice(total)}</span>
        </div>

        {items.length > 0 ? (
          <Link
            href="/checkout"
            style={{
              display: 'block',
              background: 'var(--leaf)',
              color: '#fff',
              padding: '13px',
              textAlign: 'center',
              fontFamily: 'var(--mono)',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'background 160ms',
            }}
          >
            המשך לתשלום →
          </Link>
        ) : (
          <button
            disabled
            style={{
              display: 'block',
              width: '100%',
              background: 'rgba(245,240,232,0.08)',
              color: 'rgba(245,240,232,0.3)',
              padding: '13px',
              fontFamily: 'var(--mono)',
              fontWeight: 700,
              fontSize: 14,
              border: 'none',
              cursor: 'not-allowed',
              letterSpacing: '0.04em',
            }}
          >
            המשך לתשלום
          </button>
        )}

        <div
          style={{
            marginTop: 10,
            fontFamily: 'var(--mono)',
            fontSize: 10,
            opacity: 0.4,
            textAlign: 'center',
          }}
        >
          משלוח חינם בדימונה · ₪25 ביישובים אחרים
        </div>
      </div>
    </div>
  );
}

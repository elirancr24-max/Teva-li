'use client';
import { formatPrice } from '@/lib/utils';

type Props = {
  /** Price in cents. */
  priceCents: number;
  weight: string;
  qty?: number;
  accent?: string;
  onAdd?: () => void;
};

/** Sticky dark frosted-glass buy bar shown above MobileBottomNav on the product page. */
export function MobileBuyBar({
  priceCents,
  weight,
  qty = 1,
  accent = 'var(--watermelon)',
  onAdd,
}: Props) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 70,
        zIndex: 45,
        margin: '0 -16px',
        padding: '10px 14px',
        background: 'rgba(10,10,10,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: 'var(--paper)',
        borderTop: '1.5px solid var(--ink)',
        borderBottom: '1.5px solid var(--ink)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 9,
            opacity: 0.6,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          סך הכל
        </div>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          {formatPrice(priceCents * qty)}
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontWeight: 400,
              fontSize: 11,
              opacity: 0.55,
              marginInlineStart: 6,
            }}
          >
            / {weight}
          </span>
        </div>
      </div>
      <button
        onClick={onAdd}
        style={{
          marginInlineStart: 'auto',
          background: accent,
          color: 'var(--paper)',
          border: '2px solid var(--paper)',
          padding: '12px 20px',
          fontFamily: 'var(--display)',
          fontWeight: 900,
          fontSize: 15,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          boxShadow: '3px 3px 0 var(--paper)',
        }}
      >
        הוסף לסל →
      </button>
    </div>
  );
}

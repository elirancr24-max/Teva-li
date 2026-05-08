'use client';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { useCompact } from '@/hooks/use-compact';

type Props = {
  active?: 'home' | 'shop' | 'kayak' | 'about';
  /** Forces compact layout (used inside iOS preview frame). */
  compact?: boolean;
  cartCount?: number;
};

const ITEMS = [
  { id: 'home', label: 'בית', href: '/' },
  { id: 'shop', label: 'פירות קלופים', href: '/shop' },
  { id: 'kayak', label: 'קיאקי פירות', href: '/kayak' },
  { id: 'about', label: 'הסיפור', href: '/about' },
] as const;

export function SiteHeader({ active = 'home', compact, cartCount = 3 }: Props) {
  const m = useCompact(compact);

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: m ? '14px 16px' : '20px 40px',
        borderBottom: '2px solid var(--ink)',
        background: 'var(--paper)',
        position: 'relative',
        zIndex: 5,
        gap: 8,
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <Logo size={m ? 52 : 68} />
      </Link>

      {!m && (
        <nav style={{ display: 'flex', gap: 32 }}>
          {ITEMS.map((it) => (
            <Link
              key={it.id}
              href={it.href}
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 16,
                color: 'var(--ink)',
                textDecoration: 'none',
                borderBottom:
                  active === it.id ? '2px solid var(--citrus)' : '2px solid transparent',
                paddingBottom: 4,
              }}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      )}

      <div style={{ display: 'flex', gap: m ? 6 : 12, alignItems: 'center' }}>
        {m ? (
          <button
            aria-label="תפריט"
            style={{
              background: 'var(--paper)',
              border: '2px solid var(--ink)',
              padding: '8px 10px',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              cursor: 'pointer',
            }}
          >
            <span style={{ width: 18, height: 2, background: 'var(--ink)', display: 'block' }} />
            <span style={{ width: 18, height: 2, background: 'var(--ink)', display: 'block' }} />
            <span style={{ width: 18, height: 2, background: 'var(--ink)', display: 'block' }} />
          </button>
        ) : (
          <button
            style={{
              background: 'none',
              border: '2px solid var(--ink)',
              padding: '10px 16px',
              fontFamily: 'var(--mono)',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            חיפוש
          </button>
        )}
        <Link
          href="/cart"
          style={{
            background: 'var(--watermelon)',
            color: '#fdfbf5',
            border: '2px solid var(--watermelon)',
            padding: m ? '8px 10px' : '10px 16px',
            fontFamily: 'var(--mono)',
            fontSize: m ? 11 : 12,
            fontWeight: 700,
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            textDecoration: 'none',
            boxShadow: '3px 3px 0 var(--citrus)',
          }}
        >
          סל{' '}
          <span
            style={{
              background: 'rgba(255,255,255,0.25)',
              color: '#fdfbf5',
              padding: '0 6px',
              borderRadius: 999,
            }}
          >
            {cartCount}
          </span>
        </Link>
      </div>
    </header>
  );
}

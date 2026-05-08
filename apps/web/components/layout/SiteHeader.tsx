'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useCompact } from '@/hooks/use-compact';
import { useCart } from '@/store/cart';

type Props = {
  active?: 'home' | 'shop' | 'kayak' | 'about';
  compact?: boolean;
};

const ITEMS = [
  { id: 'home', label: 'בית', href: '/' },
  { id: 'shop', label: 'פירות קלופים', href: '/shop' },
  { id: 'kayak', label: 'קיאקי פירות', href: '/kayak' },
  { id: 'about', label: 'הסיפור', href: '/about' },
] as const;

export function SiteHeader({ active = 'home', compact }: Props) {
  const m = useCompact(compact);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCart((s) => s.itemCount());

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/shop?q=${encodeURIComponent(search.trim())}`);
      setSearchOpen(false);
    }
  }

  return (
    <header
      style={{
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(245,240,232,0.12)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Main header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: m ? '10px 14px' : '12px 32px',
          gap: 12,
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', flexShrink: 0 }}
        >
          <Logo size={m ? 44 : 58} />
        </Link>

        {/* Search bar — center */}
        {!m && (
          <form
            onSubmit={handleSearch}
            style={{
              flex: 1,
              maxWidth: 460,
              display: 'flex',
              gap: 0,
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="חפש מוצר..."
              style={{
                flex: 1,
                padding: '10px 16px',
                background: '#161616',
                border: '1.5px solid rgba(245,240,232,0.18)',
                borderLeft: 'none',
                color: 'var(--ink)',
                fontFamily: 'var(--serif)',
                fontSize: 14,
                outline: 'none',
                borderRadius: '0 4px 4px 0',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 18px',
                background: 'var(--citrus)',
                color: '#0a0a0a',
                border: 'none',
                fontFamily: 'var(--mono)',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                borderRadius: '4px 0 0 4px',
                flexShrink: 0,
              }}
            >
              🔍
            </button>
          </form>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', gap: m ? 6 : 10, alignItems: 'center', flexShrink: 0 }}>
          {m && (
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{
                background: 'none',
                border: '1.5px solid rgba(245,240,232,0.2)',
                color: 'var(--ink)',
                padding: '7px 10px',
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              🔍
            </button>
          )}

          {/* Nav links — desktop only */}
          {!m && (
            <nav style={{ display: 'flex', gap: 24, marginLeft: 8 }}>
              {ITEMS.map((it) => (
                <Link
                  key={it.id}
                  href={it.href}
                  style={{
                    fontFamily: 'var(--display)',
                    fontWeight: 700,
                    fontSize: 14,
                    color: active === it.id ? 'var(--citrus)' : 'var(--ink)',
                    textDecoration: 'none',
                    opacity: active === it.id ? 1 : 0.75,
                    letterSpacing: '-0.01em',
                    transition: 'color 160ms, opacity 160ms',
                  }}
                >
                  {it.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Cart button */}
          <Link
            href="/cart"
            style={{
              background: 'var(--watermelon)',
              color: '#fff',
              border: 'none',
              padding: m ? '8px 12px' : '9px 16px',
              fontFamily: 'var(--mono)',
              fontSize: m ? 11 : 12,
              fontWeight: 700,
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            <span>🛒</span>
            {cartCount > 0 && (
              <span
                style={{
                  background: 'var(--citrus)',
                  color: '#0a0a0a',
                  padding: '1px 7px',
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: 11,
                }}
              >
                {cartCount}
              </span>
            )}
            {!m && <span>הסל</span>}
          </Link>
        </div>
      </div>

      {/* Mobile search bar */}
      {m && searchOpen && (
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            padding: '0 14px 12px',
            gap: 0,
          }}
        >
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חפש מוצר..."
            style={{
              flex: 1,
              padding: '10px 14px',
              background: '#161616',
              border: '1.5px solid rgba(245,240,232,0.2)',
              borderLeft: 'none',
              color: 'var(--ink)',
              fontFamily: 'var(--serif)',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              background: 'var(--citrus)',
              color: '#0a0a0a',
              border: 'none',
              fontFamily: 'var(--mono)',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            חפש
          </button>
        </form>
      )}
    </header>
  );
}

'use client';
import Link from 'next/link';
import { useState } from 'react';
import { NavIcon } from './NavIcon';

type Props = {
  active?: 'home' | 'shop' | 'kayak' | 'cart' | 'profile';
  cartCount?: number;
  accent?: string;
};

const ITEMS = [
  { id: 'home',    label: 'בית',  href: '/',        icon: <NavIcon kind="home" /> },
  { id: 'shop',    label: 'חנות', href: '/shop',    icon: <NavIcon kind="shop" /> },
  { id: 'kayak',   label: 'קיאק', href: '/kayak',   center: true, icon: '+' },
  { id: 'cart',    label: 'סל',   href: '/cart',    icon: <NavIcon kind="cart" /> },
  { id: 'profile', label: 'אני',  href: '/account', icon: <NavIcon kind="user" /> },
] as const;

/** iOS-style frosted-glass bottom tab bar with center FAB → /kayak. */
export function MobileBottomNav({
  active = 'home',
  cartCount = 3,
  accent = 'var(--watermelon)',
}: Props) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 50,
        background: 'rgba(253,251,245,0.78)',
        backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        borderTop: '1.5px solid var(--ink)',
        padding: '4px 4px 6px',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 4px) + 4px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
      }}
    >
      {ITEMS.map((it) =>
        'center' in it ? (
          <CenterFab key={it.id} href={it.href} label={it.label} accent={accent}>
            {it.icon}
          </CenterFab>
        ) : (
          <Link
            key={it.id}
            href={it.href}
            aria-label={it.label}
            style={{
              padding: '6px 4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              fontFamily: 'var(--display)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.04em',
              color: active === it.id ? accent : 'var(--ink)',
              textDecoration: 'none',
              position: 'relative',
              opacity: active === it.id ? 1 : 0.7,
              transition: 'opacity 200ms',
            }}
          >
            {active === it.id && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '25%',
                  right: '25%',
                  height: 2.5,
                  background: accent,
                }}
              />
            )}
            <span
              style={{
                position: 'relative',
                display: 'inline-flex',
                width: 22,
                height: 22,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {it.icon}
              {it.id === 'cart' && cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -8,
                    minWidth: 16,
                    height: 16,
                    padding: '0 4px',
                    borderRadius: 999,
                    background: accent,
                    color: 'var(--ink)',
                    border: '1.5px solid var(--ink)',
                    fontFamily: 'var(--mono)',
                    fontSize: 9,
                    fontWeight: 700,
                    display: 'grid',
                    placeItems: 'center',
                    lineHeight: 1,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </span>
            <span>{it.label}</span>
          </Link>
        ),
      )}
    </div>
  );
}

function CenterFab({
  href,
  label,
  accent,
  children,
}: {
  href: string;
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Link
      href={href}
      aria-label={label}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        background: accent,
        color: 'var(--ink)',
        border: '2px solid var(--ink)',
        width: 52,
        height: 52,
        borderRadius: '50%',
        margin: '-22px auto 0',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'var(--display)',
        fontWeight: 900,
        fontSize: 30,
        boxShadow: '0 6px 14px rgba(0,0,0,0.25), 3px 3px 0 var(--ink)',
        position: 'relative',
        transform: pressed ? 'scale(0.92)' : 'scale(1)',
        transition: 'transform 200ms var(--easing)',
        textDecoration: 'none',
      }}
    >
      <span style={{ lineHeight: 1, marginTop: -3 }}>{children}</span>
    </Link>
  );
}

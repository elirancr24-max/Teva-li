'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/types/db';

type Props = { categories: Category[]; activeSlug: string | null };

const STATIC_EXTRAS = [
  { slug: 'kayak', name_he: 'קיאקי פירות' },
];

export function CategoryNav({ categories, activeSlug }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  function setFilter(slug: string | null) {
    if (slug === 'kayak') { router.push('/kayak'); return; }
    const params = new URLSearchParams(sp.toString());
    if (slug) params.set('cat', slug);
    else params.delete('cat');
    router.push(`/shop?${params.toString()}`, { scroll: false });
  }

  const tabs = [
    { slug: null, name_he: 'כל המוצרים' },
    ...categories,
    ...STATIC_EXTRAS,
  ];

  return (
    <nav
      style={{
        background: '#111',
        borderBottom: '2px solid rgba(245,240,232,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          padding: '0 20px',
          maxWidth: 1280,
          margin: '0 auto',
          gap: 0,
        }}
      >
        {tabs.map((tab) => {
          const active = tab.slug === activeSlug;
          return (
            <button
              key={tab.slug ?? 'all'}
              onClick={() => setFilter(tab.slug)}
              style={{
                padding: '13px 20px',
                background: 'none',
                border: 'none',
                borderBottom: active ? '3px solid var(--citrus)' : '3px solid transparent',
                color: active ? 'var(--citrus)' : 'var(--ink)',
                fontFamily: 'var(--display)',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'color 160ms, border-color 160ms',
                flexShrink: 0,
                letterSpacing: '-0.01em',
                opacity: active ? 1 : 0.75,
              }}
            >
              {tab.name_he}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

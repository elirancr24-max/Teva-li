'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/types/db';

type Props = { categories: Category[]; activeSlug: string | null };

export function FilterChips({ categories, activeSlug }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  function setFilter(slug: string | null) {
    const params = new URLSearchParams(sp.toString());
    if (slug) params.set('cat', slug);
    else params.delete('cat');
    router.push(`/shop?${params.toString()}`, { scroll: false });
  }

  const chips = [{ slug: null, name_he: 'הכל' }, ...categories];

  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
      {chips.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <button
            key={c.slug ?? 'all'}
            onClick={() => setFilter(c.slug)}
            style={{
              padding: '8px 18px',
              border: '1.5px solid var(--ink)',
              background: active ? 'var(--ink)' : 'var(--paper)',
              color: active ? 'var(--paper)' : 'var(--ink)',
              fontFamily: 'var(--mono)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              boxShadow: active ? '3px 3px 0 var(--watermelon)' : 'none',
              transition: 'all 180ms var(--easing)',
            }}
          >
            {c.name_he}
          </button>
        );
      })}
    </div>
  );
}

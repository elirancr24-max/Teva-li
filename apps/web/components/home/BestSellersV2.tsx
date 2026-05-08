'use client';
import { useState } from 'react';
import { useCompact } from '@/hooks/use-compact';
import { SectionTag } from '@/components/brand/SectionTag';
import { Watermark } from '@/components/brand/Watermark';
import { ProductCard, type Product } from './ProductCard';

const CATEGORIES = [
  { id: 'all', label: 'הכל' },
  { id: 'tropical', label: 'טרופי' },
  { id: 'berries', label: 'פירות יער' },
  { id: 'melons', label: 'מלונים' },
  { id: 'citrus', label: 'הדרים' },
] as const;

const PRODUCTS: (Product & { cat: string })[] = [
  { name: 'אננס קלוף', kind: 'pineapple', priceCents: 2490, weight: '500ג׳', cat: 'tropical', tag: 'הכי נמכר' },
  { name: 'אבטיח חתוך', kind: 'watermelon', priceCents: 1990, weight: '600ג׳', cat: 'melons' },
  { name: 'תות שדה', kind: 'strawberry', priceCents: 2990, weight: '300ג׳', cat: 'berries', tag: 'חדש' },
  { name: 'ענבי קונקורד', kind: 'grape', priceCents: 2690, weight: '400ג׳', cat: 'berries' },
  { name: 'מלון אמבוסיה', kind: 'melon', priceCents: 2290, weight: '500ג׳', cat: 'melons' },
  { name: 'קיווי זהב', kind: 'kiwi', priceCents: 2790, weight: '350ג׳', cat: 'tropical' },
];

type Props = { accent?: string; compact?: boolean };

export function BestSellersV2({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);
  const [active, setActive] = useState<string>('all');
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);

  return (
    <section
      style={{
        padding: m ? '50px 16px' : '100px 40px',
        borderBottom: '2px solid var(--ink)',
        position: 'relative',
        background: 'var(--paper)',
        overflow: 'hidden',
      }}
    >
      <Watermark
        style={{
          bottom: -40,
          left: -20,
          fontSize: m ? '160px' : 'clamp(180px, 22vw, 360px)',
        }}
      >
        SHOP
      </Watermark>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: m ? 'flex-start' : 'flex-end',
          marginBottom: m ? 24 : 44,
          flexDirection: m ? 'column' : 'row',
          gap: m ? 12 : 24,
        }}
      >
        <div>
          <SectionTag num="02" label="קטלוג · הכי נמכרים" />
          <h2
            className="display"
            style={{
              fontSize: m ? 'clamp(54px, 14vw, 80px)' : 'clamp(70px, 9vw, 130px)',
              margin: m ? '12px 0 0' : '18px 0 0',
              lineHeight: 0.88,
            }}
          >
            הקלאסיקות<span style={{ color: accent }}>.</span>
          </h2>
          <div
            style={{
              fontFamily: 'var(--serif)',
              fontSize: m ? 16 : 20,
              fontStyle: 'italic',
              opacity: 0.7,
              marginTop: 8,
            }}
          >
            ששת הפירות שהכי קונים אצלנו השבוע.
          </div>
        </div>
      </div>

      <div
        className={m ? 'snap-x' : ''}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          gap: m ? 6 : 10,
          flexWrap: m ? 'nowrap' : 'wrap',
          marginBottom: m ? 22 : 32,
          overflowX: m ? 'auto' : 'visible',
          paddingBottom: m ? 4 : 0,
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              padding: m ? '8px 14px' : '10px 18px',
              background: active === c.id ? 'var(--ink)' : 'var(--paper)',
              color: active === c.id ? 'var(--paper)' : 'var(--ink)',
              fontFamily: 'var(--display)',
              fontWeight: 700,
              fontSize: m ? 13 : 15,
              borderRadius: 999,
              border: '1.5px solid var(--ink)',
              boxShadow: active === c.id ? '4px 4px 0 var(--ink)' : '3px 3px 0 var(--ink)',
              transition: 'all 200ms var(--easing)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
          >
            {c.label}
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 10,
                marginInlineStart: 6,
                padding: '2px 6px',
                background:
                  active === c.id ? 'rgba(253,251,245,0.18)' : 'var(--paper-2)',
                borderRadius: 999,
              }}
            >
              {c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c.id).length}
            </span>
          </button>
        ))}
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
          gap: m ? 14 : 20,
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={p.name} product={p} accent={accent} compact={m} />
        ))}
      </div>
    </section>
  );
}

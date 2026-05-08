'use client';
import { useState } from 'react';
import { useCompact } from '@/hooks/use-compact';
import { SectionTag } from '@/components/brand/SectionTag';
import { Watermark } from '@/components/brand/Watermark';

const ITEMS = [
  { q: 'הזמנתי קיאק XL לחתונה של אחי. כל האורחים צילמו אותו לפני שאכלו.', a: 'נירית', r: 'חתונה ב-180 איש', stars: 5 },
  { q: 'אני קונה אצלם פירות פעמיים בשבוע כבר שנתיים. הילדים אוהבים, אני אוהבת את המחירים.', a: 'תהילה', r: 'דימונה', stars: 5 },
  { q: 'הקיאק הגיע בדיוק בזמן, נראה כמו תמונה מאינסטגרם.', a: 'יוסי', r: 'בר מצווה · ערד', stars: 5 },
];

type Props = { accent?: string; compact?: boolean };

export function Testimonials({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);
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
          bottom: -50,
          right: -30,
          fontSize: m ? '140px' : 'clamp(180px, 22vw, 360px)',
        }}
      >
        ★★★★★
      </Watermark>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: m ? 'flex-start' : 'flex-end',
          flexDirection: m ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: m ? 14 : 24,
          marginBottom: m ? 24 : 48,
        }}
      >
        <div>
          <SectionTag num="06" label="מה אומרים עלינו" />
          <h2
            className="display"
            style={{
              fontSize: m ? 'clamp(50px, 14vw, 80px)' : 'clamp(60px, 8vw, 120px)',
              margin: m ? '12px 0 0' : '18px 0 0',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
            }}
          >
            לקוחות{' '}
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: accent,
              }}
            >
              חוזרים.
            </span>
          </h2>
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: m ? 11 : 13,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            background: accent,
            color: 'var(--paper)',
            padding: m ? '10px 16px' : '14px 22px',
            border: '2px solid var(--ink)',
            boxShadow: '5px 5px 0 var(--ink)',
          }}
        >
          ★ 4.9 · 280 ביקורות
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
          gap: m ? 16 : 24,
        }}
      >
        {ITEMS.map((t, i) => (
          <TestimonialCard key={i} item={t} accent={accent} idx={i} m={m} />
        ))}
      </div>
    </section>
  );
}

type Item = { q: string; a: string; r: string; stars: number };

function TestimonialCard({ item, accent, idx, m }: { item: Item; accent: string; idx: number; m: boolean }) {
  const [hover, setHover] = useState(false);
  const tilt = idx % 2 === 0 ? -1 : 1;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: m ? '24px 22px 20px' : '36px 32px 28px',
        border: '1.5px solid var(--ink)',
        background: 'var(--paper)',
        position: 'relative',
        transition: 'all 260ms var(--easing)',
        transform: hover
          ? 'translate(-4px, -4px) rotate(0deg)'
          : `translate(0,0) rotate(${tilt * 0.6}deg)`,
        boxShadow: hover ? '9px 9px 0 var(--ink)' : '4px 4px 0 var(--ink)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -14,
          right: m ? 18 : 24,
          fontFamily: 'var(--display)',
          fontWeight: 900,
          fontSize: m ? 64 : 84,
          lineHeight: 0.6,
          color: accent,
          textShadow: '3px 3px 0 var(--ink)',
          userSelect: 'none',
        }}
      >
        &ldquo;
      </div>

      <div
        style={{
          display: 'flex',
          gap: 4,
          color: accent,
          marginBottom: 14,
          fontSize: m ? 14 : 16,
        }}
      >
        {Array.from({ length: item.stars }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      <div
        style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: m ? 17 : 22,
          lineHeight: 1.45,
        }}
      >
        {item.q}
      </div>

      <div
        style={{
          marginTop: m ? 18 : 24,
          paddingTop: m ? 14 : 18,
          borderTop: '1px dashed rgba(0,0,0,.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: m ? 30 : 36,
              height: m ? 30 : 36,
              background: accent,
              color: 'var(--paper)',
              border: '2px solid var(--ink)',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--display)',
              fontWeight: 900,
              fontSize: m ? 12 : 14,
            }}
          >
            {item.a[0]}
          </div>
          <div
            style={{
              fontFamily: 'var(--display)',
              fontWeight: 800,
              fontSize: m ? 14 : 16,
            }}
          >
            {item.a}
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: m ? 9 : 11,
            opacity: 0.6,
            letterSpacing: '0.1em',
          }}
        >
          {item.r}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useCompact } from '@/hooks/use-compact';

const ITEMS = [
  { icon: '✻', t: 'נחתך באותו יום', d: 'אין מלאי לא טרי' },
  { icon: '↻', t: 'משלוח עד 14:00', d: 'הזמנה עד 11:00' },
  { icon: '◆', t: 'קיאקים בהתאמה', d: 'גודל, פירות, תוספות' },
  { icon: '✦', t: 'דרום הארץ', d: 'דימונה, ערד, באר שבע' },
];

type Props = { accent?: string; compact?: boolean };

export function ValuePropsBar({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);
  return (
    <section
      style={{
        padding: m ? '20px 16px' : '36px 40px',
        borderBottom: '2px solid var(--ink)',
        display: 'grid',
        gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)',
        gap: m ? 16 : 0,
        background: 'var(--paper)',
      }}
    >
      {ITEMS.map((f, i) => (
        <div
          key={f.t}
          style={{
            padding: m ? 0 : '4px 24px',
            borderRight: m ? 'none' : i < 3 ? '1px solid rgba(0,0,0,.15)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: m ? 12 : 18,
          }}
        >
          <div
            style={{
              width: m ? 38 : 52,
              height: m ? 38 : 52,
              display: 'grid',
              placeItems: 'center',
              background: i === 0 ? accent : 'var(--paper-2)',
              color: i === 0 ? 'var(--paper)' : 'var(--ink)',
              border: '1.5px solid var(--ink)',
              boxShadow: m ? '2px 2px 0 var(--ink)' : '3px 3px 0 var(--ink)',
              fontSize: m ? 18 : 24,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {f.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 800,
                fontSize: m ? 13 : 18,
                lineHeight: 1.15,
              }}
            >
              {f.t}
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: m ? 9 : 11,
                opacity: 0.6,
                marginTop: 4,
                letterSpacing: '0.04em',
              }}
            >
              {f.d}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

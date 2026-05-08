'use client';
import { useCompact } from '@/hooks/use-compact';

type Props = { compact?: boolean };

const COLS = [
  { title: 'חנות', items: ['פירות קלופים', 'סלטי פירות', 'פירות יער', 'מבצעי השבוע'] },
  { title: 'קיאקים', items: ['בנה קיאק', 'דוגמאות', 'אירוע עסקי', 'חתונות'] },
  { title: 'צרו קשר', items: ['דימונה, רח׳ הדקל 12', '054-000-0000', 'מבזק על וואטסאפ'] },
];

export function SiteFooter({ compact }: Props) {
  const m = useCompact(compact);
  return (
    <footer
      style={{
        background: '#0a0a0a',
        color: '#F5F0E8',
        padding: m ? '32px 16px 18px' : '50px 40px 24px',
        borderTop: '2px solid var(--watermelon)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '2fr 1fr 1fr 1fr',
          gap: m ? 28 : 40,
          marginBottom: m ? 28 : 40,
        }}
      >
        <div>
          <div
            className="display"
            style={{ fontSize: m ? 56 : 64, letterSpacing: '-0.05em', lineHeight: 0.85 }}
          >
            פרי לי.
          </div>
          <div
            style={{
              fontFamily: 'var(--serif)',
              fontSize: m ? 14 : 16,
              marginTop: 14,
              opacity: 0.7,
              maxWidth: 320,
            }}
          >
            פירות קלופים טריים בכל בוקר, וקיאקי פירות לאירועים שלא שוכחים.
          </div>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                opacity: 0.5,
                marginBottom: 14,
              }}
            >
              {c.title}
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {c.items.map((x) => (
                <li key={x} style={{ fontSize: 14 }}>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: '1px solid rgba(245,240,232,0.15)',
          paddingTop: 16,
          display: 'flex',
          flexDirection: m ? 'column' : 'row',
          gap: m ? 6 : 0,
          justifyContent: 'space-between',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          opacity: 0.5,
        }}
      >
        <span>© 2026 פרי לי. כל הזכויות שמורות.</span>
        <span>FRESH · LOCAL · DIMONA</span>
      </div>
    </footer>
  );
}

'use client';
import { useCompact } from '@/hooks/use-compact';
import { SectionTag } from '@/components/brand/SectionTag';
import { Watermark } from '@/components/brand/Watermark';

const STEPS = [
  { n: '03:00', t: 'שוק העיר', d: 'בוחרים פירות אחד אחד.', ico: '◐' },
  { n: '06:00', t: 'במטבח', d: 'שוטפים, קולפים, חותכים.', ico: '✻' },
  { n: '07:30', t: 'במקרר', d: 'אורזים, מתייגים, מסדרים.', ico: '◆' },
  { n: '11:00', t: 'אצלכם', d: 'משלוח חינם בדימונה.', ico: '✦' },
];

type Props = { accent?: string; compact?: boolean };

export function ProcessSection({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);
  return (
    <section
      style={{
        padding: m ? '50px 16px' : '100px 40px',
        borderBottom: '2px solid var(--ink)',
        background: 'var(--paper-2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Watermark
        style={{
          top: m ? 30 : 60,
          right: -40,
          fontSize: m ? '160px' : 'clamp(220px, 26vw, 420px)',
        }}
      >
        04:30
      </Watermark>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionTag num="04" label="היום שלנו" />
        <h2
          className="display"
          style={{
            fontSize: m ? 'clamp(50px, 14vw, 80px)' : 'clamp(70px, 9vw, 140px)',
            marginTop: m ? 12 : 18,
            marginBottom: m ? 8 : 12,
            lineHeight: 0.9,
            letterSpacing: '-0.05em',
          }}
        >
          איך פרי{' '}
          <span
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: accent,
            }}
          >
            מגיע
          </span>{' '}
          אליכם.
        </h2>
        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: m ? 16 : 20,
            opacity: 0.75,
            marginBottom: m ? 28 : 50,
            maxWidth: 580,
          }}
        >
          ארבע שעות בין השוק לבין הצלחת שלכם.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {!m && (
          <div
            style={{
              position: 'absolute',
              top: 60,
              left: 40,
              right: 40,
              height: 2,
              background:
                'repeating-linear-gradient(to right, var(--ink) 0 8px, transparent 8px 14px)',
              zIndex: 0,
            }}
          />
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(4, 1fr)',
            gap: m ? 16 : 24,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: m ? '22px 18px' : '32px 24px',
                background: 'var(--paper)',
                border: '1.5px solid var(--ink)',
                boxShadow: m ? '4px 4px 0 var(--ink)' : '6px 6px 0 var(--ink)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -16,
                  right: m ? 14 : 20,
                  width: m ? 34 : 40,
                  height: m ? 34 : 40,
                  background: i === 1 ? accent : 'var(--ink)',
                  color: 'var(--paper)',
                  border: '2px solid var(--ink)',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--display)',
                  fontWeight: 900,
                  fontSize: m ? 13 : 16,
                  boxShadow: '3px 3px 0 var(--ink)',
                }}
              >
                0{i + 1}
              </div>

              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: m ? 10 : 11,
                  opacity: 0.5,
                  letterSpacing: '0.18em',
                  marginBottom: m ? 8 : 12,
                }}
              >
                STEP
              </div>
              <div
                style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 900,
                  fontSize: m ? 28 : 36,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: i === 1 ? accent : 'var(--ink)',
                }}
              >
                {s.n}
              </div>
              <div
                className="display"
                style={{
                  fontSize: m ? 22 : 28,
                  marginTop: m ? 10 : 14,
                  marginBottom: m ? 6 : 10,
                  letterSpacing: '-0.03em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ fontSize: m ? 18 : 22, color: accent }}>{s.ico}</span>
                {s.t}
              </div>
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: m ? 14 : 16,
                  lineHeight: 1.5,
                  opacity: 0.8,
                }}
              >
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

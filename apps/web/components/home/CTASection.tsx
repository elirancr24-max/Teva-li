'use client';
import { useCompact } from '@/hooks/use-compact';
import { Fruit } from '@/components/fruits/Fruit';

type Props = { accent?: string; compact?: boolean };

export function CTASection({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);
  return (
    <section
      style={{
        padding: m ? '70px 16px 80px' : '130px 40px 140px',
        background: accent,
        color: 'var(--paper)',
        borderBottom: '2px solid var(--ink)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(10,10,10,0.12) 1.5px, transparent 1.6px)',
          backgroundSize: '14px 14px',
          pointerEvents: 'none',
        }}
      />

      {!m && (
        <>
          <div style={{ position: 'absolute', top: 50, left: '8%', opacity: 0.85 }}>
            <div className="float-y" style={{ animationDuration: '7s' }}>
              <Fruit kind="strawberry" size={110} alt="" />
            </div>
          </div>
          <div style={{ position: 'absolute', top: 80, right: '10%', opacity: 0.85 }}>
            <div className="float-y" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}>
              <Fruit kind="pineapple" size={120} alt="" />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 50, left: '12%', opacity: 0.85 }}>
            <div className="float-y" style={{ animationDuration: '6.5s', animationDelay: '1s' }}>
              <Fruit kind="kiwi" size={90} alt="" />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 80, right: '14%', opacity: 0.85 }}>
            <div className="float-y" style={{ animationDuration: '6s', animationDelay: '1.5s' }}>
              <Fruit kind="grape" size={100} alt="" />
            </div>
          </div>
        </>
      )}
      {m && (
        <>
          <div style={{ position: 'absolute', top: 30, left: 16, opacity: 0.8 }}>
            <div className="float-y">
              <Fruit kind="strawberry" size={60} alt="" />
            </div>
          </div>
          <div style={{ position: 'absolute', top: 30, right: 16, opacity: 0.8 }}>
            <div className="float-y" style={{ animationDelay: '0.6s' }}>
              <Fruit kind="pineapple" size={68} alt="" />
            </div>
          </div>
        </>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-flex',
            gap: 8,
            padding: m ? '6px 12px' : '8px 16px',
            background: 'var(--ink)',
            color: accent,
            fontFamily: 'var(--mono)',
            fontSize: m ? 10 : 11,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            boxShadow: '4px 4px 0 var(--paper)',
          }}
        >
          <span className="pulse-dot" style={{ background: accent }} /> פתוח עכשיו
        </div>

        <h2
          className="display"
          style={{
            fontSize: m ? 'clamp(70px, 22vw, 130px)' : 'clamp(80px, 13vw, 220px)',
            margin: m ? '20px 0 0' : '32px 0 0',
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
          }}
        >
          בא לכם{' '}
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>
            פרי
          </span>
          <span>?</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: m ? 18 : 24,
            lineHeight: 1.4,
            fontWeight: 600,
            margin: m ? '16px auto 0' : '24px auto 0',
            maxWidth: 640,
          }}
        >
          הזמנה עד 11:00 = אצלך עד 14:00.{' '}
          <em style={{ fontWeight: 700 }}>פשוט וטרי.</em>
        </p>

        <div
          style={{
            display: 'flex',
            gap: m ? 10 : 16,
            justifyContent: 'center',
            marginTop: m ? 28 : 44,
            flexWrap: 'wrap',
          }}
        >
          <button
            className="btn"
            style={{
              background: 'var(--ink)',
              color: accent,
              borderColor: 'var(--ink)',
              boxShadow: '5px 5px 0 var(--paper)',
              padding: m ? '14px 22px' : '18px 32px',
              fontSize: m ? 15 : 17,
            }}
          >
            פתח את הקטלוג →
          </button>
          <button
            className="btn outline"
            style={{
              background: 'var(--paper)',
              borderColor: 'var(--ink)',
              boxShadow: '5px 5px 0 var(--ink)',
              padding: m ? '14px 22px' : '18px 32px',
              fontSize: m ? 15 : 17,
            }}
          >
            בנה קיאק
          </button>
        </div>

        <div
          style={{
            marginTop: m ? 32 : 56,
            paddingTop: m ? 18 : 28,
            borderTop: '1px solid rgba(253,251,245,0.25)',
            display: 'flex',
            justifyContent: 'center',
            gap: m ? 10 : 36,
            flexWrap: 'wrap',
            fontFamily: 'var(--mono)',
            fontSize: m ? 10 : 12,
            letterSpacing: m ? '0.1em' : '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <span>✓ משלוח חינם בדימונה</span>
          <span>✓ הזמנה עד 11:00</span>
          <span>✓ אצלך עד 14:00</span>
        </div>
      </div>
    </section>
  );
}

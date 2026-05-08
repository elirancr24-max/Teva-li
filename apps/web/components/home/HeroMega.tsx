'use client';
import Image from 'next/image';
import { useCompact } from '@/hooks/use-compact';
import { SectionTag } from '@/components/brand/SectionTag';
import { Sticker } from '@/components/brand/Sticker';
import { Watermark } from '@/components/brand/Watermark';
import { Halo } from '@/components/brand/Halo';

type Props = { accent?: string; compact?: boolean };

export function HeroMega({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);

  return (
    <section
      style={{
        position: 'relative',
        borderBottom: '2px solid var(--ink)',
        background: 'var(--paper)',
        overflow: 'hidden',
      }}
    >
      <Watermark
        style={{
          top: m ? 40 : 80,
          right: -30,
          fontSize: m ? '180px' : 'clamp(280px, 38vw, 560px)',
          opacity: 0.045,
        }}
      >
        2026
      </Watermark>

      {/* meta strip */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: m ? '10px 16px' : '16px 40px',
          borderBottom: '1px solid var(--ink)',
          fontFamily: 'var(--mono)',
          fontSize: m ? 9 : 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          zIndex: 2,
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        {!m && <span>גליון 12 · אביב 2026 · דימונה</span>}
        <span style={{ display: 'flex', gap: m ? 12 : 28, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span className="pulse-dot" /> נחתך הבוקר
          </span>
          {!m && <span>22°C</span>}
          <span>{m ? 'משלוח 14:00' : 'משלוח עד 14:00'}</span>
        </span>
        {!m && <span>פרי לי ™ · est. 2018</span>}
      </div>

      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '1.4fr 1fr',
          minHeight: m ? 'auto' : 760,
          zIndex: 1,
        }}
      >
        {/* LEFT — type */}
        <div
          style={{
            padding: m ? '36px 20px 32px' : '70px 56px 50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderLeft: m ? 'none' : '1px solid var(--ink)',
            position: 'relative',
          }}
        >
          <div>
            <div className="rise">
              <SectionTag num="01" label={m ? 'פירות קלופים' : 'פירות קלופים · קיאקי אירועים'} />
            </div>

            <h1
              className="display rise-d1"
              style={{
                position: 'relative',
                fontSize: m ? 'clamp(72px, 22vw, 120px)' : 'clamp(110px, 14vw, 240px)',
                margin: m ? '20px 0 0' : '36px 0 0',
                lineHeight: 0.82,
                letterSpacing: '-0.06em',
              }}
            >
              {/* shadow letter behind */}
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  color: 'transparent',
                  WebkitTextStroke: '1.5px rgba(10,10,10,0.18)',
                  pointerEvents: 'none',
                  whiteSpace: 'pre',
                }}
              >
                {`פרי\nשנחתך\nעכשיו.`}
              </span>
              פרי
              <br />
              ש
              <span
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: accent,
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                נחתך
                <span
                  className="draw-line"
                  style={{
                    position: 'absolute',
                    bottom: '0.06em',
                    right: 0,
                    left: 0,
                    background: accent,
                    opacity: 0.35,
                  }}
                />
              </span>
              <br />
              עכשיו<span style={{ color: accent }}>.</span>
            </h1>
          </div>

          <div style={{ marginTop: m ? 24 : 44 }} className="rise-d2">
            <div style={{ width: m ? 48 : 64, height: 4, background: accent, marginBottom: m ? 16 : 22 }} />
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontSize: m ? 17 : 22,
                lineHeight: 1.5,
                maxWidth: 540,
                margin: 0,
                marginBottom: m ? 22 : 32,
              }}
            >
              ב-3 בלילה אנחנו בשוק העיר. ב-7 בבוקר זה כבר על המדף — קלוף, חתוך, ארוז.{' '}
              <em style={{ color: accent, fontWeight: 700 }}>מדימונה, ביד, באותו יום.</em>
            </p>
            <div style={{ display: 'flex', gap: m ? 10 : 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="btn primary"
                style={{
                  background: accent,
                  ...(m ? { padding: '14px 22px', fontSize: 15, flex: '1 0 auto' } : {}),
                }}
              >
                הזמן עכשיו →
              </button>
              <button
                className="btn outline"
                style={m ? { padding: '14px 22px', fontSize: 15, flex: '1 0 auto' } : {}}
              >
                בנה קיאק
              </button>
              {!m && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    opacity: 0.65,
                    marginInlineStart: 6,
                  }}
                >
                  <span style={{ width: 24, height: 1, background: 'var(--ink)' }} />
                  ★★★★★ 4.9 · 280 ביקורות
                </div>
              )}
            </div>
            {m && (
              <div
                style={{
                  marginTop: 14,
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  opacity: 0.65,
                }}
              >
                ★★★★★ 4.9 · 280 ביקורות
              </div>
            )}
          </div>

          {!m && (
            <>
              <div style={{ position: 'absolute', top: 90, left: 50 }}>
                <div className="float-tilt">
                  <Sticker color={accent} rotate={-8} dark>
                    טרי 100%
                  </Sticker>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 200, left: 30 }}>
                <div
                  style={{
                    transform: 'rotate(8deg)',
                    padding: '10px 14px',
                    background: 'var(--citrus)',
                    border: '2px solid var(--ink)',
                    boxShadow: '4px 4px 0 var(--ink)',
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  ★ דימונה
                </div>
              </div>
            </>
          )}
          {m && (
            <div style={{ position: 'absolute', top: 24, left: 16, zIndex: 3 }}>
              <div className="float-tilt">
                <Sticker color={accent} rotate={-8} dark>
                  טרי
                </Sticker>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — kayak photo block */}
        <div
          style={{
            background: 'var(--ink)',
            color: 'var(--paper)',
            borderLeft: m ? 'none' : '1px solid var(--ink)',
            borderTop: m ? '1px solid var(--ink)' : 'none',
            position: 'relative',
            padding: m ? '24px 16px' : '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, rgba(253,251,245,0.08) 1px, transparent 1.5px)',
              backgroundSize: '14px 14px',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--mono)',
              fontSize: m ? 9 : 10,
              letterSpacing: '0.18em',
              opacity: 0.7,
            }}
          >
            <span>FIG. 01 — KAYAK XL</span>
            <span>{m ? '50 אורחים' : '50 אורחים · 90cm'}</span>
          </div>

          <div
            style={{
              position: 'relative',
              margin: m ? '16px 0' : '30px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: m ? 220 : 360,
            }}
          >
            <Halo color={accent} />
            <div
              className="float-y"
              style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 540 }}
            >
              <Image
                src="/kayak-real.jpg"
                alt="קיאק פירות"
                width={1200}
                height={800}
                priority
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: m
                    ? 'drop-shadow(6px 8px 0 rgba(0,0,0,0.55)) drop-shadow(0 14px 18px rgba(0,0,0,0.4))'
                    : 'drop-shadow(10px 14px 0 rgba(0,0,0,0.55)) drop-shadow(0 24px 30px rgba(0,0,0,0.4))',
                }}
              />
            </div>

            <div style={{ position: 'absolute', top: 8, right: 12, zIndex: 3, transform: 'rotate(8deg)' }}>
              <div
                style={{
                  padding: m ? '6px 10px' : '8px 14px',
                  background: accent,
                  color: 'var(--paper)',
                  border: '2px solid var(--ink)',
                  boxShadow: '4px 4px 0 var(--paper)',
                  fontFamily: 'var(--mono)',
                  fontSize: m ? 10 : 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {m ? 'XL' : 'חדש · XL'}
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: -6,
                left: '5%',
                right: '5%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'var(--mono)',
                fontSize: m ? 9 : 10,
                opacity: 0.65,
                letterSpacing: '0.18em',
                zIndex: 2,
              }}
            >
              <span>↤ 90cm ↦</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="pulse-dot" style={{ background: accent }} /> בהזמנה
              </span>
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: m ? 12 : 18,
              paddingTop: m ? 18 : 26,
              borderTop: '1px solid rgba(253,251,245,.2)',
            }}
          >
            <FeatureItem label="גודל" value="S · M · L · XL" m={m} />
            <FeatureItem label="פירות" value="עד 18 זנים" m={m} />
            <FeatureItem label="הכנה" value="ביום האירוע" m={m} />
            <FeatureItem label="מ-" value="₪480" accent={accent} m={m} />
          </div>
        </div>
      </div>

      {/* stats bar */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderTop: '1px solid var(--ink)',
          display: 'grid',
          gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          background: 'var(--paper)',
        }}
      >
        {(
          [
            ['450+', 'אירועים', '🎉'],
            ['18', 'זני פירות', '✻'],
            ['04:30', 'ניקיון יומי', '◐'],
            ['8 שנים', 'בדימונה', '◆'],
          ] as const
        ).map(([n, l, ico], i) => (
          <div
            key={i}
            style={{
              padding: m ? '16px 14px' : '26px 30px',
              borderRight: m
                ? i % 2 === 0
                  ? '1px solid var(--ink)'
                  : 'none'
                : i < 3
                  ? '1px solid var(--ink)'
                  : 'none',
              borderBottom: m && i < 2 ? '1px solid var(--ink)' : 'none',
              display: 'flex',
              alignItems: 'baseline',
              gap: m ? 10 : 16,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: m ? 13 : 16, color: accent }}>{ico}</span>
            <div
              style={{
                fontFamily: 'var(--display)',
                fontWeight: 900,
                fontSize: m ? 28 : 46,
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              {n}
            </div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: m ? 9 : 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                opacity: 0.6,
              }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureItem({
  label,
  value,
  accent,
  m,
}: {
  label: string;
  value: string;
  accent?: string;
  m: boolean;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: m ? 8 : 9,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.5,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 800,
          fontSize: m ? 14 : 18,
          marginTop: 4,
          color: accent ?? 'inherit',
        }}
      >
        {value}
      </div>
    </div>
  );
}

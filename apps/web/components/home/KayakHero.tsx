'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useCompact } from '@/hooks/use-compact';
import { SectionTag } from '@/components/brand/SectionTag';
import { Watermark } from '@/components/brand/Watermark';
import { Halo } from '@/components/brand/Halo';
import { Sticker } from '@/components/brand/Sticker';

type Props = { accent?: string; compact?: boolean };

const SIZES = [
  ['S', '8–12', '₪480'],
  ['M', '15–25', '₪780'],
  ['L', '30–50', '₪1,180'],
  ['XL', '60+', '₪1,680'],
] as const;

export function KayakHero({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);
  return (
    <section
      style={{
        padding: m ? '60px 16px' : '110px 40px',
        background: 'var(--ink)',
        color: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '2px solid var(--ink)',
      }}
    >
      <Watermark
        style={{
          top: m ? 20 : 40,
          left: -40,
          fontSize: m ? '180px' : 'clamp(220px, 28vw, 460px)',
          color: 'var(--paper)',
          opacity: 0.07,
        }}
      >
        KAYAK.
      </Watermark>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionTag num="03" label={m ? 'קיאקי פירות' : 'קיאקי פירות · בלעדי לאירועים'} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '1fr 1.3fr',
          gap: m ? 30 : 70,
          marginTop: m ? 24 : 50,
          alignItems: 'center',
        }}
      >
        <div>
          <h2
            className="display"
            style={{
              fontSize: m ? 'clamp(56px, 16vw, 90px)' : 'clamp(70px, 10vw, 170px)',
              margin: 0,
              lineHeight: 0.85,
              color: 'var(--paper)',
              letterSpacing: '-0.05em',
            }}
          >
            מגש{' '}
            <span
              style={{
                color: accent,
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 400,
              }}
            >
              בצורת
            </span>
            <br />
            קיאק<span style={{ color: accent }}>.</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: m ? 17 : 22,
              lineHeight: 1.55,
              marginTop: m ? 20 : 32,
              maxWidth: 480,
              opacity: 0.92,
            }}
          >
            עמוס בפירות חתוכים, מסודרים כמו ציור. אורחים ניגשים, לוקחים, מתפעלים.{' '}
            <em style={{ color: accent }}>מגיע ביום האירוע.</em>
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: m ? 10 : 14,
              marginTop: m ? 28 : 44,
              maxWidth: 480,
            }}
          >
            {SIZES.map(([sz, gt, pr], i) => (
              <KayakSizeCard
                key={sz}
                size={sz}
                guests={gt}
                price={pr}
                accent={accent}
                highlight={i === 2}
                m={m}
              />
            ))}
          </div>

          <button
            className="btn"
            style={{
              background: accent,
              color: 'var(--paper)',
              borderColor: accent,
              marginTop: m ? 24 : 36,
              boxShadow: '4px 4px 0 var(--paper)',
            }}
          >
            פתח קונפיגורטור →
          </button>
        </div>

        <div style={{ position: 'relative', order: m ? -1 : 0 }}>
          <Halo color={accent} opacity={0.45} blur={60} />
          <div className="float-y" style={{ position: 'relative', zIndex: 2 }}>
            <Image
              src="/kayak-real.jpg"
              alt="קיאק פירות לאירועים"
              width={1200}
              height={800}
              style={{
                width: '100%',
                height: 'auto',
                filter: m
                  ? 'drop-shadow(8px 10px 0 rgba(0,0,0,0.55)) drop-shadow(0 18px 24px rgba(0,0,0,0.5))'
                  : 'drop-shadow(14px 18px 0 rgba(0,0,0,0.55)) drop-shadow(0 30px 40px rgba(0,0,0,0.5))',
              }}
            />
          </div>

          <div style={{ position: 'absolute', top: -10, right: -10, zIndex: 3 }}>
            <div className="float-tilt">
              <Sticker color={accent} rotate={-6} dark>
                L · 30 אורחים
              </Sticker>
            </div>
          </div>

          {!m && (
            <div style={{ position: 'absolute', bottom: 30, left: -20, zIndex: 3 }}>
              <div
                style={{
                  transform: 'rotate(6deg)',
                  padding: '10px 14px',
                  background: 'var(--paper)',
                  color: 'var(--ink)',
                  border: '2px solid var(--paper)',
                  boxShadow: `4px 4px 0 ${accent}`,
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                18 זנים
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function KayakSizeCard({
  size,
  guests,
  price,
  accent,
  highlight,
  m,
}: {
  size: string;
  guests: string;
  price: string;
  accent: string;
  highlight: boolean;
  m: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: m ? '14px 14px' : '18px 20px',
        border: highlight
          ? `1.5px solid ${accent}`
          : '1px solid rgba(253,251,245,.25)',
        background: hover ? accent : highlight ? 'rgba(201,24,74,0.22)' : 'transparent',
        color: hover ? 'var(--paper)' : 'var(--paper)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 220ms var(--easing)',
        transform: hover ? 'translate(-2px, -2px)' : 'translate(0,0)',
        position: 'relative',
      }}
    >
      {highlight && !hover && (
        <span
          style={{
            position: 'absolute',
            top: -10,
            left: m ? 8 : 12,
            padding: m ? '2px 6px' : '3px 8px',
            background: accent,
            color: 'var(--paper)',
            fontFamily: 'var(--mono)',
            fontSize: m ? 8 : 9,
            fontWeight: 700,
            letterSpacing: '0.12em',
            border: '1px solid var(--ink)',
          }}
        >
          {m ? 'פופולרי' : 'הכי פופולרי'}
        </span>
      )}
      <div>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontWeight: 900,
            fontSize: m ? 20 : 24,
            letterSpacing: '-0.04em',
          }}
        >
          {size}
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: m ? 9 : 10,
            opacity: 0.6,
            letterSpacing: '0.1em',
            marginTop: 2,
          }}
        >
          {guests}
        </div>
      </div>
      <div
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 800,
          fontSize: m ? 16 : 19,
        }}
      >
        {price}
      </div>
    </div>
  );
}

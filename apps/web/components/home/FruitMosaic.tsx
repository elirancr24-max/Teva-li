'use client';
import { useState } from 'react';
import { useCompact } from '@/hooks/use-compact';
import { SectionTag } from '@/components/brand/SectionTag';
import { Fruit, type FruitKind } from '@/components/fruits/Fruit';

const TILES: { k: FruitKind; n: string }[] = [
  { k: 'pineapple', n: 'אננס' },
  { k: 'watermelon', n: 'אבטיח' },
  { k: 'strawberry', n: 'תות' },
  { k: 'grape', n: 'ענבים' },
  { k: 'melon', n: 'מלון' },
  { k: 'kiwi', n: 'קיווי' },
  { k: 'mango', n: 'מנגו' },
  { k: 'cherry', n: 'דובדבן' },
];

const TAGS = [
  'אננס', 'אבטיח', 'מלון', 'תות', 'ענבים', 'קיווי',
  'מנגו', 'פפאיה', 'ליצ׳י', 'תאנה', 'רימון', 'אבוקדו',
];

type Props = { accent?: string; compact?: boolean };

export function FruitMosaic({ accent = 'var(--watermelon)', compact }: Props) {
  const m = useCompact(compact);
  return (
    <section
      style={{
        padding: m ? '50px 16px' : '100px 40px',
        borderBottom: '2px solid var(--ink)',
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1fr 1.4fr',
        gap: m ? 28 : 70,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionTag num="05" label="הזנים שלנו" />
        <h2
          className="display"
          style={{
            fontSize: m ? 'clamp(50px, 14vw, 80px)' : 'clamp(60px, 8vw, 120px)',
            margin: m ? '12px 0 0' : '18px 0 0',
            lineHeight: 0.88,
            letterSpacing: '-0.05em',
          }}
        >
          18 זנים<span style={{ color: accent }}>.</span>
          <br />
          <span
            style={{
              fontFamily: 'var(--serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '0.66em',
            }}
          >
            מתחלפים יומית.
          </span>
        </h2>
        <p
          style={{
            fontFamily: 'var(--serif)',
            fontSize: m ? 16 : 20,
            lineHeight: 1.55,
            maxWidth: 420,
            marginTop: m ? 16 : 24,
          }}
        >
          מה שיש בשוק היום — נמצא אצלנו. אבוקדו, פפאיה, ליצ׳י, תאנים, רימונים, אננס.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: m ? 18 : 28 }}>
          {TAGS.map((t, i) => (
            <span
              key={t}
              style={{
                padding: m ? '4px 10px' : '6px 14px',
                fontSize: m ? 11 : 12,
                border: '1.5px solid var(--ink)',
                borderRadius: 999,
                background: 'var(--paper)',
                fontFamily: 'var(--mono)',
                fontWeight: 700,
                boxShadow: '2px 2px 0 var(--ink)',
                transform: `rotate(${(i % 3 - 1) * 1}deg)`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: m ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
          gap: m ? 8 : 14,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {TILES.slice(0, m ? 6 : 8).map((it, i) => (
          <MosaicCell key={i} kind={it.k} name={it.n} index={i} accent={accent} m={m} />
        ))}
      </div>
    </section>
  );
}

function MosaicCell({
  kind,
  name,
  index,
  accent,
  m,
}: {
  kind: FruitKind;
  name: string;
  index: number;
  accent: string;
  m: boolean;
}) {
  const [hover, setHover] = useState(false);
  const bg = index % 3 === 0 ? accent : index % 3 === 1 ? 'var(--paper-2)' : 'var(--paper)';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        aspectRatio: '1',
        border: '1.5px solid var(--ink)',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 280ms var(--easing)',
        transform: hover ? 'translate(-3px, -3px) rotate(-1deg)' : 'translate(0,0) rotate(0)',
        boxShadow: hover ? '6px 6px 0 var(--ink)' : '0 0 0 var(--ink)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          transition: 'transform 320ms var(--easing)',
          transform: hover ? 'scale(1.12) rotate(4deg)' : 'scale(1)',
        }}
      >
        <Fruit kind={kind} size={m ? 80 : 140} alt={name} />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 6,
          left: 6,
          fontFamily: 'var(--mono)',
          fontSize: m ? 8 : 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          background: hover ? 'var(--ink)' : 'transparent',
          color: hover ? 'var(--paper)' : 'var(--ink)',
          padding: m ? '2px 5px' : '3px 7px',
          transition: 'all 240ms',
        }}
      >
        0{index + 1} · {name}
      </div>
    </div>
  );
}

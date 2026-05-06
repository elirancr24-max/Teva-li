/* shared.jsx — common pieces: fruits (CSS art), header, footer, sticker */
const { useState, useEffect, useMemo, useRef } = React;

/* ---------- Fruit illustrations (CSS only) ---------- */

function PineappleArt({ size = 120 }) {
  return (
    <div style={{ width: size, height: size * 1.3, position: 'relative' }}>
      {/* leaves */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: size * 0.7, height: size * 0.5,
      }}>
        {[-30, -10, 10, 30].map((rot, i) => (
          <div key={i} style={{
            position: 'absolute', left: '50%', bottom: 0,
            transform: `translateX(-50%) rotate(${rot}deg)`,
            transformOrigin: 'bottom center',
            width: size * 0.12, height: size * 0.45,
            background: 'var(--leaf)',
            clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
          }} />
        ))}
      </div>
      {/* body */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: size, height: size * 0.85,
        background: 'var(--citrus)',
        borderRadius: '40% 40% 45% 45%',
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,.18) 0 2px, transparent 2px 14px), repeating-linear-gradient(-45deg, rgba(0,0,0,.18) 0 2px, transparent 2px 14px)',
      }} />
    </div>
  );
}

function WatermelonArt({ size = 120 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle at 50% 50%, var(--watermelon) 0 55%, #fff 55% 60%, var(--leaf) 60% 78%, #0a3d22 78% 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 360;
        const r = size * 0.18;
        const x = 50 + Math.cos(angle * Math.PI / 180) * 25;
        const y = 50 + Math.sin(angle * Math.PI / 180) * 25;
        return <div key={i} style={{
          position: 'absolute', left: `${x}%`, top: `${y}%`,
          width: 6, height: 10, background: '#0a0a0a',
          borderRadius: '50%', transform: 'translate(-50%,-50%) rotate(20deg)',
        }} />;
      })}
    </div>
  );
}

function StrawberryArt({ size = 120 }) {
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)',
        width: size * 0.7, height: size * 0.3,
        background: 'var(--leaf)',
        clipPath: 'polygon(50% 100%, 0 30%, 20% 0, 35% 30%, 50% 0, 65% 30%, 80% 0, 100% 30%)',
      }} />
      <div style={{
        position: 'absolute', top: size * 0.2, left: 0,
        width: size, height: size * 0.85,
        background: 'var(--watermelon)',
        clipPath: 'polygon(0 0, 100% 0, 90% 60%, 50% 100%, 10% 60%)',
        backgroundImage: 'radial-gradient(circle at 30% 40%, #fff 2px, transparent 3px), radial-gradient(circle at 60% 30%, #fff 2px, transparent 3px), radial-gradient(circle at 50% 60%, #fff 2px, transparent 3px), radial-gradient(circle at 25% 70%, #fff 2px, transparent 3px), radial-gradient(circle at 75% 65%, #fff 2px, transparent 3px), radial-gradient(circle at 45% 30%, #fff 2px, transparent 3px)',
      }} />
    </div>
  );
}

function GrapeArt({ size = 120 }) {
  const positions = [
    [50, 20], [30, 35], [70, 35], [20, 55], [50, 50], [80, 55],
    [30, 70], [70, 70], [50, 80],
  ];
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {positions.map(([x, y], i) => (
        <div key={i} style={{
          position: 'absolute', left: `${x}%`, top: `${y}%`,
          width: size * 0.3, height: size * 0.3,
          background: `radial-gradient(circle at 30% 30%, #b794d4, var(--berry))`,
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
        }} />
      ))}
      <div style={{
        position: 'absolute', top: 0, left: '52%',
        width: 4, height: size * 0.2, background: 'var(--leaf)',
      }} />
    </div>
  );
}

function MelonArt({ size = 120 }) {
  return (
    <div style={{
      width: size, height: size * 0.7,
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      background: 'linear-gradient(180deg, #FFB347 0 40%, var(--tangerine) 40% 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 8px, rgba(0,0,0,.08) 8px 9px)',
      }} />
    </div>
  );
}

function KiwiArt({ size = 120 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle at 50% 50%, #fff 0 8%, #c9e26b 8% 70%, #8b6f3a 70% 90%, #5c4626 90% 100%)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * 360;
        const x = 50 + Math.cos(angle * Math.PI / 180) * 22;
        const y = 50 + Math.sin(angle * Math.PI / 180) * 22;
        return <div key={i} style={{
          position: 'absolute', left: `${x}%`, top: `${y}%`,
          width: 4, height: 6, background: '#0a0a0a',
          borderRadius: '50%', transform: 'translate(-50%,-50%)',
        }} />;
      })}
    </div>
  );
}

const FRUIT_ART = {
  pineapple: PineappleArt,
  watermelon: WatermelonArt,
  strawberry: StrawberryArt,
  grape: GrapeArt,
  melon: MelonArt,
  kiwi: KiwiArt,
};

/* Real photos — Unsplash direct image URLs */
const FRUIT_PHOTOS = {
  pineapple: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=400&fit=crop',
  watermelon: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
  strawberry: 'https://images.unsplash.com/photo-1543528176-61b239494933?w=400&h=400&fit=crop',
  grape: 'https://images.unsplash.com/photo-1599819177626-b06d7e5d80f4?w=400&h=400&fit=crop',
  melon: 'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=400&h=400&fit=crop',
  kiwi: 'https://images.unsplash.com/photo-1610917040803-1fccf9623064?w=400&h=400&fit=crop',
};

function Fruit({ kind, size, photo = true }) {
  if (photo && FRUIT_PHOTOS[kind]) {
    return (
      <div style={{
        width: size, height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundImage: `url(${FRUIT_PHOTOS[kind]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '2px solid var(--ink)',
        boxShadow: '4px 4px 0 var(--ink)',
      }} />
    );
  }
  const Comp = FRUIT_ART[kind] || WatermelonArt;
  return <Comp size={size} />;
}

/* ---------- Sticker (mimics shop label) ---------- */
function Sticker({ children, color = 'var(--citrus)', rotate = -8 }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '6px 14px',
      background: color,
      border: '2px solid var(--ink)',
      borderRadius: '999px',
      fontFamily: 'var(--mono)',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      transform: `rotate(${rotate}deg)`,
      boxShadow: '3px 3px 0 var(--ink)',
    }}>{children}</div>
  );
}

/* ---------- Top nav (site header) ---------- */
function SiteHeader({ active = 'home' }) {
  const items = [
    { id: 'home', label: 'בית' },
    { id: 'shop', label: 'פירות קלופים' },
    { id: 'kayak', label: 'קיאקי פירות' },
    { id: 'about', label: 'הסיפור' },
  ];
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px',
      borderBottom: '2px solid var(--ink)',
      background: 'var(--paper)',
      position: 'relative', zIndex: 5,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Logo size={44} />
        <div>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 22, letterSpacing: '-0.04em' }}>פרי לי</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', opacity: 0.6, marginTop: -2 }}>DIMONA · EST. 2019</div>
        </div>
      </div>
      <nav style={{ display: 'flex', gap: 32 }}>
        {items.map(it => (
          <a key={it.id} style={{
            fontFamily: 'var(--display)', fontWeight: 700, fontSize: 16,
            color: 'var(--ink)',
            textDecoration: 'none',
            borderBottom: active === it.id ? '2px solid var(--watermelon)' : '2px solid transparent',
            paddingBottom: 4,
          }}>{it.label}</a>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button style={{
          background: 'none', border: '2px solid var(--ink)',
          padding: '10px 16px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
        }}>חיפוש</button>
        <button style={{
          background: 'var(--ink)', color: 'var(--paper)',
          border: '2px solid var(--ink)',
          padding: '10px 16px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
          display: 'flex', gap: 8, alignItems: 'center',
        }}>
          סל <span style={{ background: 'var(--citrus)', color: 'var(--ink)', padding: '0 6px', borderRadius: 999 }}>3</span>
        </button>
      </div>
    </header>
  );
}

/* Logo: a citrus slice */
function Logo({ size = 44 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: 'var(--citrus)',
      border: '2px solid var(--ink)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {[0, 60, 120, 180, 240, 300].map(rot => (
        <div key={rot} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '50%', height: 2,
          background: 'var(--ink)',
          transformOrigin: 'left center',
          transform: `rotate(${rot}deg)`,
        }} />
      ))}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 6, height: 6, background: 'var(--ink)',
        borderRadius: '50%', transform: 'translate(-50%,-50%)',
      }} />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer style={{
      background: 'var(--ink)', color: 'var(--paper)',
      padding: '50px 40px 24px', marginTop: 0,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 64, letterSpacing: '-0.05em', lineHeight: 0.85 }}>פרי לי.</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 16, marginTop: 16, opacity: 0.7, maxWidth: 320 }}>
            פירות קלופים טריים בכל בוקר, וקיאקי פירות לאירועים שלא שוכחים.
          </div>
        </div>
        <FooterCol title="חנות" items={['פירות קלופים', 'סלטי פירות', 'פירות יער', 'מבצעי השבוע']} />
        <FooterCol title="קיאקים" items={['בנה קיאק', 'דוגמאות', 'אירוע עסקי', 'חתונות']} />
        <FooterCol title="צרו קשר" items={['דימונה, רח׳ הדקל 12', '054-000-0000', 'מבזק על וואטסאפ']} />
      </div>
      <div style={{ borderTop: '1px solid #333', paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.5 }}>
        <span>© 2026 פרי לי. כל הזכויות שמורות.</span>
        <span>FRESH · LOCAL · DIMONA</span>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.5, marginBottom: 14 }}>{title}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((x, i) => <li key={i} style={{ fontSize: 14 }}>{x}</li>)}
      </ul>
    </div>
  );
}

/* ---------- Section divider ---------- */
function SectionTag({ num, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
      <span style={{ opacity: 0.5 }}>{num}</span>
      <span style={{ width: 30, height: 1, background: 'var(--ink)', display: 'inline-block' }}></span>
      <span style={{ fontWeight: 700 }}>{label}</span>
    </div>
  );
}

/* Export to window */
Object.assign(window, {
  Fruit, FRUIT_ART, FRUIT_PHOTOS, Sticker, SiteHeader, SiteFooter, Logo, SectionTag,
  PineappleArt, WatermelonArt, StrawberryArt, GrapeArt, MelonArt, KiwiArt,
});

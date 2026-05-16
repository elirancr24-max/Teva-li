/* shared.jsx — common pieces: fruits (CSS art), header, footer, sticker */
const { useState, useEffect, useMemo, useRef } = React;

/* ---------- useCompact: returns true on phone-width OR when forced ---------- */
function useCompact(force) {
  const [c, setC] = React.useState(() =>
    !!force || (typeof window !== 'undefined' && window.innerWidth < 760)
  );
  React.useEffect(() => {
    if (force) { setC(true); return; }
    const onR = () => setC(window.innerWidth < 760);
    onR();
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, [force]);
  return c;
}

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
  // Reused fallbacks for new kinds — photos are primary, CSS-art only loads if photo fails
  blueberry: GrapeArt,
  cherry: StrawberryArt,
  'green-grape': GrapeArt,
  'berry-mix': StrawberryArt,
  'mixed-salad': StrawberryArt,
  mango: MelonArt,
};

/* Curated Unsplash photos — square crop, white/off-white backgrounds, single-subject editorial */
const FRUIT_PHOTOS = {
  pineapple:    'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&q=80&fit=crop&auto=format',
  watermelon:   'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=800&q=80&fit=crop&auto=format',
  strawberry:   'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80&fit=crop&auto=format',
  grape:        'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=800&q=80&fit=crop&auto=format',
  melon:        'https://images.unsplash.com/photo-1571575173700-afb9492e6a50?w=800&q=80&fit=crop&auto=format',
  kiwi:         'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=800&q=80&fit=crop&auto=format',
  // New unique photos for products that previously reused another kind
  'mixed-salad':'https://images.unsplash.com/photo-1490474504059-bf2db5ab2348?w=800&q=80&fit=crop&auto=format',
  blueberry:    'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=80&fit=crop&auto=format',
  cherry:       'https://images.unsplash.com/photo-1528821128474-27f963b062bf?w=800&q=80&fit=crop&auto=format',
  'green-grape':'https://images.unsplash.com/photo-1599819177626-b62d1c1adff4?w=800&q=80&fit=crop&auto=format',
  'berry-mix':  'https://images.unsplash.com/photo-1546173159-315724a31696?w=800&q=80&fit=crop&auto=format',
  mango:        'https://images.unsplash.com/photo-1605027990121-cbae9e0642db?w=800&q=80&fit=crop&auto=format',
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
function SiteHeader({ active = 'home', compact }) {
  const m = useCompact(compact);
  const items = [
    { id: 'home', label: 'בית' },
    { id: 'shop', label: 'פירות קלופים' },
    { id: 'kayak', label: 'קיאקי פירות' },
    { id: 'about', label: 'הסיפור' },
  ];
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: m ? '14px 16px' : '20px 40px',
      borderBottom: '2px solid var(--ink)',
      background: 'var(--paper)',
      position: 'relative', zIndex: 5,
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: m ? 10 : 14 }}>
        <Logo size={m ? 34 : 44} />
        <div>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 18 : 22, letterSpacing: '-0.04em' }}>פרי לי</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 8 : 10, letterSpacing: '0.18em', opacity: 0.6, marginTop: -2 }}>{m ? 'דימונה' : 'DIMONA · EST. 2019'}</div>
        </div>
      </div>
      {!m && (
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
      )}
      <div style={{ display: 'flex', gap: m ? 6 : 12, alignItems: 'center' }}>
        {m ? (
          <button aria-label="תפריט" style={{
            background: 'var(--paper)', border: '2px solid var(--ink)',
            padding: '8px 10px',
            display: 'flex', flexDirection: 'column', gap: 3,
            cursor: 'pointer',
          }}>
            <span style={{ width: 18, height: 2, background: 'var(--ink)', display: 'block' }} />
            <span style={{ width: 18, height: 2, background: 'var(--ink)', display: 'block' }} />
            <span style={{ width: 18, height: 2, background: 'var(--ink)', display: 'block' }} />
          </button>
        ) : (
          <button style={{
            background: 'none', border: '2px solid var(--ink)',
            padding: '10px 16px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
          }}>חיפוש</button>
        )}
        <button style={{
          background: 'var(--ink)', color: 'var(--paper)',
          border: '2px solid var(--ink)',
          padding: m ? '8px 10px' : '10px 16px',
          fontFamily: 'var(--mono)', fontSize: m ? 11 : 12, fontWeight: 700,
          display: 'flex', gap: 6, alignItems: 'center',
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

function SiteFooter({ compact }) {
  const m = useCompact(compact);
  return (
    <footer style={{
      background: 'var(--ink)', color: 'var(--paper)',
      padding: m ? '32px 16px 18px' : '50px 40px 24px', marginTop: 0,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '2fr 1fr 1fr 1fr',
        gap: m ? 28 : 40, marginBottom: m ? 28 : 40,
      }}>
        <div>
          <div className="display" style={{
            fontSize: m ? 56 : 64,
            letterSpacing: '-0.05em', lineHeight: 0.85,
          }}>פרי לי.</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: m ? 14 : 16, marginTop: 14, opacity: 0.7, maxWidth: 320 }}>
            פירות קלופים טריים בכל בוקר, וקיאקי פירות לאירועים שלא שוכחים.
          </div>
        </div>
        <FooterCol title="חנות" items={['פירות קלופים', 'סלטי פירות', 'פירות יער', 'מבצעי השבוע']} />
        <FooterCol title="קיאקים" items={['בנה קיאק', 'דוגמאות', 'אירוע עסקי', 'חתונות']} />
        <FooterCol title="צרו קשר" items={['דימונה, רח׳ הדקל 12', '054-000-0000', 'מבזק על וואטסאפ']} />
      </div>
      <div style={{
        borderTop: '1px solid #333', paddingTop: 16,
        display: 'flex', flexDirection: m ? 'column' : 'row',
        gap: m ? 6 : 0, justifyContent: 'space-between',
        fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.5,
      }}>
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

/* ---------- MobileBottomNav — frosted iOS-style tab bar with center FAB ---------- */
function MobileBottomNav({ active = 'home', accent = 'var(--watermelon)', cartCount = 3 }) {
  const items = [
    { id: 'home',    label: 'בית',  icon: <NavIcon kind="home" /> },
    { id: 'shop',    label: 'חנות', icon: <NavIcon kind="shop" /> },
    { id: 'kayak',   label: 'קיאק', center: true, icon: '+' },
    { id: 'cart',    label: 'סל',   icon: <NavIcon kind="cart" />, badge: cartCount },
    { id: 'profile', label: 'אני',  icon: <NavIcon kind="user" /> },
  ];
  return (
    <div style={{
      position: 'sticky', bottom: 0, zIndex: 50,
      background: 'rgba(253,251,245,0.78)',
      backdropFilter: 'blur(22px) saturate(180%)',
      WebkitBackdropFilter: 'blur(22px) saturate(180%)',
      borderTop: '1.5px solid var(--ink)',
      padding: '4px 4px 6px',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 4px) + 4px)',
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 0,
    }}>
      {items.map(it => (
        it.center ? (
          <button key={it.id} style={{
            background: accent, color: 'var(--ink)',
            border: '2px solid var(--ink)',
            width: 52, height: 52, borderRadius: '50%',
            margin: '-22px auto 0',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--display)', fontWeight: 900, fontSize: 30,
            cursor: 'pointer',
            boxShadow: '0 6px 14px rgba(0,0,0,0.25), 3px 3px 0 var(--ink)',
            position: 'relative',
            transition: 'transform 200ms var(--easing)',
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          aria-label={it.label}
          >
            <span style={{ lineHeight: 1, marginTop: -3 }}>{it.icon}</span>
          </button>
        ) : (
          <button key={it.id} style={{
            background: 'transparent', border: 'none',
            padding: '6px 4px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            fontFamily: 'var(--display)', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.04em',
            color: active === it.id ? accent : 'var(--ink)',
            cursor: 'pointer',
            position: 'relative',
            opacity: active === it.id ? 1 : 0.7,
            transition: 'opacity 200ms',
          }} aria-label={it.label}>
            {active === it.id && (
              <div style={{
                position: 'absolute', top: 0, left: '25%', right: '25%', height: 2.5,
                background: accent,
              }} />
            )}
            <span style={{ position: 'relative', display: 'inline-flex', width: 22, height: 22, alignItems: 'center', justifyContent: 'center' }}>
              {it.icon}
              {it.badge ? (
                <span style={{
                  position: 'absolute', top: -5, right: -8,
                  minWidth: 16, height: 16, padding: '0 4px',
                  borderRadius: 999,
                  background: accent, color: 'var(--ink)',
                  border: '1.5px solid var(--ink)',
                  fontFamily: 'var(--mono)',
                  fontSize: 9, fontWeight: 700,
                  display: 'grid', placeItems: 'center',
                  lineHeight: 1,
                }}>{it.badge}</span>
              ) : null}
            </span>
            <span>{it.label}</span>
          </button>
        )
      ))}
    </div>
  );
}

/* Tiny SVG icons sized 22px for nav */
function NavIcon({ kind }) {
  const stroke = 'currentColor';
  const sw = 1.6;
  if (kind === 'home') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H10v7H4a1 1 0 0 1-1-1V11z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
    </svg>
  );
  if (kind === 'shop') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 7h18l-1.5 12.5a1 1 0 0 1-1 .9H5.5a1 1 0 0 1-1-.9L3 7z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round"/>
      <path d="M8 7V5a4 4 0 1 1 8 0v2" stroke={stroke} strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  );
  if (kind === 'cart') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 4h2.5l2.5 12h11l2-8H7" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx="9" cy="20" r="1.5" fill={stroke}/>
      <circle cx="17" cy="20" r="1.5" fill={stroke}/>
    </svg>
  );
  if (kind === 'user') return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={stroke} strokeWidth={sw}/>
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke={stroke} strokeWidth={sw} strokeLinecap="round"/>
    </svg>
  );
  return null;
}

/* ---------- Mobile sticky buy bar (used on ProductPage when compact) ---------- */
function MobileBuyBar({ price, accent, weight, qty = 1, onAdd }) {
  return (
    <div style={{
      position: 'sticky', bottom: 70, zIndex: 45,
      margin: '0 -16px',
      padding: '10px 14px',
      background: 'rgba(10,10,10,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      color: 'var(--paper)',
      borderTop: '1.5px solid var(--ink)',
      borderBottom: '1.5px solid var(--ink)',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, opacity: 0.6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>סך הכל</div>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
          ₪{(price * qty).toFixed(2)}
          <span style={{ fontFamily: 'var(--mono)', fontWeight: 400, fontSize: 11, opacity: 0.55, marginInlineStart: 6 }}>/ {weight}</span>
        </div>
      </div>
      <button onClick={onAdd} style={{
        marginInlineStart: 'auto',
        background: accent, color: 'var(--ink)',
        border: '2px solid var(--paper)',
        padding: '12px 20px',
        fontFamily: 'var(--display)', fontWeight: 900, fontSize: 15, letterSpacing: '-0.01em',
        cursor: 'pointer',
        boxShadow: '3px 3px 0 var(--paper)',
      }}>הוסף לסל →</button>
    </div>
  );
}

/* ---------- Search pill (mobile only) ---------- */
function MobileSearchPill({ accent }) {
  return (
    <div style={{
      margin: '0 16px 18px',
      padding: '12px 16px',
      background: 'var(--paper)',
      border: '1.5px solid var(--ink)',
      borderRadius: 999,
      boxShadow: '3px 3px 0 var(--ink)',
      display: 'flex', alignItems: 'center', gap: 10,
      cursor: 'text',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 13, opacity: 0.55, letterSpacing: '0.04em' }}>
        חפש פרי, סלט, קיאק...
      </span>
      <span style={{
        marginInlineStart: 'auto',
        padding: '3px 8px',
        background: accent, color: 'var(--ink)',
        fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: 999,
      }}>חדש</span>
    </div>
  );
}

/* Export to window */
Object.assign(window, {
  Fruit, FRUIT_ART, FRUIT_PHOTOS, Sticker, SiteHeader, SiteFooter, Logo, SectionTag, useCompact, MobileBottomNav, MobileBuyBar, MobileSearchPill, NavIcon,
  PineappleArt, WatermelonArt, StrawberryArt, GrapeArt, MelonArt, KiwiArt,
});

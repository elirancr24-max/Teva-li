/* mobile.jsx — מסך מובייל באייפון */

function MobileScreen({ accent = 'var(--watermelon)' }) {
  return (
    <div style={{ height: '100%', overflow: 'auto', background: 'var(--paper)', fontFamily: 'var(--body)', direction: 'rtl' }}>
      {/* App header */}
      <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo size={28} />
          <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 18 }}>פרי לי</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--ink)', color: 'var(--paper)', padding: '6px 10px', fontFamily: 'var(--mono)', fontSize: 11 }}>
          סל <span style={{ background: 'var(--citrus)', color: 'var(--ink)', padding: '0 5px', borderRadius: 999, fontWeight: 700 }}>3</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '20px', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', opacity: 0.5 }}>טרי הבוקר · 06.05</div>
        <h1 className="display" style={{ fontSize: 56, margin: '10px 0 0', lineHeight: 0.85 }}>
          פירות
          <br />
          ש<span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: accent }}>נחתכו</span>
          <br />
          עכשיו.
        </h1>
        <button className="btn primary" style={{ background: accent, marginTop: 20, width: '100%', padding: '14px' }}>הזמן עכשיו →</button>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1.5px solid var(--ink)' }}>
        <div style={{ padding: 20, borderLeft: '1px solid var(--ink)', textAlign: 'center' }}>
          <PineappleArt size={50} />
          <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 14, marginTop: 8 }}>קלופים</div>
        </div>
        <div style={{ padding: 20, textAlign: 'center', background: 'var(--ink)', color: 'var(--paper)' }}>
          <div style={{ width: 50, height: 28, background: accent, borderRadius: '50%/100%', margin: '0 auto', position: 'relative', top: 6 }} />
          <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 14, marginTop: 16 }}>קיאקים</div>
        </div>
      </div>

      {/* Categories scroll */}
      <div style={{ padding: '14px 20px', borderBottom: '1.5px solid var(--ink)', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {['הכל', 'קלופים', 'סלטים', 'יער'].map((c, i) => (
          <div key={i} style={{
            padding: '6px 12px',
            background: i === 0 ? 'var(--ink)' : 'transparent',
            color: i === 0 ? 'var(--paper)' : 'var(--ink)',
            border: '1.5px solid var(--ink)',
            fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
            whiteSpace: 'nowrap',
          }}>{c}</div>
        ))}
      </div>

      {/* Products */}
      <div style={{ padding: 20 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 12 }}>הכי נמכרים</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {ALL_PRODUCTS.slice(0, 4).map(p => (
            <div key={p.id} style={{ border: '1.5px solid var(--ink)', padding: 12 }}>
              <div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fruit kind={p.kind} size={70} />
              </div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 14, marginTop: 10 }}>{p.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 16 }}>₪{p.price}</div>
                <button style={{ background: 'var(--ink)', color: 'var(--paper)', border: 'none', width: 24, height: 24, fontFamily: 'var(--display)', fontWeight: 800 }}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kayak banner */}
      <div style={{ margin: 20, padding: 20, background: 'var(--ink)', color: 'var(--paper)', borderTop: '2px solid var(--ink)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', opacity: 0.6 }}>חדש · בלעדי</div>
        <h3 className="display" style={{ fontSize: 32, margin: '8px 0' }}>בנה <span style={{ color: accent }}>קיאק.</span></h3>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 13, opacity: 0.8, marginBottom: 14 }}>מגש פירות ענק לאירוע. בחר גודל, פירות, תוספות.</div>
        <button style={{ width: '100%', padding: 12, background: accent, color: 'var(--ink)', border: 'none', fontFamily: 'var(--display)', fontWeight: 800, fontSize: 14 }}>פתח קונפיגורטור →</button>
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'sticky', bottom: 0, background: 'var(--paper)', borderTop: '1.5px solid var(--ink)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { l: 'בית', a: true }, { l: 'חנות' }, { l: 'קיאק' }, { l: 'אני' }
        ].map((it, i) => (
          <div key={i} style={{
            padding: '12px 0', textAlign: 'center',
            background: it.a ? 'var(--ink)' : 'transparent',
            color: it.a ? 'var(--paper)' : 'var(--ink)',
            fontFamily: 'var(--display)', fontWeight: 700, fontSize: 13,
            borderLeft: i > 0 ? '1px solid var(--ink)' : 'none',
          }}>{it.l}</div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { MobileScreen });

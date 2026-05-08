/* home.jsx — דף הבית המשודרג v3 (responsive) */

const KAYAK_IMG = 'assets/kayak-real.jpg';

function HomePage({ heroVariant = 'mega', accent = 'var(--watermelon)', compact }) {
  const m = useCompact(compact);
  return (
    <div style={{ background: 'var(--paper)' }}>
      <SiteHeader active="home" compact={compact} />
      {m && <MobileGreeting accent={accent} />}
      {m && <MobileSearchPill accent={accent} />}
      {heroVariant === 'mega' && <HeroMega accent={accent} compact={compact} />}
      {heroVariant === 'split' && <HeroSplit accent={accent} compact={compact} />}
      {heroVariant === 'editorial' && <HeroEditorial accent={accent} compact={compact} />}
      <TickerStrip compact={compact} />
      <ValuePropsBar accent={accent} compact={compact} />
      <BestSellersV2 accent={accent} compact={compact} />
      <KayakHero accent={accent} compact={compact} />
      <ProcessSection accent={accent} compact={compact} />
      <FruitMosaic accent={accent} compact={compact} />
      <Testimonials accent={accent} compact={compact} />
      <CTASection accent={accent} compact={compact} />
      <SiteFooter compact={compact} />
      {m && <MobileBottomNav active="home" accent={accent} />}
    </div>
  );
}

function MobileGreeting({ accent }) {
  const hour = new Date().getHours();
  const greet = hour < 11 ? 'בוקר טוב ☀' : hour < 17 ? 'צהריים טובים' : hour < 21 ? 'אחר הצהריים' : 'ערב טוב 🌙';
  return (
    <div style={{
      padding: '14px 16px 10px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: '1px dashed rgba(0,0,0,0.15)',
    }}>
      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.55 }}>היום · 06.05</div>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', marginTop: 2 }}>{greet}</div>
      </div>
      <div style={{
        padding: '6px 10px',
        background: accent, color: 'var(--ink)',
        border: '1.5px solid var(--ink)',
        borderRadius: 999,
        fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '2px 2px 0 var(--ink)',
      }}>
        <span className="pulse-dot" style={{ background: 'var(--ink)' }} />
        טרי 06:00
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 1 — MEGA
   ═══════════════════════════════════════════════════ */
function HeroMega({ accent, compact }) {
  const m = useCompact(compact);
  return (
    <section style={{
      position: 'relative',
      borderBottom: '2px solid var(--ink)',
      background: 'var(--paper)',
      overflow: 'hidden',
    }}>
      <div className="watermark" style={{
        top: m ? 40 : 80, right: -30,
        fontSize: m ? '180px' : 'clamp(280px, 38vw, 560px)',
        color: 'var(--ink)',
        opacity: 0.045,
      }}>2026</div>

      {/* top meta strip */}
      <div style={{
        position: 'relative',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: m ? '10px 16px' : '16px 40px',
        borderBottom: '1px solid var(--ink)',
        fontFamily: 'var(--mono)', fontSize: m ? 9 : 11, letterSpacing: '0.16em', textTransform: 'uppercase',
        zIndex: 2,
        gap: 10, flexWrap: 'wrap',
      }}>
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

      {/* main grid */}
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1.4fr 1fr',
        minHeight: m ? 'auto' : 760,
        zIndex: 1,
      }}>
        {/* LEFT — type */}
        <div style={{
          padding: m ? '36px 20px 32px' : '70px 56px 50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: m ? 'none' : '1px solid var(--ink)',
          position: 'relative',
        }}>
          <div>
            <div className="rise">
              <SectionTag num="01" label={m ? 'פירות קלופים' : 'פירות קלופים · קיאקי אירועים'} />
            </div>

            <h1 className="display rise-d1" style={{
              position: 'relative',
              fontSize: m ? 'clamp(72px, 22vw, 120px)' : 'clamp(110px, 14vw, 240px)',
              margin: m ? '20px 0 0' : '36px 0 0',
              lineHeight: 0.82,
              letterSpacing: '-0.06em',
            }}>
              <span aria-hidden style={{
                position: 'absolute',
                top: 4, right: 4,
                color: 'transparent',
                WebkitTextStroke: '1.5px rgba(10,10,10,0.18)',
                pointerEvents: 'none',
                whiteSpace: 'pre',
              }}>פרי{'\n'}שנחתך{'\n'}עכשיו.</span>
              פרי
              <br />
              ש<span style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
                color: accent,
                position: 'relative',
                display: 'inline-block',
              }}>נחתך
                <span className="draw-line" style={{
                  position: 'absolute', bottom: '0.06em', right: 0, left: 0,
                  background: accent, opacity: 0.35,
                }} />
              </span>
              <br />
              עכשיו<span style={{ color: accent }}>.</span>
            </h1>
          </div>

          <div style={{ marginTop: m ? 24 : 44 }} className="rise-d2">
            <div style={{ width: m ? 48 : 64, height: 4, background: accent, marginBottom: m ? 16 : 22 }} />
            <p style={{
              fontFamily: 'var(--serif)', fontSize: m ? 17 : 22, lineHeight: 1.5, maxWidth: 540,
              margin: 0, marginBottom: m ? 22 : 32,
            }}>
              ב-3 בלילה אנחנו בשוק העיר. ב-7 בבוקר זה כבר על המדף —
              קלוף, חתוך, ארוז. <em style={{ color: accent, fontWeight: 700 }}>מדימונה, ביד, באותו יום.</em>
            </p>
            <div style={{ display: 'flex', gap: m ? 10 : 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn primary" style={{ background: accent, ...(m ? { padding: '14px 22px', fontSize: 15, flex: '1 0 auto' } : {}) }}>הזמן עכשיו →</button>
              <button className="btn outline" style={m ? { padding: '14px 22px', fontSize: 15, flex: '1 0 auto' } : {}}>בנה קיאק</button>
              {!m && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                  opacity: 0.65, marginInlineStart: 6,
                }}>
                  <span style={{ width: 24, height: 1, background: 'var(--ink)' }} />
                  ★★★★★ 4.9 · 280 ביקורות
                </div>
              )}
            </div>
            {m && (
              <div style={{
                marginTop: 14,
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                opacity: 0.65, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                ★★★★★ 4.9 · 280 ביקורות
              </div>
            )}
          </div>

          {/* float stickers */}
          {!m && (
            <>
              <div style={{ position: 'absolute', top: 90, left: 50 }}>
                <div className="float-tilt"><Sticker color={accent} rotate={-8}>טרי 100%</Sticker></div>
              </div>
              <div style={{ position: 'absolute', bottom: 200, left: 30 }}>
                <div style={{
                  transform: 'rotate(8deg)',
                  padding: '10px 14px',
                  background: 'var(--citrus)',
                  border: '2px solid var(--ink)',
                  boxShadow: '4px 4px 0 var(--ink)',
                  fontFamily: 'var(--mono)',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>★ דימונה</div>
              </div>
            </>
          )}
          {m && (
            <div style={{ position: 'absolute', top: 24, left: 16, zIndex: 3 }}>
              <div className="float-tilt"><Sticker color={accent} rotate={-8}>טרי</Sticker></div>
            </div>
          )}
        </div>

        {/* RIGHT — kayak photo block */}
        <div style={{
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
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(253,251,245,0.08) 1px, transparent 1.5px)',
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
          }} />

          <div style={{
            position: 'relative', zIndex: 2,
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, letterSpacing: '0.18em', opacity: 0.7,
          }}>
            <span>FIG. 01 — KAYAK XL</span>
            <span>{m ? '50 אורחים' : '50 אורחים · 90cm'}</span>
          </div>

          <div style={{
            position: 'relative',
            margin: m ? '16px 0' : '30px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: m ? 220 : 360,
          }}>
            <div className="halo-accent" style={{ '--halo-color': accent }} />
            <div className="float-y" style={{
              position: 'relative', zIndex: 2,
              width: '100%', maxWidth: 540,
            }}>
              <img
                src={KAYAK_IMG}
                alt="קיאק פירות"
                style={{
                  width: '100%',
                  filter: m
                    ? 'drop-shadow(6px 8px 0 rgba(0,0,0,0.55)) drop-shadow(0 14px 18px rgba(0,0,0,0.4))'
                    : 'drop-shadow(10px 14px 0 rgba(0,0,0,0.55)) drop-shadow(0 24px 30px rgba(0,0,0,0.4))',
                }}
              />
            </div>

            <div style={{
              position: 'absolute', top: 8, right: 12, zIndex: 3,
              transform: 'rotate(8deg)',
            }}>
              <div style={{
                padding: m ? '6px 10px' : '8px 14px',
                background: accent, color: 'var(--ink)',
                border: '2px solid var(--ink)',
                boxShadow: '4px 4px 0 var(--paper)',
                fontFamily: 'var(--mono)', fontSize: m ? 10 : 11, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>{m ? 'XL' : 'חדש · XL'}</div>
            </div>

            <div style={{
              position: 'absolute', bottom: -6, left: '5%', right: '5%',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, opacity: 0.65,
              letterSpacing: '0.18em', zIndex: 2,
            }}>
              <span>↤ 90cm ↦</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="pulse-dot" style={{ background: accent }} /> בהזמנה
              </span>
            </div>
          </div>

          <div style={{
            position: 'relative', zIndex: 2,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: m ? 12 : 18,
            paddingTop: m ? 18 : 26, borderTop: '1px solid rgba(253,251,245,.2)',
          }}>
            <FeatureItem label="גודל" value="S · M · L · XL" m={m} />
            <FeatureItem label="פירות" value="עד 18 זנים" m={m} />
            <FeatureItem label="הכנה" value="ביום האירוע" m={m} />
            <FeatureItem label="מ-" value="₪480" accent={accent} m={m} />
          </div>
        </div>
      </div>

      {/* bottom stats bar */}
      <div style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid var(--ink)',
        display: 'grid',
        gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        background: 'var(--paper)',
      }}>
        {[
          ['450+', 'אירועים', '🎉'],
          ['18', 'זני פירות', '✻'],
          ['04:30', 'ניקיון יומי', '◐'],
          ['8 שנים', 'בדימונה', '◆'],
        ].map(([n, l, ico], i) => (
          <div key={i} style={{
            padding: m ? '16px 14px' : '26px 30px',
            borderRight: m ? ((i % 2 === 0) ? '1px solid var(--ink)' : 'none') : (i < 3 ? '1px solid var(--ink)' : 'none'),
            borderBottom: m && i < 2 ? '1px solid var(--ink)' : 'none',
            display: 'flex', alignItems: 'baseline', gap: m ? 10 : 16,
            transition: 'background 200ms',
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: m ? 13 : 16, color: accent }}>{ico}</span>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 28 : 46, lineHeight: 1, letterSpacing: '-0.04em' }}>{n}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 9 : 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureItem({ label, value, accent, m }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 8 : 9, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>{label}</div>
      <div style={{
        fontFamily: 'var(--display)', fontWeight: 800, fontSize: m ? 14 : 18, marginTop: 4,
        color: accent || 'inherit',
      }}>{value}</div>
    </div>
  );
}

function HeroSplit({ accent, compact }) {
  const m = useCompact(compact);
  return (
    <section style={{
      display: 'grid', gridTemplateColumns: m ? '1fr' : '1.1fr 1fr',
      borderBottom: '2px solid var(--ink)',
      minHeight: m ? 'auto' : 720,
    }}>
      <div style={{ padding: m ? '32px 20px' : '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: m ? 24 : 0 }}>
        <SectionTag num="01" label="חנות · אירועים · דימונה" />
        <div>
          <h1 className="display" style={{ fontSize: m ? 'clamp(60px, 18vw, 100px)' : 'clamp(80px, 11vw, 180px)', margin: 0, lineHeight: 0.85 }}>
            פרי <span style={{ color: accent }}>לי.</span>
            <br />
            פרי <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>לכם.</span>
          </h1>
          <p style={{ fontFamily: 'var(--serif)', fontSize: m ? 17 : 22, lineHeight: 1.45, maxWidth: 520, marginTop: m ? 18 : 32 }}>
            פירות קלופים שנחתכו בבוקר. קיאקי פירות לאירועים שמחים.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn primary" style={{ background: accent }}>קנה פירות</button>
          <button className="btn outline">בנה קיאק</button>
        </div>
      </div>
      <div style={{
        background: accent, position: 'relative',
        borderRight: m ? 'none' : '2px solid var(--ink)',
        borderTop: m ? '2px solid var(--ink)' : 'none',
        overflow: 'hidden', minHeight: m ? 320 : 'auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src={KAYAK_IMG} alt="קיאק" style={{ width: '90%', filter: 'drop-shadow(8px 12px 0 rgba(0,0,0,0.35))' }} />
        <div style={{ position: 'absolute', top: m ? 20 : 40, right: m ? 20 : 40 }}>
          <div className="float-tilt"><Sticker color="var(--paper)" rotate={-10}>חדש · 2026</Sticker></div>
        </div>
      </div>
    </section>
  );
}

function HeroEditorial({ accent, compact }) {
  const m = useCompact(compact);
  return (
    <section style={{ padding: m ? '24px 16px 36px' : '40px 40px 60px', borderBottom: '2px solid var(--ink)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: m ? 9 : 11, letterSpacing: '0.18em', textTransform: 'uppercase', flexWrap: 'wrap', gap: 8 }}>
        <span>{m ? 'אביב 2026' : 'גליון 12 · אביב 2026'}</span>
        <span>פרי לי ™</span>
        {!m && <span>דימונה</span>}
      </div>
      <div style={{ marginTop: m ? 28 : 50, position: 'relative' }}>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: m ? 20 : 28, marginBottom: 12 }}>החדש מדימונה</div>
        <h1 className="display" style={{
          fontSize: m ? 'clamp(64px, 20vw, 110px)' : 'clamp(100px, 14vw, 240px)',
          lineHeight: 0.85, margin: 0,
        }}>
          קיאקי
          <br />
          <span style={{ color: accent }}>פירות.</span>
        </h1>
        <img src={KAYAK_IMG} alt="קיאק" style={{ width: m ? '95%' : '70%', maxWidth: 800, margin: m ? '20px auto 0' : '32px auto 0', display: 'block', filter: 'drop-shadow(10px 14px 0 rgba(0,0,0,0.3))' }} />
        <div style={{ fontFamily: 'var(--serif)', fontSize: m ? 17 : 22, marginTop: m ? 18 : 24, maxWidth: 600, marginInline: 'auto' }}>
          מגש בצורת קיאק עמוס פירות חתוכים. לחתונה, ליום הולדת, לכל אירוע.
        </div>
        <button className="btn primary" style={{ background: accent, marginTop: m ? 22 : 32 }}>בנה את הקיאק שלך →</button>
      </div>
    </section>
  );
}

function TickerStrip({ compact }) {
  const m = useCompact(compact);
  const items = ['אננס מתוק', 'מלון אמבוסיה', 'אבטיח אדום', 'תות שדה', 'אוכמניות', 'דובדבנים', 'ענבי קונקורד', 'קיווי זהב', 'מנגו ישראלי', 'פפאיה', 'ליצ׳י', 'משמש'];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="marquee-mask" style={{
      background: 'var(--ink)', color: 'var(--paper)',
      padding: m ? '14px 0' : '20px 0', overflow: 'hidden',
      borderBottom: '2px solid var(--ink)',
      position: 'relative',
    }}>
      <div className="marquee" style={{ gap: m ? 28 : 40, display: 'flex' }}>
        {repeated.map((x, i) => (
          <span key={i} style={{
            fontFamily: 'var(--display)', fontWeight: 800, fontSize: m ? 20 : 30, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: m ? 28 : 40, whiteSpace: 'nowrap',
          }}>
            {x} <span style={{ color: 'var(--watermelon)', fontSize: m ? 16 : 22 }}>✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ValuePropsBar({ accent, compact }) {
  const m = useCompact(compact);
  const items = [
    { icon: '✻', t: 'נחתך באותו יום', d: 'אין מלאי לא טרי' },
    { icon: '↻', t: 'משלוח עד 14:00', d: 'הזמנה עד 11:00' },
    { icon: '◆', t: 'קיאקים בהתאמה', d: 'גודל, פירות, תוספות' },
    { icon: '✦', t: 'דרום הארץ', d: 'דימונה, ערד, באר שבע' },
  ];
  return (
    <section style={{
      padding: m ? '20px 16px' : '36px 40px',
      borderBottom: '2px solid var(--ink)',
      display: 'grid',
      gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)',
      gap: m ? 16 : 0,
      background: 'var(--paper)',
    }}>
      {items.map((f, i) => (
        <div key={i} style={{
          padding: m ? 0 : '4px 24px',
          borderRight: m ? 'none' : (i < 3 ? '1px solid rgba(0,0,0,.15)' : 'none'),
          display: 'flex', alignItems: 'center', gap: m ? 12 : 18,
        }}>
          <div style={{
            width: m ? 38 : 52, height: m ? 38 : 52,
            display: 'grid', placeItems: 'center',
            background: i === 0 ? accent : 'var(--paper-2)',
            border: '1.5px solid var(--ink)',
            boxShadow: m ? '2px 2px 0 var(--ink)' : '3px 3px 0 var(--ink)',
            fontSize: m ? 18 : 24, lineHeight: 1, flexShrink: 0,
          }}>{f.icon}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: m ? 13 : 18, lineHeight: 1.15 }}>{f.t}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 9 : 11, opacity: 0.6, marginTop: 4, letterSpacing: '0.04em' }}>{f.d}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

function BestSellersV2({ accent, compact }) {
  const m = useCompact(compact);
  const [active, setActive] = React.useState('all');
  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'tropical', label: 'טרופי' },
    { id: 'berries', label: 'פירות יער' },
    { id: 'melons', label: 'מלונים' },
    { id: 'citrus', label: 'הדרים' },
  ];
  const products = [
    { name: 'אננס קלוף', kind: 'pineapple', price: 24.90, weight: '500ג׳', cat: 'tropical', tag: 'הכי נמכר' },
    { name: 'אבטיח חתוך', kind: 'watermelon', price: 19.90, weight: '600ג׳', cat: 'melons' },
    { name: 'תות שדה', kind: 'strawberry', price: 29.90, weight: '300ג׳', cat: 'berries', tag: 'חדש' },
    { name: 'ענבי קונקורד', kind: 'grape', price: 26.90, weight: '400ג׳', cat: 'berries' },
    { name: 'מלון אמבוסיה', kind: 'melon', price: 22.90, weight: '500ג׳', cat: 'melons' },
    { name: 'קיווי זהב', kind: 'kiwi', price: 27.90, weight: '350ג׳', cat: 'tropical' },
  ];
  const filtered = active === 'all' ? products : products.filter(p => p.cat === active);

  return (
    <section style={{
      padding: m ? '50px 16px' : '100px 40px',
      borderBottom: '2px solid var(--ink)',
      position: 'relative',
      background: 'var(--paper)',
      overflow: 'hidden',
    }}>
      <div className="watermark" style={{
        bottom: -40, left: -20,
        fontSize: m ? '160px' : 'clamp(180px, 22vw, 360px)',
        color: 'var(--ink)',
      }}>SHOP</div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'space-between', alignItems: m ? 'flex-start' : 'flex-end',
        marginBottom: m ? 24 : 44, flexDirection: m ? 'column' : 'row', gap: m ? 12 : 24,
      }}>
        <div>
          <SectionTag num="02" label="קטלוג · הכי נמכרים" />
          <h2 className="display" style={{
            fontSize: m ? 'clamp(54px, 14vw, 80px)' : 'clamp(70px, 9vw, 130px)',
            margin: m ? '12px 0 0' : '18px 0 0', lineHeight: 0.88,
          }}>
            הקלאסיקות<span style={{ color: accent }}>.</span>
          </h2>
          <div style={{ fontFamily: 'var(--serif)', fontSize: m ? 16 : 20, fontStyle: 'italic', opacity: 0.7, marginTop: 8 }}>
            ששת הפירות שהכי קונים אצלנו השבוע.
          </div>
        </div>
        {!m && (
          <a style={{
            fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: 4,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            כל הקטלוג
            <span style={{
              display: 'inline-grid', placeItems: 'center',
              width: 28, height: 28, background: 'var(--ink)', color: 'var(--paper)',
              borderRadius: '50%',
            }}>↘</span>
          </a>
        )}
      </div>

      <div className={m ? 'snap-x' : ''} style={{
        position: 'relative', zIndex: 1,
        display: 'flex', gap: m ? 6 : 10, flexWrap: m ? 'nowrap' : 'wrap',
        marginBottom: m ? 22 : 32,
        overflowX: m ? 'auto' : 'visible',
        paddingBottom: m ? 4 : 0,
      }}>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              padding: m ? '8px 14px' : '10px 18px',
              background: active === c.id ? 'var(--ink)' : 'var(--paper)',
              color: active === c.id ? 'var(--paper)' : 'var(--ink)',
              fontFamily: 'var(--display)', fontWeight: 700, fontSize: m ? 13 : 15,
              borderRadius: 999,
              cursor: 'pointer',
              border: '1.5px solid var(--ink)',
              boxShadow: active === c.id ? '4px 4px 0 var(--ink)' : '3px 3px 0 var(--ink)',
              transition: 'all 200ms var(--easing)',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {c.label}
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 10, marginInlineStart: 6,
              padding: '2px 6px',
              background: active === c.id ? 'rgba(253,251,245,0.18)' : 'var(--paper-2)',
              borderRadius: 999,
            }}>
              {c.id === 'all' ? products.length : products.filter(p => p.cat === c.id).length}
            </span>
          </button>
        ))}
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
        gap: m ? 14 : 20,
      }}>
        {filtered.map((p) => (
          <ProductCard key={p.name} product={p} accent={accent} m={m} />
        ))}
      </div>

      {m && (
        <a style={{
          display: 'block', textAlign: 'center', marginTop: 24,
          fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: 4,
        }}>כל הקטלוג ↘</a>
      )}
    </section>
  );
}

function ProductCard({ product, accent, m }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: m ? '20px 18px 16px' : '28px 26px 22px',
        border: '1.5px solid var(--ink)',
        position: 'relative',
        background: hover ? 'var(--paper-2)' : 'var(--paper)',
        cursor: 'pointer',
        transition: 'all 240ms var(--easing)',
        transform: hover ? 'translate(-4px, -4px)' : 'translate(0, 0)',
        boxShadow: hover ? '8px 8px 0 var(--ink)' : '0 0 0 var(--ink)',
      }}
    >
      {product.tag && (
        <div style={{ position: 'absolute', top: m ? 10 : 14, right: m ? 10 : 14, zIndex: 2 }}>
          <Sticker color={product.tag === 'חדש' ? 'var(--leaf)' : 'var(--citrus)'} rotate={-6}>{product.tag}</Sticker>
        </div>
      )}

      <div style={{
        height: m ? 170 : 240,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          width: m ? 160 : 220, height: m ? 160 : 220,
          background: `radial-gradient(circle, ${accent} 0%, transparent 65%)`,
          opacity: hover ? 0.32 : 0.18,
          filter: 'blur(20px)',
          transition: 'opacity 240ms',
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          transition: 'transform 320ms var(--easing)',
          transform: hover ? 'scale(1.06) rotate(-2deg)' : 'scale(1)',
        }}>
          <Fruit kind={product.kind} size={m ? 150 : 210} />
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginTop: m ? 14 : 20, paddingTop: m ? 14 : 20, borderTop: '1px dashed rgba(0,0,0,0.18)',
      }}>
        <div className="display" style={{ fontSize: m ? 22 : 28, lineHeight: 1, letterSpacing: '-0.03em' }}>{product.name}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 10 : 11, opacity: 0.55, letterSpacing: '0.06em' }}>{product.weight}</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: m ? 10 : 14 }}>
        <div className="price-tag" style={{
          background: hover ? accent : 'var(--ink)',
          color: hover ? 'var(--ink)' : 'var(--paper)',
          fontSize: m ? 16 : 18,
          padding: m ? '5px 10px' : '6px 12px',
          transition: 'all 240ms',
        }}>₪{product.price}</div>
        <button style={{
          background: hover ? accent : 'var(--ink)',
          color: hover ? 'var(--ink)' : 'var(--paper)',
          border: '2px solid var(--ink)',
          padding: m ? '8px 12px' : '10px 16px',
          fontFamily: 'var(--mono)', fontSize: m ? 11 : 12, fontWeight: 700,
          cursor: 'pointer',
          boxShadow: hover ? '3px 3px 0 var(--ink)' : '0 0 0 var(--ink)',
          transition: 'all 240ms var(--easing)',
          letterSpacing: '0.04em',
        }}>{m ? '+ סל' : 'הוסף לסל +'}</button>
      </div>
    </div>
  );
}

function KayakHero({ accent, compact }) {
  const m = useCompact(compact);
  return (
    <section style={{
      padding: m ? '60px 16px' : '110px 40px',
      background: 'var(--ink)',
      color: 'var(--paper)',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '2px solid var(--ink)',
    }}>
      <div className="watermark" style={{
        top: m ? 20 : 40, left: -40,
        fontSize: m ? '180px' : 'clamp(220px, 28vw, 460px)',
        color: 'var(--paper)',
        opacity: 0.07,
      }}>KAYAK.</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionTag num="03" label={m ? 'קיאקי פירות' : 'קיאקי פירות · בלעדי לאירועים'} />
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1fr 1.3fr',
        gap: m ? 30 : 70,
        marginTop: m ? 24 : 50, alignItems: 'center',
      }}>
        <div>
          <h2 className="display" style={{
            fontSize: m ? 'clamp(56px, 16vw, 90px)' : 'clamp(70px, 10vw, 170px)',
            margin: 0, lineHeight: 0.85,
            color: 'var(--paper)',
            letterSpacing: '-0.05em',
          }}>
            מגש <span style={{ color: accent, fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>בצורת</span>
            <br />
            קיאק<span style={{ color: accent }}>.</span>
          </h2>
          <p style={{ fontFamily: 'var(--serif)', fontSize: m ? 17 : 22, lineHeight: 1.55, marginTop: m ? 20 : 32, maxWidth: 480, opacity: 0.92 }}>
            עמוס בפירות חתוכים, מסודרים כמו ציור.
            אורחים ניגשים, לוקחים, מתפעלים. <em style={{ color: accent }}>מגיע ביום האירוע.</em>
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: m ? 10 : 14, marginTop: m ? 28 : 44, maxWidth: 480,
          }}>
            {[
              ['S', '8–12', '₪480'],
              ['M', '15–25', '₪780'],
              ['L', '30–50', '₪1,180'],
              ['XL', '60+', '₪1,680'],
            ].map(([sz, gt, pr], i) => (
              <KayakSizeCard key={i} size={sz} guests={gt} price={pr} accent={accent} highlight={i === 2} m={m} />
            ))}
          </div>

          <button className="btn" style={{
            background: accent, color: 'var(--ink)', borderColor: accent,
            marginTop: m ? 24 : 36, boxShadow: '4px 4px 0 var(--paper)',
          }}>פתח קונפיגורטור →</button>
        </div>

        <div style={{ position: 'relative', order: m ? -1 : 0 }}>
          <div className="halo-accent" style={{
            '--halo-color': accent,
            opacity: 0.45,
            filter: 'blur(60px)',
          }} />
          <div className="float-y" style={{ position: 'relative', zIndex: 2 }}>
            <img src={KAYAK_IMG} alt="קיאק פירות" style={{
              width: '100%',
              filter: m
                ? 'drop-shadow(8px 10px 0 rgba(0,0,0,0.55)) drop-shadow(0 18px 24px rgba(0,0,0,0.5))'
                : 'drop-shadow(14px 18px 0 rgba(0,0,0,0.55)) drop-shadow(0 30px 40px rgba(0,0,0,0.5))',
            }} />
          </div>

          <div style={{ position: 'absolute', top: -10, right: -10, zIndex: 3 }}>
            <div className="float-tilt"><Sticker color={accent} rotate={-6}>L · 30 אורחים</Sticker></div>
          </div>

          {!m && (
            <div style={{ position: 'absolute', bottom: 30, left: -20, zIndex: 3 }}>
              <div style={{
                transform: 'rotate(6deg)',
                padding: '10px 14px',
                background: 'var(--paper)', color: 'var(--ink)',
                border: '2px solid var(--paper)',
                boxShadow: '4px 4px 0 ' + accent,
                fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>18 זנים</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function KayakSizeCard({ size, guests, price, accent, highlight, m }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: m ? '14px 14px' : '18px 20px',
        border: highlight ? `1.5px solid ${accent}` : '1px solid rgba(253,251,245,.25)',
        background: hover ? accent : (highlight ? 'rgba(201,24,74,0.22)' : 'transparent'),
        color: hover ? 'var(--ink)' : 'var(--paper)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 220ms var(--easing)',
        transform: hover ? 'translate(-2px, -2px)' : 'translate(0,0)',
        position: 'relative',
      }}
    >
      {highlight && !hover && (
        <span style={{
          position: 'absolute', top: -10, left: m ? 8 : 12,
          padding: m ? '2px 6px' : '3px 8px',
          background: accent, color: 'var(--ink)',
          fontFamily: 'var(--mono)', fontSize: m ? 8 : 9, fontWeight: 700, letterSpacing: '0.12em',
          border: '1px solid var(--ink)',
        }}>{m ? 'פופולרי' : 'הכי פופולרי'}</span>
      )}
      <div>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 20 : 24, letterSpacing: '-0.04em' }}>{size}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, opacity: 0.6, letterSpacing: '0.1em', marginTop: 2 }}>{guests}</div>
      </div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: m ? 16 : 19 }}>{price}</div>
    </div>
  );
}

function ProcessSection({ accent, compact }) {
  const m = useCompact(compact);
  const steps = [
    { n: '03:00', t: 'שוק העיר', d: 'בוחרים פירות אחד אחד.', ico: '◐' },
    { n: '06:00', t: 'במטבח', d: 'שוטפים, קולפים, חותכים.', ico: '✻' },
    { n: '07:30', t: 'במקרר', d: 'אורזים, מתייגים, מסדרים.', ico: '◆' },
    { n: '11:00', t: 'אצלכם', d: 'משלוח חינם בדימונה.', ico: '✦' },
  ];
  return (
    <section style={{
      padding: m ? '50px 16px' : '100px 40px',
      borderBottom: '2px solid var(--ink)',
      background: 'var(--paper-2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="watermark" style={{
        top: m ? 30 : 60, right: -40,
        fontSize: m ? '160px' : 'clamp(220px, 26vw, 420px)',
        color: 'var(--ink)',
      }}>04:30</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionTag num="04" label="היום שלנו" />
        <h2 className="display" style={{
          fontSize: m ? 'clamp(50px, 14vw, 80px)' : 'clamp(70px, 9vw, 140px)',
          marginTop: m ? 12 : 18, marginBottom: m ? 8 : 12, lineHeight: 0.9,
          letterSpacing: '-0.05em',
        }}>
          איך פרי <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: accent }}>מגיע</span> אליכם.
        </h2>
        <p style={{ fontFamily: 'var(--serif)', fontSize: m ? 16 : 20, opacity: 0.75, marginBottom: m ? 28 : 50, maxWidth: 580 }}>
          ארבע שעות בין השוק לבין הצלחת שלכם.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {!m && (
          <div style={{
            position: 'absolute', top: 60, left: 40, right: 40, height: 2,
            background: `repeating-linear-gradient(to right, var(--ink) 0 8px, transparent 8px 14px)`,
            zIndex: 0,
          }} />
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : 'repeat(4, 1fr)',
          gap: m ? 16 : 24,
          position: 'relative', zIndex: 1,
        }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: m ? '22px 18px' : '32px 24px',
              background: 'var(--paper)',
              border: '1.5px solid var(--ink)',
              boxShadow: m ? '4px 4px 0 var(--ink)' : '6px 6px 0 var(--ink)',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: -16, right: m ? 14 : 20,
                width: m ? 34 : 40, height: m ? 34 : 40,
                background: i === 1 ? accent : 'var(--ink)',
                color: i === 1 ? 'var(--ink)' : 'var(--paper)',
                border: '2px solid var(--ink)',
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 13 : 16,
                boxShadow: '3px 3px 0 var(--ink)',
              }}>0{i + 1}</div>

              <div style={{
                fontFamily: 'var(--mono)', fontSize: m ? 10 : 11, opacity: 0.5, letterSpacing: '0.18em',
                marginBottom: m ? 8 : 12,
              }}>STEP</div>
              <div style={{
                fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 28 : 36,
                lineHeight: 1, letterSpacing: '-0.03em',
                color: i === 1 ? accent : 'var(--ink)',
              }}>{s.n}</div>
              <div className="display" style={{
                fontSize: m ? 22 : 28, marginTop: m ? 10 : 14, marginBottom: m ? 6 : 10,
                letterSpacing: '-0.03em',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: m ? 18 : 22, color: accent }}>{s.ico}</span>
                {s.t}
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: m ? 14 : 16, lineHeight: 1.5, opacity: 0.8 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FruitMosaic({ accent, compact }) {
  const m = useCompact(compact);
  return (
    <section style={{
      padding: m ? '50px 16px' : '100px 40px',
      borderBottom: '2px solid var(--ink)',
      display: 'grid',
      gridTemplateColumns: m ? '1fr' : '1fr 1.4fr',
      gap: m ? 28 : 70, alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SectionTag num="05" label="הזנים שלנו" />
        <h2 className="display" style={{
          fontSize: m ? 'clamp(50px, 14vw, 80px)' : 'clamp(60px, 8vw, 120px)',
          margin: m ? '12px 0 0' : '18px 0 0', lineHeight: 0.88,
          letterSpacing: '-0.05em',
        }}>
          18 זנים<span style={{ color: accent }}>.</span>
          <br />
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.66em' }}>מתחלפים יומית.</span>
        </h2>
        <p style={{ fontFamily: 'var(--serif)', fontSize: m ? 16 : 20, lineHeight: 1.55, maxWidth: 420, marginTop: m ? 16 : 24 }}>
          מה שיש בשוק היום — נמצא אצלנו. אבוקדו, פפאיה, ליצ׳י, תאנים, רימונים, אננס.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: m ? 18 : 28 }}>
          {['אננס', 'אבטיח', 'מלון', 'תות', 'ענבים', 'קיווי', 'מנגו', 'פפאיה', 'ליצ׳י', 'תאנה', 'רימון', 'אבוקדו'].map((t, i) => (
            <span key={t} style={{
              padding: m ? '4px 10px' : '6px 14px',
              fontSize: m ? 11 : 12,
              border: '1.5px solid var(--ink)',
              borderRadius: 999,
              background: 'var(--paper)',
              fontFamily: 'var(--mono)', fontWeight: 700,
              boxShadow: '2px 2px 0 var(--ink)',
              transform: `rotate(${(i % 3 - 1) * 1}deg)`,
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: m ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
        gap: m ? 8 : 14,
        position: 'relative', zIndex: 1,
      }}>
        {[
          { k: 'pineapple', n: 'אננס' },
          { k: 'watermelon', n: 'אבטיח' },
          { k: 'strawberry', n: 'תות' },
          { k: 'grape', n: 'ענבים' },
          { k: 'melon', n: 'מלון' },
          { k: 'kiwi', n: 'קיווי' },
          { k: 'pineapple', n: 'אננס' },
          { k: 'watermelon', n: 'אבטיח' },
        ].slice(0, m ? 6 : 8).map((it, i) => (
          <MosaicCell key={i} kind={it.k} name={it.n} index={i} accent={accent} m={m} />
        ))}
      </div>
    </section>
  );
}

function MosaicCell({ kind, name, index, accent, m }) {
  const [hover, setHover] = React.useState(false);
  const bg = index % 3 === 0 ? accent : index % 3 === 1 ? 'var(--paper-2)' : 'var(--paper)';
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        aspectRatio: '1',
        border: '1.5px solid var(--ink)',
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 280ms var(--easing)',
        transform: hover ? 'translate(-3px, -3px) rotate(-1deg)' : 'translate(0,0) rotate(0)',
        boxShadow: hover ? '6px 6px 0 var(--ink)' : '0 0 0 var(--ink)',
        overflow: 'hidden',
      }}
    >
      <div style={{
        transition: 'transform 320ms var(--easing)',
        transform: hover ? 'scale(1.12) rotate(4deg)' : 'scale(1)',
      }}>
        <Fruit kind={kind} size={m ? 80 : 140} />
      </div>
      <div style={{
        position: 'absolute', bottom: 6, left: 6,
        fontFamily: 'var(--mono)', fontSize: m ? 8 : 10, fontWeight: 700,
        letterSpacing: '0.12em',
        background: hover ? 'var(--ink)' : 'transparent',
        color: hover ? 'var(--paper)' : 'var(--ink)',
        padding: m ? '2px 5px' : '3px 7px',
        transition: 'all 240ms',
      }}>0{index + 1} · {name}</div>
    </div>
  );
}

function Testimonials({ accent, compact }) {
  const m = useCompact(compact);
  const items = [
    { q: 'הזמנתי קיאק XL לחתונה של אחי. כל האורחים צילמו אותו לפני שאכלו.', a: 'נירית', r: 'חתונה ב-180 איש', stars: 5 },
    { q: 'אני קונה אצלם פירות פעמיים בשבוע כבר שנתיים. הילדים אוהבים, אני אוהבת את המחירים.', a: 'תהילה', r: 'דימונה', stars: 5 },
    { q: 'הקיאק הגיע בדיוק בזמן, נראה כמו תמונה מאינסטגרם.', a: 'יוסי', r: 'בר מצווה · ערד', stars: 5 },
  ];
  return (
    <section style={{
      padding: m ? '50px 16px' : '100px 40px',
      borderBottom: '2px solid var(--ink)',
      position: 'relative',
      background: 'var(--paper)',
      overflow: 'hidden',
    }}>
      <div className="watermark" style={{
        bottom: -50, right: -30,
        fontSize: m ? '140px' : 'clamp(180px, 22vw, 360px)',
        color: 'var(--ink)',
      }}>★★★★★</div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'space-between',
        alignItems: m ? 'flex-start' : 'flex-end',
        flexDirection: m ? 'column' : 'row',
        flexWrap: 'wrap', gap: m ? 14 : 24,
        marginBottom: m ? 24 : 48,
      }}>
        <div>
          <SectionTag num="06" label="מה אומרים עלינו" />
          <h2 className="display" style={{
            fontSize: m ? 'clamp(50px, 14vw, 80px)' : 'clamp(60px, 8vw, 120px)',
            margin: m ? '12px 0 0' : '18px 0 0', lineHeight: 0.9,
            letterSpacing: '-0.05em',
          }}>
            לקוחות <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: accent }}>חוזרים.</span>
          </h2>
        </div>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: m ? 11 : 13, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase',
          background: accent, color: 'var(--ink)',
          padding: m ? '10px 16px' : '14px 22px',
          border: '2px solid var(--ink)',
          boxShadow: '5px 5px 0 var(--ink)',
        }}>
          ★ 4.9 · 280 ביקורות
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
        gap: m ? 16 : 24,
      }}>
        {items.map((t, i) => (
          <TestimonialCard key={i} item={t} accent={accent} idx={i} m={m} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ item, accent, idx, m }) {
  const [hover, setHover] = React.useState(false);
  const tilt = idx % 2 === 0 ? -1 : 1;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: m ? '24px 22px 20px' : '36px 32px 28px',
        border: '1.5px solid var(--ink)',
        background: 'var(--paper)',
        position: 'relative',
        transition: 'all 260ms var(--easing)',
        transform: hover ? `translate(-4px, -4px) rotate(0deg)` : `translate(0,0) rotate(${tilt * 0.6}deg)`,
        boxShadow: hover ? '9px 9px 0 var(--ink)' : '4px 4px 0 var(--ink)',
      }}
    >
      <div style={{
        position: 'absolute', top: -14, right: m ? 18 : 24,
        fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 64 : 84, lineHeight: 0.6,
        color: accent,
        textShadow: '3px 3px 0 var(--ink)',
        userSelect: 'none',
      }}>"</div>

      <div style={{
        display: 'flex', gap: 4, color: accent,
        marginBottom: 14, fontSize: m ? 14 : 16,
      }}>
        {Array.from({ length: item.stars }).map((_, i) => <span key={i}>★</span>)}
      </div>

      <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: m ? 17 : 22, lineHeight: 1.45 }}>{item.q}</div>

      <div style={{
        marginTop: m ? 18 : 24, paddingTop: m ? 14 : 18, borderTop: '1px dashed rgba(0,0,0,.2)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: m ? 30 : 36, height: m ? 30 : 36, background: accent,
            border: '2px solid var(--ink)',
            borderRadius: '50%',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 12 : 14,
          }}>{item.a[0]}</div>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: m ? 14 : 16 }}>{item.a}</div>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 9 : 11, opacity: 0.6, letterSpacing: '0.1em' }}>{item.r}</div>
      </div>
    </div>
  );
}

function CTASection({ accent, compact }) {
  const m = useCompact(compact);
  return (
    <section style={{
      padding: m ? '70px 16px 80px' : '130px 40px 140px',
      background: accent, color: 'var(--ink)',
      borderBottom: '2px solid var(--ink)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(10,10,10,0.12) 1.5px, transparent 1.6px)',
        backgroundSize: '14px 14px',
        pointerEvents: 'none',
      }} />

      {!m && (
        <>
          <div style={{ position: 'absolute', top: 50, left: '8%', opacity: 0.85 }}>
            <div className="float-y" style={{ animationDuration: '7s' }}><Fruit kind="strawberry" size={110} /></div>
          </div>
          <div style={{ position: 'absolute', top: 80, right: '10%', opacity: 0.85 }}>
            <div className="float-y" style={{ animationDuration: '5.5s', animationDelay: '0.5s' }}><Fruit kind="pineapple" size={120} /></div>
          </div>
          <div style={{ position: 'absolute', bottom: 50, left: '12%', opacity: 0.85 }}>
            <div className="float-y" style={{ animationDuration: '6.5s', animationDelay: '1s' }}><Fruit kind="kiwi" size={90} /></div>
          </div>
          <div style={{ position: 'absolute', bottom: 80, right: '14%', opacity: 0.85 }}>
            <div className="float-y" style={{ animationDuration: '6s', animationDelay: '1.5s' }}><Fruit kind="grape" size={100} /></div>
          </div>
        </>
      )}
      {m && (
        <>
          <div style={{ position: 'absolute', top: 30, left: 16, opacity: 0.8 }}>
            <div className="float-y"><Fruit kind="strawberry" size={60} /></div>
          </div>
          <div style={{ position: 'absolute', top: 30, right: 16, opacity: 0.8 }}>
            <div className="float-y" style={{ animationDelay: '0.6s' }}><Fruit kind="pineapple" size={68} /></div>
          </div>
        </>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', gap: 8,
          padding: m ? '6px 12px' : '8px 16px',
          background: 'var(--ink)', color: accent,
          fontFamily: 'var(--mono)', fontSize: m ? 10 : 11, fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase',
          boxShadow: '4px 4px 0 var(--paper)',
        }}>
          <span className="pulse-dot" style={{ background: accent }} /> פתוח עכשיו
        </div>

        <h2 className="display" style={{
          fontSize: m ? 'clamp(70px, 22vw, 130px)' : 'clamp(80px, 13vw, 220px)',
          margin: m ? '20px 0 0' : '32px 0 0', lineHeight: 0.85, letterSpacing: '-0.06em',
        }}>
          בא לכם <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>פרי</span>
          <span>?</span>
        </h2>

        <p style={{
          fontFamily: 'var(--serif)', fontSize: m ? 18 : 24, lineHeight: 1.4, fontWeight: 600,
          margin: m ? '16px auto 0' : '24px auto 0', maxWidth: 640,
        }}>
          הזמנה עד 11:00 = אצלך עד 14:00. <em style={{ fontWeight: 700 }}>פשוט וטרי.</em>
        </p>

        <div style={{ display: 'flex', gap: m ? 10 : 16, justifyContent: 'center', marginTop: m ? 28 : 44, flexWrap: 'wrap' }}>
          <button className="btn" style={{
            background: 'var(--ink)', color: accent, borderColor: 'var(--ink)',
            boxShadow: '5px 5px 0 var(--paper)',
            padding: m ? '14px 22px' : '18px 32px', fontSize: m ? 15 : 17,
          }}>פתח את הקטלוג →</button>
          <button className="btn outline" style={{
            background: 'var(--paper)', borderColor: 'var(--ink)',
            boxShadow: '5px 5px 0 var(--ink)',
            padding: m ? '14px 22px' : '18px 32px', fontSize: m ? 15 : 17,
          }}>בנה קיאק</button>
        </div>

        <div style={{
          marginTop: m ? 32 : 56, paddingTop: m ? 18 : 28, borderTop: '1px solid rgba(10,10,10,0.2)',
          display: 'flex', justifyContent: 'center', gap: m ? 10 : 36, flexWrap: 'wrap',
          fontFamily: 'var(--mono)', fontSize: m ? 10 : 12, letterSpacing: m ? '0.1em' : '0.18em', textTransform: 'uppercase',
        }}>
          <span>✓ משלוח חינם בדימונה</span>
          <span>✓ הזמנה עד 11:00</span>
          <span>✓ אצלך עד 14:00</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HomePage, HeroMega, HeroSplit, HeroEditorial, ProductCard });

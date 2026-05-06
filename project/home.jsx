/* home.jsx — דף הבית המשודרג */

const KAYAK_IMG = 'assets/kayak-real.jpg';

function HomePage({ heroVariant = 'mega', accent = 'var(--watermelon)' }) {
  return (
    <div style={{ background: 'var(--paper)' }}>
      <SiteHeader active="home" />
      {heroVariant === 'mega' && <HeroMega accent={accent} />}
      {heroVariant === 'split' && <HeroSplit accent={accent} />}
      {heroVariant === 'editorial' && <HeroEditorial accent={accent} />}
      <TickerStrip />
      <ValuePropsBar />
      <BestSellersV2 accent={accent} />
      <KayakHero accent={accent} />
      <ProcessSection />
      <FruitMosaic accent={accent} />
      <Testimonials />
      <CTASection accent={accent} />
      <SiteFooter />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 1 — MEGA (default) — אדיטוריאלי, תמונת קיאק
   ═══════════════════════════════════════════════════ */
function HeroMega({ accent }) {
  return (
    <section style={{
      position: 'relative',
      borderBottom: '2px solid var(--ink)',
      background: 'var(--paper)',
      overflow: 'hidden',
    }}>
      {/* top meta strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '18px 40px',
        borderBottom: '1px solid var(--ink)',
        fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        <span>גליון 12 · אביב 2026 · דימונה</span>
        <span style={{ display: 'flex', gap: 24 }}>
          <span>● נחתך הבוקר</span>
          <span>● 22°C</span>
          <span>● משלוח עד 14:00</span>
        </span>
        <span>פרי לי ™ · est. 2018</span>
      </div>

      {/* main grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        minHeight: 720,
      }}>
        {/* LEFT — type */}
        <div style={{
          padding: '60px 50px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: '1px solid var(--ink)',
          position: 'relative',
        }}>
          <div>
            <SectionTag num="01" label="פירות קלופים · קיאקי אירועים" />
            <h1 className="display" style={{
              fontSize: 'clamp(110px, 14vw, 240px)',
              margin: '32px 0 0',
              lineHeight: 0.82,
              letterSpacing: '-0.06em',
            }}>
              פרי
              <br />
              ש<span style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400,
                color: accent,
              }}>נחתך</span>
              <br />
              עכשיו<span style={{ color: accent }}>.</span>
            </h1>
          </div>

          <div style={{ marginTop: 40 }}>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.45, maxWidth: 520,
              margin: 0, marginBottom: 32,
            }}>
              ב-3 בלילה אנחנו בשוק העיר. ב-7 בבוקר זה כבר על המדף —
              קלוף, חתוך, ארוז. מדימונה, ביד, באותו יום.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn primary" style={{ background: accent }}>הזמן עכשיו</button>
              <button className="btn outline">בנה קיאק לאירוע →</button>
            </div>
          </div>

          {/* float sticker */}
          <div style={{ position: 'absolute', top: 80, left: 40 }}>
            <Sticker color={accent} rotate={-8}>טרי 100%</Sticker>
          </div>
        </div>

        {/* RIGHT — kayak photo block */}
        <div style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          borderLeft: '1px solid var(--ink)',
          position: 'relative',
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}>
          {/* corner index */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', opacity: 0.6 }}>
            <span>FIG. 01</span>
            <span>קיאק XL · 50 אורחים</span>
          </div>

          {/* kayak image */}
          <div style={{
            position: 'relative',
            margin: '40px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img
              src={KAYAK_IMG}
              alt="קיאק פירות"
              style={{
                width: '100%',
                maxWidth: 520,
                filter: 'drop-shadow(8px 12px 0 rgba(0,0,0,0.4))',
              }}
            />
            {/* dimension lines */}
            <div style={{
              position: 'absolute', bottom: -16, left: '5%', right: '5%',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.6,
              letterSpacing: '0.15em',
            }}>
              <span>↤ 90cm ↦</span>
            </div>
          </div>

          {/* feature bullets */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
            paddingTop: 24, borderTop: '1px solid rgba(253,251,245,.2)',
          }}>
            <FeatureItem label="גודל" value="S · M · L · XL" />
            <FeatureItem label="פירות" value="עד 18 זנים" />
            <FeatureItem label="הכנה" value="ביום האירוע" />
            <FeatureItem label="התחלה מ-" value="₪480" />
          </div>
        </div>
      </div>

      {/* bottom stats bar */}
      <div style={{
        borderTop: '1px solid var(--ink)',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {[
          ['450+', 'אירועים השנה'],
          ['18', 'זני פירות יומי'],
          ['04:30', 'ניקיון יומי'],
          ['8 שנים', 'בדימונה'],
        ].map(([n, l], i) => (
          <div key={i} style={{
            padding: '24px 30px',
            borderRight: i < 3 ? '1px solid var(--ink)' : 'none',
            display: 'flex', alignItems: 'baseline', gap: 16,
          }}>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 44, lineHeight: 1, letterSpacing: '-0.04em' }}>{n}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureItem({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>{label}</div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 18, marginTop: 4 }}>{value}</div>
    </div>
  );
}

/* HERO 2 — SPLIT */
function HeroSplit({ accent }) {
  return (
    <section style={{
      display: 'grid', gridTemplateColumns: '1.1fr 1fr',
      borderBottom: '2px solid var(--ink)',
      minHeight: 720,
    }}>
      <div style={{ padding: '60px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <SectionTag num="01" label="חנות · אירועים · דימונה" />
        <div>
          <h1 className="display" style={{ fontSize: 'clamp(80px, 11vw, 180px)', margin: 0, lineHeight: 0.85 }}>
            פרי <span style={{ color: accent }}>לי.</span>
            <br />
            פרי <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>לכם.</span>
          </h1>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.45, maxWidth: 520, marginTop: 32 }}>
            פירות קלופים שנחתכו בבוקר. קיאקי פירות לאירועים שמחים.
            הכל יוצא מדימונה, מהמקרר שלנו אליכם.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn primary" style={{ background: accent }}>קנה פירות</button>
          <button className="btn outline">בנה קיאק</button>
        </div>
      </div>
      <div style={{
        background: accent,
        position: 'relative',
        borderRight: '2px solid var(--ink)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src={KAYAK_IMG} alt="קיאק" style={{ width: '90%', filter: 'drop-shadow(6px 8px 0 rgba(0,0,0,0.25))' }} />
        <div style={{ position: 'absolute', top: 40, right: 40 }}>
          <Sticker color="var(--paper)" rotate={-10}>חדש · 2026</Sticker>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 40, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em' }}>
          FIG. 01 — KAYAK XL
        </div>
      </div>
    </section>
  );
}

/* HERO 3 — EDITORIAL */
function HeroEditorial({ accent }) {
  return (
    <section style={{ padding: '40px 40px 60px', borderBottom: '2px solid var(--ink)', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <span>גליון 12 · אביב 2026</span>
        <span>פרי לי ™</span>
        <span>דימונה</span>
      </div>
      <div style={{ marginTop: 50 }}>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 28, marginBottom: 12 }}>החדש מדימונה</div>
        <h1 className="display" style={{
          fontSize: 'clamp(100px, 14vw, 240px)',
          lineHeight: 0.85, margin: 0,
        }}>
          קיאקי
          <br />
          <span style={{ color: accent }}>פירות.</span>
        </h1>
        <img src={KAYAK_IMG} alt="קיאק" style={{ width: '70%', maxWidth: 800, margin: '32px auto 0', display: 'block' }} />
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginTop: 24, maxWidth: 600, marginInline: 'auto' }}>
          מגש בצורת קיאק עמוס פירות חתוכים בעבודת יד. לחתונה, ליום הולדת, לכל אירוע שמגיע לו לזכור.
        </div>
        <button className="btn primary" style={{ background: accent, marginTop: 32 }}>בנה את הקיאק שלך →</button>
      </div>
    </section>
  );
}

/* ─── Ticker ─── */
function TickerStrip() {
  const items = ['אננס מתוק', 'מלון אמבוסיה', 'אבטיח אדום', 'תות שדה', 'אוכמניות', 'דובדבנים', 'ענבי קונקורד', 'קיווי זהב', 'מנגו ישראלי', 'פפאיה', 'ליצ׳י', 'משמש'];
  const repeated = [...items, ...items, ...items];
  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--paper)',
      padding: '18px 0', overflow: 'hidden',
      borderBottom: '2px solid var(--ink)',
    }}>
      <div className="marquee" style={{ gap: 40, display: 'flex' }}>
        {repeated.map((x, i) => (
          <span key={i} style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 40, whiteSpace: 'nowrap' }}>
            {x} <span style={{ color: 'var(--watermelon)' }}>✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Value props bar ─── */
function ValuePropsBar() {
  const items = [
    { icon: '✻', t: 'נחתך באותו יום', d: 'אין מלאי לא טרי' },
    { icon: '↻', t: 'משלוח עד 14:00', d: 'הזמנה עד 11:00' },
    { icon: '◆', t: 'קיאקים בהתאמה', d: 'גודל, פירות, תוספות' },
    { icon: '✦', t: 'דרום הארץ', d: 'דימונה, ערד, באר שבע' },
  ];
  return (
    <section style={{
      padding: '32px 40px', borderBottom: '2px solid var(--ink)',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
    }}>
      {items.map((f, i) => (
        <div key={i} style={{
          padding: '0 24px',
          borderRight: i < 3 ? '1px solid rgba(0,0,0,.15)' : 'none',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <div style={{ fontSize: 32, color: 'var(--watermelon)', lineHeight: 1 }}>{f.icon}</div>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 18 }}>{f.t}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6, marginTop: 2 }}>{f.d}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ─── Best sellers v2 with category tabs ─── */
function BestSellersV2({ accent }) {
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
    <section style={{ padding: '90px 40px', borderBottom: '2px solid var(--ink)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div>
          <SectionTag num="02" label="קטלוג · הכי נמכרים" />
          <h2 className="display" style={{ fontSize: 'clamp(70px, 9vw, 120px)', margin: '16px 0 0', lineHeight: 0.9 }}>
            הקלאסיקות<span style={{ color: accent }}>.</span>
          </h2>
        </div>
        <a style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: 4 }}>כל הקטלוג ↘</a>
      </div>

      {/* category tabs */}
      <div style={{
        display: 'flex', gap: 0, borderTop: '1px solid var(--ink)', borderBottom: '1px solid var(--ink)',
        marginBottom: 0,
      }}>
        {categories.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              flex: 1,
              padding: '18px 20px',
              background: active === c.id ? 'var(--ink)' : 'transparent',
              color: active === c.id ? 'var(--paper)' : 'var(--ink)',
              border: 'none',
              borderRight: i < categories.length - 1 ? '1px solid var(--ink)' : 'none',
              fontFamily: 'var(--display)', fontWeight: 800, fontSize: 18,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {c.label}
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, marginInlineStart: 8, opacity: 0.6 }}>
              {c.id === 'all' ? products.length : products.filter(p => p.cat === c.id).length}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--ink)', borderTop: 'none' }}>
        {filtered.map((p, i) => (
          <ProductCard key={p.name} product={p} index={i} cols={3} total={filtered.length} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index, cols, total }) {
  const lastRow = index >= total - cols;
  const lastCol = (index + 1) % cols === 0;
  return (
    <div className="product-card" style={{
      padding: '32px 30px',
      borderRight: lastCol ? 'none' : '1px solid var(--ink)',
      borderBottom: lastRow ? 'none' : '1px solid var(--ink)',
      position: 'relative',
      background: 'var(--paper)',
      cursor: 'pointer',
      transition: 'background 0.2s',
    }}>
      {product.tag && (
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
          <Sticker color={product.tag === 'חדש' ? 'var(--leaf)' : 'var(--watermelon)'} rotate={-6}>{product.tag}</Sticker>
        </div>
      )}
      <div style={{ height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Fruit kind={product.kind} size={200} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 28 }}>
        <div className="display" style={{ fontSize: 30, lineHeight: 1 }}>{product.name}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.5, letterSpacing: '0.06em' }}>{product.weight}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 26 }}>₪{product.price}</div>
        <button style={{
          background: 'var(--ink)', color: 'var(--paper)',
          border: 'none', padding: '12px 16px',
          fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
          cursor: 'pointer',
        }}>הוסף לסל +</button>
      </div>
    </div>
  );
}

/* ─── Kayak hero — full-bleed dark section ─── */
function KayakHero({ accent }) {
  return (
    <section style={{
      padding: '90px 40px',
      background: 'var(--ink)',
      color: 'var(--paper)',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '2px solid var(--ink)',
    }}>
      <SectionTag num="03" label="קיאקי פירות · בלעדי לאירועים" dark />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 60, marginTop: 40, alignItems: 'center' }}>
        <div>
          <h2 className="display" style={{ fontSize: 'clamp(70px, 10vw, 160px)', margin: 0, lineHeight: 0.85, color: 'var(--paper)' }}>
            מגש <span style={{ color: accent, fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>בצורת</span>
            <br />
            קיאק.
          </h2>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.5, marginTop: 32, maxWidth: 480 }}>
            עמוס בפירות חתוכים בעבודת יד, מסודרים כמו ציור.
            אורחים ניגשים, לוקחים, מתפעלים. מגיע ביום האירוע.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 40, maxWidth: 480 }}>
            {[
              ['S', '8–12 אורחים', '₪480'],
              ['M', '15–25 אורחים', '₪780'],
              ['L', '30–50 אורחים', '₪1,180'],
              ['XL', '60+ אורחים', '₪1,680'],
            ].map(([sz, gt, pr], i) => (
              <div key={i} style={{
                padding: '16px 18px',
                border: '1px solid rgba(253,251,245,.25)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 22 }}>{sz}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.5, letterSpacing: '0.1em' }}>{gt}</div>
                </div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 18 }}>{pr}</div>
              </div>
            ))}
          </div>

          <button className="btn" style={{ background: accent, color: 'var(--ink)', borderColor: accent, marginTop: 32 }}>
            פתח קונפיגורטור →
          </button>
        </div>

        {/* Kayak image */}
        <div style={{ position: 'relative' }}>
          <img src={KAYAK_IMG} alt="קיאק פירות" style={{
            width: '100%',
            filter: 'drop-shadow(12px 16px 0 rgba(0,0,0,0.5))',
          }} />
          <div style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-12deg)' }}>
            <Sticker color={accent} rotate={0}>L · 30 אורחים</Sticker>
          </div>
          <div style={{
            position: 'absolute', bottom: -20, left: '5%', right: '5%',
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', opacity: 0.6,
          }}>
            <span>↤ 90cm ↦</span>
            <span>FIG. 02 — XL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Process timeline ─── */
function ProcessSection() {
  const steps = [
    { n: '03:00', t: 'שוק העיר', d: 'בוחרים פירות אחד אחד. רק מה שטעים הולך הביתה.' },
    { n: '06:00', t: 'במטבח', d: 'שוטפים, קולפים, חותכים. הכל בידיים. הכל באותו בוקר.' },
    { n: '07:30', t: 'במקרר', d: 'אורזים, מתייגים, מסדרים על המדף. מוכנים לכם.' },
    { n: '11:00', t: 'אצלכם', d: 'משלוח חינם בדימונה. או באים לקחת מהחנות.' },
  ];
  return (
    <section style={{ padding: '90px 40px', borderBottom: '2px solid var(--ink)', background: 'var(--paper-2)' }}>
      <SectionTag num="04" label="היום שלנו" />
      <h2 className="display" style={{ fontSize: 'clamp(70px, 9vw, 140px)', marginTop: 16, marginBottom: 60, lineHeight: 0.9 }}>
        איך פרי <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>מגיע</span> אליכם.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--ink)' }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            padding: '36px 24px',
            borderRight: i < 3 ? '1px solid var(--ink)' : 'none',
            position: 'relative',
          }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.5, letterSpacing: '0.18em',
              marginBottom: 16,
            }}>STEP 0{i + 1}</div>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 32, marginBottom: 12 }}>{s.n}</div>
            <div className="display" style={{ fontSize: 36, marginBottom: 12 }}>{s.t}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.45, opacity: 0.75 }}>{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Mosaic — visual fruit pattern ─── */
function FruitMosaic({ accent }) {
  return (
    <section style={{
      padding: '90px 40px', borderBottom: '2px solid var(--ink)',
      display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'center',
    }}>
      <div>
        <SectionTag num="05" label="הזנים שלנו" />
        <h2 className="display" style={{ fontSize: 'clamp(60px, 8vw, 110px)', margin: '16px 0 0', lineHeight: 0.9 }}>
          18 זנים<span style={{ color: accent }}>.</span>
          <br />
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.7em' }}>מתחלפים יומית.</span>
        </h2>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.5, maxWidth: 420, marginTop: 24 }}>
          מה שיש בשוק היום — נמצא אצלנו. אבוקדו, פפאיה, ליצ׳י,
          תאנים, רימונים, אננס. כל מה שעונתי, כל מה שמבשיל.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
          {['אננס', 'אבטיח', 'מלון', 'תות', 'ענבים', 'קיווי', 'מנגו', 'פפאיה', 'ליצ׳י', 'תאנה', 'רימון', 'אבוקדו'].map(t => (
            <span key={t} style={{
              padding: '6px 14px',
              border: '1px solid var(--ink)',
              borderRadius: 999,
              fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
            }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
      }}>
        {['pineapple', 'watermelon', 'strawberry', 'grape', 'melon', 'kiwi', 'pineapple', 'watermelon'].map((k, i) => (
          <div key={i} style={{
            aspectRatio: '1',
            border: '1px solid var(--ink)',
            background: i % 3 === 0 ? accent : i % 3 === 1 ? 'var(--paper-2)' : 'var(--paper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <Fruit kind={k} size={140} />
            <div style={{
              position: 'absolute', bottom: 8, left: 8,
              fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.1em',
            }}>0{i + 1}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: 'הזמנתי קיאק XL לחתונה של אחי. כל האורחים צילמו אותו לפני שאכלו.', a: 'נירית', r: 'חתונה ב-180 איש' },
    { q: 'אני קונה אצלם פירות קלופים פעמיים בשבוע כבר שנתיים. הילדים אוהבים, אני אוהבת את המחירים.', a: 'תהילה', r: 'דימונה' },
    { q: 'הקיאק הגיע בדיוק בזמן, נראה כמו תמונה מאינסטגרם. שירות מעולה.', a: 'יוסי', r: 'בר מצווה · ערד' },
  ];
  return (
    <section style={{ padding: '90px 40px', borderBottom: '2px solid var(--ink)' }}>
      <SectionTag num="06" label="מה אומרים עלינו" />
      <h2 className="display" style={{ fontSize: 'clamp(60px, 8vw, 110px)', margin: '16px 0 40px', lineHeight: 0.9 }}>
        לקוחות <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>חוזרים.</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--ink)' }}>
        {items.map((t, i) => (
          <div key={i} style={{
            padding: 32,
            borderRight: i < 2 ? '1px solid var(--ink)' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 48, lineHeight: 0.7, color: 'var(--watermelon)', marginBottom: 16 }}>"</div>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.4 }}>{t.q}</div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(0,0,0,.15)', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 16 }}>{t.a}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6, letterSpacing: '0.1em' }}>{t.r}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ accent }) {
  return (
    <section style={{
      padding: '120px 40px', background: accent, color: 'var(--ink)',
      borderBottom: '2px solid var(--ink)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <h2 className="display" style={{ fontSize: 'clamp(80px, 12vw, 200px)', margin: 0, lineHeight: 0.85, letterSpacing: '-0.06em' }}>
        בא לכם <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>פרי?</span>
      </h2>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 48 }}>
        <button className="btn" style={{ background: 'var(--ink)', color: accent, borderColor: 'var(--ink)' }}>פתח את הקטלוג</button>
        <button className="btn outline">בנה קיאק לאירוע</button>
      </div>
      <div style={{
        marginTop: 48, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase',
      }}>
        משלוח חינם בדימונה · הזמנה עד 11:00 = אצלך עד 14:00
      </div>
    </section>
  );
}

Object.assign(window, { HomePage, HeroMega, HeroSplit, HeroEditorial, ProductCard });

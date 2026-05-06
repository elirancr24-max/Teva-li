/* app.jsx — main shell: top nav + screen switcher + tweaks */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "watermelon",
  "displayFont": "Heebo",
  "serifFont": "Frank Ruhl Libre",
  "btnStyle": "sharp",
  "heroVariant": "mega"
}/*EDITMODE-END*/;

const PALETTES = {
  watermelon: { accent: '#FF4D6D', label: 'אבטיח' },
  citrus:     { accent: '#FFD60A', label: 'הדרים' },
  leaf:       { accent: '#1F8A5B', label: 'עלה' },
  berry:      { accent: '#6B1F3A', label: 'יער' },
  tangerine:  { accent: '#FF7A1A', label: 'מנגו' },
};

const FONTS = {
  display: {
    Heebo: '"Heebo", system-ui, sans-serif',
    Assistant: '"Assistant", system-ui, sans-serif',
    Anek: '"Anek Hebrew", system-ui, sans-serif',
    Rubik: '"Rubik", system-ui, sans-serif',
  },
  serif: {
    'Frank Ruhl Libre': '"Frank Ruhl Libre", Georgia, serif',
    'David Libre': '"David Libre", Georgia, serif',
    'Noto Serif Hebrew': '"Noto Serif Hebrew", Georgia, serif',
  },
};

const SCREENS = [
  { id: 'home', label: 'דף בית', sub: 'דסקטופ' },
  { id: 'shop', label: 'קטלוג', sub: 'פירות קלופים' },
  { id: 'product', label: 'מוצר', sub: 'דף בודד' },
  { id: 'kayak', label: 'קונפיגורטור', sub: 'בנה קיאק' },
  { id: 'admin-dash', label: 'אדמין · בקרה', sub: 'KPI + מכירות' },
  { id: 'admin-products', label: 'אדמין · מוצרים', sub: 'הוסף / ערוך' },
  { id: 'admin-kayaks', label: 'אדמין · קיאקים', sub: 'אישור הזמנות' },
  { id: 'mobile', label: 'מובייל', sub: 'iPhone' },
  { id: 'brand', label: 'מערכת עיצוב', sub: 'מותג + טוקנים' },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState(() => {
    try { return localStorage.getItem('pl-screen') || 'home'; } catch { return 'home'; }
  });
  useEffect(() => { try { localStorage.setItem('pl-screen', screen); } catch {} }, [screen]);

  const palette = PALETTES[t.palette] || PALETTES.watermelon;
  const accent = palette.accent;

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--display', FONTS.display[t.displayFont] || FONTS.display.Heebo);
    r.style.setProperty('--serif', FONTS.serif[t.serifFont] || FONTS.serif['Frank Ruhl Libre']);
    r.style.setProperty('--watermelon', palette.accent);
  }, [t.displayFont, t.serifFont, t.palette]);

  useEffect(() => {
    const styleId = '__btn_style';
    let s = document.getElementById(styleId);
    if (!s) { s = document.createElement('style'); s.id = styleId; document.head.appendChild(s); }
    const radius = t.btnStyle === 'pill' ? '999px' : t.btnStyle === 'soft' ? '8px' : '0px';
    s.textContent = `.btn, button.btn { border-radius: ${radius} !important; }`;
  }, [t.btnStyle]);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      <PreviewBar screen={screen} setScreen={setScreen} />
      <div style={{
        padding: '24px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <ScreenFrame screen={screen}>
          {renderScreen(screen, accent, t)}
        </ScreenFrame>
      </div>

      <TweaksPanel title="Tweaks · פרי לי">
        <TweakSection title="פלטת צבעים">
          <TweakColor
            label="צבע ראשי"
            value={t.palette}
            options={Object.keys(PALETTES).map(k => ({ value: k, color: PALETTES[k].accent, label: PALETTES[k].label }))}
            onChange={(v) => setTweak('palette', v)}
          />
        </TweakSection>
        <TweakSection title="טיפוגרפיה">
          <TweakSelect label="גופן ראשי" value={t.displayFont} options={Object.keys(FONTS.display)} onChange={(v) => setTweak('displayFont', v)} />
          <TweakSelect label="גופן סריף" value={t.serifFont} options={Object.keys(FONTS.serif)} onChange={(v) => setTweak('serifFont', v)} />
        </TweakSection>
        <TweakSection title="כפתורים">
          <TweakRadio label="סגנון" value={t.btnStyle} options={[{value:'sharp',label:'חד'},{value:'soft',label:'רך'},{value:'pill',label:'גלולה'}]} onChange={(v) => setTweak('btnStyle', v)} />
        </TweakSection>
        <TweakSection title="הירו (דף בית)">
          <TweakRadio label="וריאציה" value={t.heroVariant} options={[{value:'mega',label:'ענק'},{value:'split',label:'מפוצל'},{value:'editorial',label:'מגזין'}]} onChange={(v) => setTweak('heroVariant', v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

/* Top nav bar — outside the design preview */
function PreviewBar({ screen, setScreen }) {
  const current = SCREENS.find(s => s.id === screen) || SCREENS[0];
  return (
    <div style={{
      background: '#0a0a0a', color: '#fdfbf5',
      padding: '14px 24px',
      display: 'flex', alignItems: 'center', gap: 24,
      borderBottom: '1px solid #2a2a2a',
      position: 'sticky', top: 0, zIndex: 100,
      direction: 'rtl',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FFD60A', position: 'relative', overflow: 'hidden', border: '1.5px solid #0a0a0a' }}>
          {[0, 60, 120].map(rot => (
            <div key={rot} style={{ position: 'absolute', top: '50%', left: '50%', width: '50%', height: 1.5, background: '#0a0a0a', transformOrigin: 'left center', transform: `rotate(${rot}deg)` }} />
          ))}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 14, letterSpacing: '-0.02em' }}>פרי לי</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', opacity: 0.5 }}>PREVIEW</div>
        </div>
      </div>
      <div style={{ width: 1, height: 28, background: '#2a2a2a' }} />
      <div style={{
        display: 'flex', gap: 4, overflowX: 'auto', flex: 1,
        scrollbarWidth: 'none',
      }}>
        {SCREENS.map(s => (
          <button key={s.id} onClick={() => setScreen(s.id)} style={{
            padding: '8px 14px',
            background: screen === s.id ? '#fdfbf5' : 'transparent',
            color: screen === s.id ? '#0a0a0a' : '#fdfbf5',
            border: '1px solid ' + (screen === s.id ? '#fdfbf5' : '#2a2a2a'),
            fontFamily: 'var(--display)', fontWeight: 700, fontSize: 12,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            lineHeight: 1.2,
          }}>
            <span>{s.label}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, opacity: 0.5, fontWeight: 400 }}>{s.sub}</span>
          </button>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.5, letterSpacing: '0.1em' }}>
        {current.label.toUpperCase()}
      </div>
    </div>
  );
}

/* Frame for each screen — gives padding + label */
function ScreenFrame({ screen, children }) {
  if (screen === 'mobile') {
    return (
      <div style={{ padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
        <IOSDevice width={402} height={874}>
          {children}
        </IOSDevice>
      </div>
    );
  }
  // Desktop frame
  return (
    <div style={{
      width: '100%', maxWidth: 1440,
      background: 'var(--paper)',
      boxShadow: '0 30px 80px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.05)',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}

function renderScreen(screen, accent, t) {
  switch (screen) {
    case 'home':            return <HomePage accent={accent} heroVariant={t.heroVariant} />;
    case 'shop':            return <ShopPage accent={accent} />;
    case 'product':         return <ProductPage accent={accent} />;
    case 'kayak':           return <KayakConfigurator accent={accent} />;
    case 'admin-dash':      return <AdminDashboardWrap tab="dashboard" accent={accent} />;
    case 'admin-products':  return <AdminDashboardWrap tab="products" accent={accent} />;
    case 'admin-kayaks':    return <AdminDashboardWrap tab="kayaks" accent={accent} />;
    case 'mobile':          return <MobileScreen accent={accent} />;
    case 'brand':           return <BrandBoard accent={accent} />;
    default:                return <HomePage accent={accent} heroVariant={t.heroVariant} />;
  }
}

/* Admin wrapper with tab control */
function AdminDashboardWrap({ tab, accent }) {
  const [t, setT] = useState(tab);
  useEffect(() => setT(tab), [tab]);
  return (
    <div style={{ background: 'var(--paper)', minHeight: 900, display: 'grid', gridTemplateColumns: '240px 1fr' }}>
      <AdminSidebar tab={t} setTab={setT} />
      <div style={{ overflow: 'auto' }}>
        {t === 'dashboard' && <DashboardView accent={accent} />}
        {t === 'products' && <ProductsView accent={accent} />}
        {t === 'orders' && <OrdersView accent={accent} />}
        {t === 'kayaks' && <KayaksView accent={accent} />}
      </div>
    </div>
  );
}

/* Brand / design system board */
function BrandBoard({ accent }) {
  return (
    <div style={{ background: 'var(--paper)' }}>
      {/* Cover */}
      <div style={{ height: 680, background: accent, padding: 60, position: 'relative', overflow: 'hidden', color: 'var(--ink)', borderBottom: '2px solid var(--ink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          <span>פרי לי · מערכת עיצוב</span>
          <span>2026 · גליון 01</span>
        </div>
        <div style={{ position: 'absolute', top: '50%', left: 60, right: 60, transform: 'translateY(-50%)' }}>
          <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 32, marginBottom: 12 }}>פירות קלופים · קיאקי אירועים</div>
          <h1 className="display" style={{ fontSize: 260, lineHeight: 0.82, margin: 0, letterSpacing: '-0.06em' }}>
            פרי
            <br />
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>לי.</span>
          </h1>
        </div>
        <div style={{ position: 'absolute', top: 80, right: 80, transform: 'rotate(15deg)' }}><WatermelonArt size={140} /></div>
        <div style={{ position: 'absolute', bottom: 80, left: 80, transform: 'rotate(-12deg)' }}><PineappleArt size={120} /></div>
        <div style={{ position: 'absolute', top: 240, right: 240 }}><Sticker color="var(--ink)" rotate={-8}><span style={{ color: 'var(--paper)' }}>טרי 100%</span></Sticker></div>
        <div style={{ position: 'absolute', bottom: 60, right: 60, fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.7 }}>DIMONA · ISRAEL · EST. 2019</div>
      </div>

      {/* Tokens */}
      <div style={{ padding: 60 }}>
        <SectionTag num="—" label="טוקני העיצוב" />
        <h2 className="display" style={{ fontSize: 96, margin: '12px 0 40px' }}>הכללים.</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 24, marginBottom: 24 }}>
          <div style={{ border: '2px solid var(--ink)', padding: 24 }}>
            <SectionTag num="01" label="צבעים" />
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
              {[
                { c: '#0a0a0a', n: 'דיו' },
                { c: '#fdfbf5', n: 'נייר' },
                { c: accent, n: 'ראשי' },
                { c: '#FFD60A', n: 'הדר' },
                { c: '#1F8A5B', n: 'עלה' },
              ].map((s, i) => (
                <div key={i} style={{ aspectRatio: '1', background: s.c, border: '1px solid var(--ink)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 8, color: ['#0a0a0a','#6B1F3A'].includes(s.c) ? '#fdfbf5' : '#0a0a0a' }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700 }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 8, opacity: 0.6 }}>{s.c.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ border: '2px solid var(--ink)', padding: 24 }}>
            <SectionTag num="02" label="טיפוגרפיה" />
            <div style={{ marginTop: 12 }}>
              <div className="display" style={{ fontSize: 72, lineHeight: 0.9 }}>פרי</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, opacity: 0.6 }}>HEEBO BLACK · 900</div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 40 }}>טרי.</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, opacity: 0.6 }}>FRANK RUHL · ITALIC</div>
            </div>
          </div>
          <div style={{ border: '2px solid var(--ink)', padding: 24 }}>
            <SectionTag num="03" label="סטיקרים" />
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
              <Sticker color="var(--citrus)" rotate={-6}>טרי 100%</Sticker>
              <Sticker color={accent} rotate={4}>הכי נמכר</Sticker>
              <Sticker color="var(--leaf)" rotate={-4}><span style={{ color: 'var(--paper)' }}>חדש</span></Sticker>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <div style={{ border: '2px solid var(--ink)', padding: 24 }}>
            <SectionTag num="04" label="כפתורים" />
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <button className="btn primary" style={{ background: accent }}>הזמן עכשיו</button>
              <button className="btn">בנה קיאק</button>
              <button className="btn outline">קרא עוד →</button>
            </div>
          </div>
          <div style={{ border: '2px solid var(--ink)', padding: 24 }}>
            <SectionTag num="05" label="איקונים · פירות" />
            <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, justifyItems: 'center' }}>
              <PineappleArt size={60} />
              <WatermelonArt size={60} />
              <StrawberryArt size={60} />
              <GrapeArt size={60} />
              <MelonArt size={60} />
              <KiwiArt size={60} />
            </div>
          </div>
          <div style={{ border: '2px solid var(--ink)', padding: 24, background: 'var(--ink)', color: 'var(--paper)' }}>
            <SectionTag num="06" label="טון דיבור" />
            <div style={{ marginTop: 20, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.3 }}>
              "ב-3 בלילה אנחנו כבר בשוק. ב-7 בבוקר זה כבר על המדף."
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, marginTop: 16, opacity: 0.5, letterSpacing: '0.1em' }}>ישיר · גאה · דימונאי</div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

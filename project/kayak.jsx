/* kayak.jsx — קונפיגורטור קיאק אינטראקטיבי */

const KAYAK_SIZES = [
  { id: 'S', label: 'S', guests: '8-12', price: 380, w: 320, h: 100 },
  { id: 'M', label: 'M', guests: '15-25', price: 620, w: 420, h: 120 },
  { id: 'L', label: 'L', guests: '30-50', price: 980, w: 540, h: 140 },
  { id: 'XL', label: 'XL', guests: '60+', price: 1450, w: 660, h: 160 },
];

const KAYAK_FRUITS = [
  { id: 'pineapple', name: 'אננס', kind: 'pineapple' },
  { id: 'watermelon', name: 'אבטיח', kind: 'watermelon' },
  { id: 'strawberry', name: 'תות', kind: 'strawberry' },
  { id: 'grape', name: 'ענבים', kind: 'grape' },
  { id: 'melon', name: 'מלון', kind: 'melon' },
  { id: 'kiwi', name: 'קיווי', kind: 'kiwi' },
];

const KAYAK_EXTRAS = [
  { id: 'choc', name: 'שוקולד מומס', price: 60 },
  { id: 'gran', name: 'גרנולה ביתית', price: 40 },
  { id: 'honey', name: 'דבש דימונה', price: 35 },
  { id: 'mint', name: 'נענע טרייה', price: 15 },
];

const EVENT_TYPES = ['חתונה', 'יום הולדת', 'בר/בת מצווה', 'אירוע עסקי', 'ברית', 'אחר'];

function KayakConfigurator({ accent = 'var(--watermelon)' }) {
  const [size, setSize] = useState('M');
  const [fruits, setFruits] = useState(['pineapple', 'watermelon', 'strawberry', 'grape']);
  const [extras, setExtras] = useState(['mint']);
  const [step, setStep] = useState(1);
  const [eventType, setEventType] = useState('חתונה');
  const [guests, setGuests] = useState(40);

  const sizeObj = KAYAK_SIZES.find(s => s.id === size);
  const extrasTotal = extras.reduce((sum, id) => sum + (KAYAK_EXTRAS.find(e => e.id === id)?.price || 0), 0);
  const total = sizeObj.price + extrasTotal;

  const toggleFruit = (id) => {
    setFruits(fruits.includes(id) ? fruits.filter(x => x !== id) : [...fruits, id]);
  };
  const toggleExtra = (id) => {
    setExtras(extras.includes(id) ? extras.filter(x => x !== id) : [...extras, id]);
  };

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100%' }}>
      <SiteHeader active="kayak" />

      <section style={{ padding: '40px 40px 20px', borderBottom: '2px solid var(--ink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <SectionTag num="—" label="קונפיגורטור · בנה את הקיאק שלך" />
            <h1 className="display" style={{ fontSize: 'clamp(80px, 12vw, 200px)', margin: '20px 0 0' }}>
              בנה <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: accent }}>קיאק.</span>
            </h1>
          </div>
          <StepIndicator step={step} />
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', minHeight: 700 }}>
        {/* Live preview */}
        <div style={{
          background: 'var(--paper-2)',
          borderLeft: '2px solid var(--ink)',
          padding: 60,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.04,
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6 }}>
            <span>תצוגה חיה · {size} · {fruits.length} פירות</span>
            <span>↻ עדכון מיידי</span>
          </div>

          <KayakPreview size={sizeObj} fruits={fruits} extras={extras} />

          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', opacity: 0.6 }}>
            <span>↤ {sizeObj.w}MM ↦</span>
            <span>גובה: {sizeObj.h}MM</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding: '40px 40px 0', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {/* Step 1: Size */}
          <ControlBlock num="01" title="גודל" expanded={step >= 1}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 16 }}>
              {KAYAK_SIZES.map(s => (
                <button key={s.id} onClick={() => setSize(s.id)} style={{
                  padding: '20px 12px',
                  background: size === s.id ? 'var(--ink)' : 'transparent',
                  color: size === s.id ? 'var(--paper)' : 'var(--ink)',
                  border: '2px solid var(--ink)',
                  fontFamily: 'var(--display)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}>
                  <div style={{ fontWeight: 900, fontSize: 32, lineHeight: 1 }}>{s.label}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, marginTop: 6, opacity: 0.7 }}>{s.guests} אורחים</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, marginTop: 8, fontWeight: 700 }}>₪{s.price}</div>
                </button>
              ))}
            </div>
          </ControlBlock>

          {/* Step 2: Fruits */}
          <ControlBlock num="02" title="פירות" expanded={step >= 1}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6, marginBottom: 12, marginTop: 12 }}>
              נבחרו {fruits.length}/6 · כלולים במחיר
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {KAYAK_FRUITS.map(f => {
                const active = fruits.includes(f.id);
                return (
                  <button key={f.id} onClick={() => toggleFruit(f.id)} style={{
                    padding: '12px',
                    background: active ? accent : 'transparent',
                    border: '2px solid var(--ink)',
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                    position: 'relative',
                  }}>
                    {active && <div style={{ position: 'absolute', top: 6, right: 6, width: 16, height: 16, background: 'var(--ink)', color: 'var(--paper)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>✓</div>}
                    <Fruit kind={f.kind} size={50} />
                    <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 14 }}>{f.name}</div>
                  </button>
                );
              })}
            </div>
          </ControlBlock>

          {/* Step 3: Extras */}
          <ControlBlock num="03" title="תוספות" expanded={step >= 1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12 }}>
              {KAYAK_EXTRAS.map(e => {
                const active = extras.includes(e.id);
                return (
                  <button key={e.id} onClick={() => toggleExtra(e.id)} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 16px',
                    background: active ? 'var(--ink)' : 'transparent',
                    color: active ? 'var(--paper)' : 'var(--ink)',
                    border: '2px solid var(--ink)',
                    cursor: 'pointer',
                    fontFamily: 'var(--display)', fontWeight: 700,
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 18, height: 18, border: `2px solid ${active ? 'var(--paper)' : 'var(--ink)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>{active ? '✓' : ''}</span>
                      {e.name}
                    </span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>+₪{e.price}</span>
                  </button>
                );
              })}
            </div>
          </ControlBlock>

          {/* Step 4: Event details */}
          <ControlBlock num="04" title="פרטי האירוע" expanded={true}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
              <Field label="סוג">
                <select value={eventType} onChange={e => setEventType(e.target.value)} style={inputStyle}>
                  {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="מספר אורחים">
                <input type="number" value={guests} onChange={e => setGuests(+e.target.value)} style={inputStyle} />
              </Field>
              <Field label="תאריך"><input type="date" defaultValue="2026-06-15" style={inputStyle} /></Field>
              <Field label="שעה"><input type="time" defaultValue="19:00" style={inputStyle} /></Field>
              <Field label="כתובת" full><input placeholder="רחוב ועיר" style={inputStyle} /></Field>
              <Field label="הערה לשף" full><textarea placeholder="לדוגמה: בלי דובדבנים, יותר אננס" style={{ ...inputStyle, height: 60, resize: 'none' }} /></Field>
            </div>
          </ControlBlock>
        </div>
      </div>

      {/* Sticky bottom summary */}
      <section style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '24px 40px',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
        gap: 24, alignItems: 'center',
      }}>
        <Summary label="גודל" value={`${size} · ${sizeObj.guests}`} />
        <Summary label="פירות" value={fruits.length + ' זנים'} />
        <Summary label="תוספות" value={extras.length ? extras.length + ' פריטים' : 'ללא'} />
        <Summary label="סה״כ" value={`₪${total}`} big />
        <button className="btn primary" style={{ background: accent, padding: '18px 40px' }}>
          המשך לתשלום ←
        </button>
      </section>

      <SiteFooter />
    </div>
  );
}

function StepIndicator({ step }) {
  return (
    <div style={{ display: 'flex', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em' }}>
      {['גודל', 'פירות', 'תוספות', 'אירוע', 'תשלום'].map((s, i) => (
        <div key={i} style={{
          padding: '6px 12px',
          background: i + 1 <= step ? 'var(--ink)' : 'transparent',
          color: i + 1 <= step ? 'var(--paper)' : 'var(--ink)',
          border: '1.5px solid var(--ink)',
          fontWeight: 700,
        }}>{`0${i + 1}`} {s}</div>
      ))}
    </div>
  );
}

function ControlBlock({ num, title, children, expanded = true }) {
  return (
    <div style={{ borderBottom: '1px solid var(--ink)', padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12, opacity: 0.5 }}>{num}</span>
          <h3 className="display" style={{ fontSize: 32, margin: 0 }}>{title}</h3>
        </div>
      </div>
      {expanded && children}
    </div>
  );
}

function Field({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? 'span 2' : 'auto' }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6, marginBottom: 6 }}>{label}</div>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  background: 'transparent',
  border: '2px solid var(--ink)',
  fontFamily: 'var(--display)',
  fontWeight: 600,
  fontSize: 15,
  direction: 'rtl',
};

function Summary({ label, value, big }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: big ? 36 : 20, marginTop: 4, letterSpacing: '-0.02em' }}>{value}</div>
    </div>
  );
}

/* ---------- Live preview drawing ---------- */
function KayakPreview({ size, fruits, extras }) {
  // hash position based on fruit index, deterministic
  const positions = useMemo(() => {
    const w = size.w, h = size.h * 1.4;
    const pts = [];
    const fruitCount = Math.max(8, fruits.length * 4);
    for (let i = 0; i < fruitCount; i++) {
      const t = i / (fruitCount - 1);
      // distribute along ellipse interior
      const angle = (i * 137.5) % 360;
      const r = 0.3 + (i % 5) * 0.1;
      const x = 0.5 + Math.cos(angle * Math.PI / 180) * r * 0.4;
      const y = 0.5 + Math.sin(angle * Math.PI / 180) * r * 0.35;
      pts.push({
        x: x * 100,
        y: y * 100,
        kind: fruits[i % Math.max(fruits.length, 1)] || 'watermelon',
        size: 38 + (i % 3) * 8,
      });
    }
    return pts;
  }, [size.id, fruits.join(',')]);

  return (
    <div style={{
      flex: 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
      padding: '40px 0',
    }}>
      <div style={{
        width: size.w,
        height: size.h * 1.6,
        position: 'relative',
        transition: 'all 400ms var(--easing)',
      }}>
        {/* Outer kayak shape */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#1a1a1a',
          borderRadius: '50% / 50%',
          boxShadow: '0 30px 60px rgba(0,0,0,.25)',
        }} />
        {/* Inner tray */}
        <div style={{
          position: 'absolute', inset: '8% 4%',
          background: 'var(--paper)',
          borderRadius: '50% / 50%',
          overflow: 'hidden',
        }}>
          {fruits.length === 0 && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 12, opacity: 0.4 }}>
              בחרו פירות →
            </div>
          )}
          {positions.map((p, i) => {
            const Comp = FRUIT_ART[p.kind] || WatermelonArt;
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `${p.x}%`, top: `${p.y}%`,
                transform: 'translate(-50%,-50%)',
                transition: 'all 500ms var(--easing)',
              }}>
                <Comp size={p.size} />
              </div>
            );
          })}
        </div>
        {/* Label */}
        <div style={{ position: 'absolute', bottom: -50, left: 20 }}>
          <Sticker color="var(--citrus)" rotate={-4}>פרי לי · {size.id}</Sticker>
        </div>
        {extras.length > 0 && (
          <div style={{ position: 'absolute', top: -30, right: 20 }}>
            <Sticker color="var(--leaf)" rotate={6}>+ {extras.length} תוספות</Sticker>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { KayakConfigurator });

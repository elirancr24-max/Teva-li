/* admin.jsx — פאנל אדמין: לוח בקרה, מוצרים, הזמנות */

function AdminDashboard({ accent = 'var(--watermelon)' }) {
  const [tab, setTab] = useState('dashboard');
  return (
    <div style={{ background: 'var(--paper)', minHeight: 800, display: 'grid', gridTemplateColumns: '240px 1fr', height: '100%' }}>
      <AdminSidebar tab={tab} setTab={setTab} />
      <div style={{ overflow: 'auto' }}>
        {tab === 'dashboard' && <DashboardView accent={accent} />}
        {tab === 'products' && <ProductsView accent={accent} />}
        {tab === 'orders' && <OrdersView accent={accent} />}
        {tab === 'kayaks' && <KayaksView accent={accent} />}
      </div>
    </div>
  );
}

function AdminSidebar({ tab, setTab }) {
  const items = [
    { id: 'dashboard', label: 'לוח בקרה', icon: '◐' },
    { id: 'products', label: 'מוצרים', icon: '◇' },
    { id: 'orders', label: 'הזמנות', icon: '◊' },
    { id: 'kayaks', label: 'קיאקים', icon: '⬡' },
    { id: 'customers', label: 'לקוחות', icon: '○' },
    { id: 'coupons', label: 'קופונים', icon: '✺' },
    { id: 'settings', label: 'הגדרות', icon: '⚙' },
  ];
  return (
    <aside style={{
      background: 'var(--ink)', color: 'var(--paper)',
      padding: '24px 0',
      display: 'flex', flexDirection: 'column',
      borderLeft: '2px solid var(--ink)',
    }}>
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={36} />
          <div>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 18 }}>פרי לי</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', opacity: 0.5 }}>ADMIN</div>
          </div>
        </div>
      </div>
      <nav style={{ padding: '20px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => (
          <button key={it.id} onClick={() => setTab(it.id)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px',
            background: tab === it.id ? 'var(--paper)' : 'transparent',
            color: tab === it.id ? 'var(--ink)' : 'var(--paper)',
            border: 'none',
            fontFamily: 'var(--display)', fontWeight: 700, fontSize: 14,
            textAlign: 'right', cursor: 'pointer',
            borderRadius: 0,
          }}>
            <span style={{ fontSize: 16, opacity: 0.7 }}>{it.icon}</span>
            {it.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: 20, borderTop: '1px solid #333', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, background: 'var(--citrus)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)', fontFamily: 'var(--display)', fontWeight: 900 }}>ל</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>ליאור</div>
          <div style={{ fontSize: 10, opacity: 0.5 }}>בעלים · דימונה</div>
        </div>
      </div>
    </aside>
  );
}

/* ---------- Dashboard ---------- */
function DashboardView({ accent }) {
  return (
    <div>
      <div style={{ padding: '30px 40px 20px', borderBottom: '2px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', opacity: 0.5 }}>06.05.2026 · יום רביעי · 09:42</div>
          <h1 className="display" style={{ fontSize: 64, margin: '10px 0 0' }}>בוקר טוב, ליאור.</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={pillBtnStyle()}>היום</button>
          <button style={pillBtnStyle(true)}>השבוע</button>
          <button style={pillBtnStyle()}>החודש</button>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '2px solid var(--ink)' }}>
        <KPI label="הכנסות השבוע" value="₪14,820" delta="+18%" big bg={accent} />
        <KPI label="הזמנות חדשות" value="47" delta="+6" />
        <KPI label="קיאקים השבוע" value="8" delta="2 מאושרים" />
        <KPI label="מלאי נמוך" value="3" delta="פריטים" warning />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', borderBottom: '2px solid var(--ink)' }}>
        <div style={{ padding: 30, borderLeft: '1px solid var(--ink)' }}>
          <SectionTag num="01" label="מכירות 7 ימים" />
          <SalesChart accent={accent} />
        </div>
        <div style={{ padding: 30 }}>
          <SectionTag num="02" label="מוצרים מובילים" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            {[
              { name: 'אננס קלוף', units: 184, kind: 'pineapple' },
              { name: 'אבטיח חתוך', units: 142, kind: 'watermelon' },
              { name: 'תות שדה', units: 98, kind: 'strawberry' },
              { name: 'סלט מעורב', units: 76, kind: 'kiwi' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, border: '1px solid var(--ink)' }}>
                <div style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Fruit kind={p.kind} size={42} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 16 }}>{p.name}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6 }}>{p.units} יחידות</div>
                </div>
                <div style={{ width: 60, height: 6, background: 'var(--paper-2)' }}>
                  <div style={{ width: `${(p.units / 184) * 100}%`, height: '100%', background: accent }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div style={{ padding: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
          <SectionTag num="03" label="הזמנות אחרונות" />
          <a style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em' }}>הצג הכל →</a>
        </div>
        <RecentOrdersTable />
      </div>
    </div>
  );
}

function pillBtnStyle(active) {
  return {
    padding: '8px 14px',
    background: active ? 'var(--ink)' : 'transparent',
    color: active ? 'var(--paper)' : 'var(--ink)',
    border: '2px solid var(--ink)',
    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
    letterSpacing: '0.06em',
    cursor: 'pointer',
  };
}

function KPI({ label, value, delta, big, bg, warning }) {
  return (
    <div style={{
      padding: '24px 24px',
      borderLeft: '1px solid var(--ink)',
      background: bg || 'transparent',
      color: bg ? 'var(--ink)' : 'var(--ink)',
    }}>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>{label}</div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: big ? 56 : 44, lineHeight: 1, marginTop: 8, letterSpacing: '-0.04em' }}>{value}</div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, marginTop: 8, color: warning ? 'var(--watermelon)' : 'inherit', opacity: warning ? 1 : 0.7 }}>{warning ? '⚠ ' : '↗ '}{delta}</div>
    </div>
  );
}

function SalesChart({ accent }) {
  const data = [820, 1240, 980, 1680, 2100, 2840, 1960];
  const max = Math.max(...data);
  const days = ['ש', 'ו', 'ה', 'ד', 'ג', 'ב', 'א'];
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 220, paddingBottom: 24, borderBottom: '1px solid var(--ink)' }}>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700 }}>₪{v}</div>
            <div style={{
              width: '100%',
              height: `${(v / max) * 160}px`,
              background: i === data.length - 2 ? accent : 'var(--ink)',
              transition: 'all 400ms',
            }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
        {days.map((d, i) => <div key={i} style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6 }}>{d}</div>)}
      </div>
    </div>
  );
}

function RecentOrdersTable() {
  const orders = [
    { id: '#1284', name: 'מירב כהן', items: '4 פריטים', total: 142, status: 'משלוח', type: 'shop' },
    { id: '#1283', name: 'נתנאל לוי · חתונה', items: 'קיאק XL + 3 תוספות', total: 1545, status: 'אישור נדרש', type: 'kayak' },
    { id: '#1282', name: 'תהילה ביטון', items: '2 פריטים', total: 56, status: 'הושלם', type: 'shop' },
    { id: '#1281', name: 'אריאל זנו · בר מצווה', items: 'קיאק M', total: 620, status: 'אושר', type: 'kayak' },
    { id: '#1280', name: 'שרה אביטל', items: '6 פריטים', total: 198, status: 'הושלם', type: 'shop' },
  ];
  return (
    <div style={{ border: '2px solid var(--ink)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1.4fr 100px 140px 60px', padding: '14px 16px', background: 'var(--paper-2)', fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        <div>הזמנה</div><div>לקוח</div><div>פריטים</div><div>סכום</div><div>סטטוס</div><div></div>
      </div>
      {orders.map((o, i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '80px 1fr 1.4fr 100px 140px 60px',
          padding: '16px 16px', alignItems: 'center',
          borderTop: '1px solid var(--ink)',
          fontFamily: 'var(--display)',
        }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, opacity: 0.6 }}>{o.id}</div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>
            {o.type === 'kayak' && <span style={{ background: 'var(--watermelon)', color: 'var(--ink)', fontFamily: 'var(--mono)', fontSize: 9, padding: '2px 6px', marginLeft: 8, fontWeight: 800 }}>קיאק</span>}
            {o.name}
          </div>
          <div style={{ fontSize: 13, opacity: 0.7 }}>{o.items}</div>
          <div style={{ fontWeight: 800, fontSize: 15 }}>₪{o.total}</div>
          <div>
            <StatusBadge status={o.status} />
          </div>
          <div style={{ textAlign: 'left' }}>›</div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    'הושלם': { bg: 'var(--leaf)', fg: 'var(--paper)' },
    'משלוח': { bg: 'var(--citrus)', fg: 'var(--ink)' },
    'אושר': { bg: 'var(--ink)', fg: 'var(--paper)' },
    'אישור נדרש': { bg: 'var(--watermelon)', fg: 'var(--ink)' },
  };
  const c = map[status] || { bg: 'var(--paper-2)', fg: 'var(--ink)' };
  return (
    <span style={{
      display: 'inline-block', padding: '5px 10px',
      background: c.bg, color: c.fg,
      fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
    }}>{status}</span>
  );
}

/* ---------- Products view ---------- */
function ProductsView({ accent }) {
  return (
    <div>
      <div style={{ padding: '30px 40px 20px', borderBottom: '2px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <SectionTag num="—" label="ניהול מלאי · 12 פריטים פעילים" />
          <h1 className="display" style={{ fontSize: 64, margin: '10px 0 0' }}>מוצרים.</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={pillBtnStyle()}>ייבוא CSV</button>
          <button className="btn primary" style={{ background: accent, padding: '12px 20px' }}>+ מוצר חדש</button>
        </div>
      </div>

      <div style={{ padding: '20px 40px', display: 'flex', gap: 12, borderBottom: '2px solid var(--ink)' }}>
        <input placeholder="חיפוש מוצר..." style={{ flex: 1, ...inputStyle, padding: '12px 16px' }} />
        <select style={{ ...inputStyle, padding: '12px 16px', width: 200 }}>
          <option>כל הקטגוריות</option>
          <option>קלופים</option><option>סלטים</option><option>יער</option>
        </select>
        <select style={{ ...inputStyle, padding: '12px 16px', width: 200 }}>
          <option>כל הסטטוסים</option>
          <option>פעיל</option><option>לא פעיל</option><option>מלאי נמוך</option>
        </select>
      </div>

      <div style={{ padding: 40 }}>
        <div style={{ border: '2px solid var(--ink)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 80px 1.4fr 1fr 100px 100px 120px 80px', padding: '14px 16px', background: 'var(--paper-2)', fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', alignItems: 'center' }}>
            <div><input type="checkbox" /></div>
            <div>תמונה</div>
            <div>שם</div>
            <div>קטגוריה</div>
            <div>מחיר</div>
            <div>מלאי</div>
            <div>סטטוס</div>
            <div></div>
          </div>
          {ALL_PRODUCTS.slice(0, 8).map((p, i) => (
            <div key={p.id} style={{
              display: 'grid', gridTemplateColumns: '60px 80px 1.4fr 1fr 100px 100px 120px 80px',
              padding: '12px 16px', alignItems: 'center',
              borderTop: '1px solid var(--ink)',
              fontFamily: 'var(--display)',
            }}>
              <div><input type="checkbox" /></div>
              <div style={{ width: 50, height: 50, background: 'var(--paper-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Fruit kind={p.kind} size={40} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.5 }}>SKU-000{p.id}</div>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>{p.category}</div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>₪{p.price}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: i === 2 ? 'var(--watermelon)' : 'inherit', fontWeight: i === 2 ? 800 : 400 }}>{[24, 18, 4, 32, 16, 12, 28, 21][i]}</div>
              <div><StatusBadge status={i === 2 ? 'אישור נדרש' : 'אושר'} /></div>
              <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                <button style={{ background: 'transparent', border: '1px solid var(--ink)', padding: '4px 8px', fontSize: 11, fontFamily: 'var(--mono)', cursor: 'pointer' }}>ערוך</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add product modal preview */}
      <div style={{ padding: '0 40px 40px' }}>
        <SectionTag num="★" label="טופס הוספה / עריכה" />
        <div style={{ marginTop: 20, border: '2px solid var(--ink)', padding: 30, background: 'var(--paper-2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 20 }}>
            <div style={{ aspectRatio: '1', background: 'var(--paper)', border: '2px dashed var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 24 }}>+</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em' }}>העלה תמונה</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Field label="שם המוצר"><input placeholder="למשל: אננס קלוף" style={inputStyle} defaultValue="אננס קלוף" /></Field>
              <Field label="תיאור"><textarea placeholder="קלוף ביד, חתוך גס" style={{ ...inputStyle, height: 70, resize: 'none' }} defaultValue="קלוף ביד, נחתך לחתיכות נשיכה." /></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="קטגוריה">
                  <select style={inputStyle}><option>קלופים</option></select>
                </Field>
                <Field label="משקל"><input style={inputStyle} defaultValue="500ג׳" /></Field>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="מחיר ₪"><input type="number" defaultValue="24.90" style={inputStyle} /></Field>
                <Field label="מלאי"><input type="number" defaultValue="24" style={inputStyle} /></Field>
              </div>
              <Field label="תגית"><input style={inputStyle} placeholder="הכי נמכר / חדש / מבצע" /></Field>
              <Field label="סטטוס">
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ flex: 1, padding: '12px', background: 'var(--ink)', color: 'var(--paper)', border: '2px solid var(--ink)', fontFamily: 'var(--display)', fontWeight: 700 }}>פעיל</button>
                  <button style={{ flex: 1, padding: '12px', background: 'transparent', color: 'var(--ink)', border: '2px solid var(--ink)', fontFamily: 'var(--display)', fontWeight: 700 }}>טיוטה</button>
                </div>
              </Field>
              <button className="btn primary" style={{ background: accent, marginTop: 8 }}>שמור מוצר</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Orders view ---------- */
function OrdersView({ accent }) {
  return (
    <div>
      <div style={{ padding: '30px 40px 20px', borderBottom: '2px solid var(--ink)' }}>
        <SectionTag num="—" label="כל ההזמנות · 47 פעילות" />
        <h1 className="display" style={{ fontSize: 64, margin: '10px 0 0' }}>הזמנות.</h1>
      </div>
      <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--ink)' }}>
        {['הכל · 47', 'ממתין · 8', 'בהכנה · 12', 'משלוח · 6', 'הושלם · 21'].map((t, i) => (
          <button key={i} style={{
            padding: '18px 24px',
            background: i === 0 ? 'var(--ink)' : 'transparent',
            color: i === 0 ? 'var(--paper)' : 'var(--ink)',
            border: 'none',
            borderLeft: '1px solid var(--ink)',
            fontFamily: 'var(--display)', fontWeight: 700, fontSize: 15,
            cursor: 'pointer',
          }}>{t}</button>
        ))}
      </div>
      <div style={{ padding: 40 }}>
        <RecentOrdersTable />
      </div>
    </div>
  );
}

/* ---------- Kayaks view ---------- */
function KayaksView({ accent }) {
  const kayaks = [
    { id: 'KY-2042', name: 'נתנאל לוי', event: 'חתונה', date: '15.06.2026', size: 'XL', guests: 180, status: 'אישור נדרש', total: 1545 },
    { id: 'KY-2041', name: 'אריאל זנו', event: 'בר מצווה', date: '22.05.2026', size: 'M', guests: 25, status: 'אושר', total: 620 },
    { id: 'KY-2040', name: 'מאי שלום', event: 'יום הולדת', date: '11.05.2026', size: 'L', guests: 40, status: 'בהכנה', total: 980 },
    { id: 'KY-2039', name: 'ערן ביטון', event: 'אירוע עסקי', date: '08.05.2026', size: 'L', guests: 35, status: 'הושלם', total: 1015 },
  ];
  return (
    <div>
      <div style={{ padding: '30px 40px 20px', borderBottom: '2px solid var(--ink)' }}>
        <SectionTag num="—" label="הזמנות אירועים · 8 פעילות" />
        <h1 className="display" style={{ fontSize: 64, margin: '10px 0 0' }}>קיאקים.</h1>
      </div>
      <div style={{ padding: 40, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {kayaks.map(k => (
          <div key={k.id} style={{ border: '2px solid var(--ink)' }}>
            <div style={{ padding: '16px 20px', background: k.status === 'אישור נדרש' ? accent : 'var(--paper-2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--ink)' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6 }}>{k.id}</div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 18 }}>{k.event} · {k.name}</div>
              </div>
              <StatusBadge status={k.status} />
            </div>
            <div style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, borderBottom: '1px solid var(--ink)' }}>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.6, letterSpacing: '0.1em' }}>תאריך</div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 16, marginTop: 4 }}>{k.date}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.6, letterSpacing: '0.1em' }}>גודל / אורחים</div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 16, marginTop: 4 }}>{k.size} · {k.guests}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, opacity: 0.6, letterSpacing: '0.1em' }}>סכום</div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 18, marginTop: 4 }}>₪{k.total}</div>
              </div>
            </div>
            <div style={{ padding: '12px 20px', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              {k.status === 'אישור נדרש' && (
                <>
                  <button style={{ padding: '8px 14px', background: 'var(--leaf)', color: 'var(--paper)', border: 'none', fontFamily: 'var(--display)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>אשר</button>
                  <button style={{ padding: '8px 14px', background: 'transparent', color: 'var(--ink)', border: '1px solid var(--ink)', fontFamily: 'var(--display)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>דחה</button>
                </>
              )}
              <button style={{ padding: '8px 14px', background: 'var(--ink)', color: 'var(--paper)', border: 'none', fontFamily: 'var(--display)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>פרטים מלאים →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { AdminDashboard });

/* shop.jsx — קטלוג + דף מוצר */

const ALL_PRODUCTS = [
  { id: 1, name: 'אננס קלוף', kind: 'pineapple', price: 24.90, weight: '500ג׳', category: 'קלופים', tag: 'הכי נמכר' },
  { id: 2, name: 'אבטיח חתוך', kind: 'watermelon', price: 19.90, weight: '600ג׳', category: 'קלופים' },
  { id: 3, name: 'תות שדה', kind: 'strawberry', price: 29.90, weight: '300ג׳', category: 'יער', tag: 'חדש' },
  { id: 4, name: 'ענבי קונקורד', kind: 'grape', price: 26.90, weight: '400ג׳', category: 'יבשים' },
  { id: 5, name: 'מלון אמבוסיה', kind: 'melon', price: 22.90, weight: '500ג׳', category: 'קלופים' },
  { id: 6, name: 'קיווי זהב', kind: 'kiwi', price: 27.90, weight: '350ג׳', category: 'יער' },
  { id: 7, name: 'סלט פירות מעורב', kind: 'strawberry', price: 34.90, weight: '500ג׳', category: 'סלטים', tag: 'מומלץ' },
  { id: 8, name: 'אוכמניות פרמיום', kind: 'grape', price: 32.90, weight: '250ג׳', category: 'יער' },
  { id: 9, name: 'דובדבנים', kind: 'strawberry', price: 38.90, weight: '300ג׳', category: 'יער' },
  { id: 10, name: 'ענבים ירוקים', kind: 'grape', price: 22.90, weight: '500ג׳', category: 'קלופים' },
  { id: 11, name: 'קוקטייל פירות יער', kind: 'grape', price: 39.90, weight: '400ג׳', category: 'סלטים' },
  { id: 12, name: 'מנגו ישראלי', kind: 'melon', price: 24.90, weight: '450ג׳', category: 'קלופים', tag: 'בעונה' },
];

function ShopPage({ accent = 'var(--watermelon)' }) {
  const [cat, setCat] = useState('הכל');
  const [sort, setSort] = useState('פופולרי');
  const cats = ['הכל', 'קלופים', 'סלטים', 'יער', 'יבשים'];
  const filtered = cat === 'הכל' ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === cat);

  return (
    <div style={{ background: 'var(--paper)' }}>
      <SiteHeader active="shop" />
      <section style={{ padding: '40px 40px 0', borderBottom: '2px solid var(--ink)' }}>
        <SectionTag num="—" label="קטלוג · עודכן 06.05.2026" />
        <h1 className="display" style={{ fontSize: 'clamp(80px, 11vw, 180px)', margin: '20px 0 30px' }}>
          הכל <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>טרי.</span> הכל היום.
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: '10px 18px',
                background: cat === c ? 'var(--ink)' : 'transparent',
                color: cat === c ? 'var(--paper)' : 'var(--ink)',
                border: '2px solid var(--ink)',
                fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
                letterSpacing: '0.06em',
              }}>{c}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 12 }}>
            <span style={{ opacity: 0.6 }}>{filtered.length} פריטים</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              background: 'transparent', border: '2px solid var(--ink)',
              padding: '8px 12px', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700,
            }}>
              <option>פופולרי</option>
              <option>מחיר: עולה</option>
              <option>מחיר: יורד</option>
              <option>חדש קודם</option>
            </select>
          </div>
        </div>
      </section>

      <section style={{ padding: 0, background: 'var(--paper)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '2px solid var(--ink)' }}>
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} cols={4} total={filtered.length} />
          ))}
        </div>
      </section>

      <section style={{ padding: '60px 40px', background: 'var(--paper-2)', borderBottom: '2px solid var(--ink)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <SectionTag num="*" label="לאירועים גדולים?" />
            <h2 className="display" style={{ fontSize: 96, margin: '20px 0' }}>
              עברו ל<span style={{ color: accent }}>קיאקים</span> →
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 20, maxWidth: 460 }}>
              לאירועים מ-8 עד 200 איש. בוחרים גודל ותוכן, מקבלים את הקיאק ביום.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn primary" style={{ background: accent }}>פתח קונפיגורטור →</button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* ---------- Single product page ---------- */

function ProductPage({ accent = 'var(--watermelon)' }) {
  const product = ALL_PRODUCTS[0]; // pineapple
  const [qty, setQty] = useState(1);
  return (
    <div style={{ background: 'var(--paper)' }}>
      <SiteHeader active="shop" />
      <section style={{ padding: '24px 40px', borderBottom: '1px solid var(--ink)', fontFamily: 'var(--mono)', fontSize: 12 }}>
        <span style={{ opacity: 0.5 }}>בית · קטלוג · קלופים ·</span> <strong>{product.name}</strong>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', borderBottom: '2px solid var(--ink)' }}>
        <div style={{
          background: accent,
          padding: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          minHeight: 700,
          borderLeft: '2px solid var(--ink)',
        }}>
          <div style={{ position: 'absolute', top: 30, right: 30 }}>
            <Sticker color="var(--paper)" rotate={-8}>נחתך 06.05 · 06:00</Sticker>
          </div>
          <div style={{ position: 'absolute', bottom: 30, left: 30, fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.6, letterSpacing: '0.16em' }}>SKU · 0001-PA</div>
          <PineappleArt size={400} />
        </div>
        <div style={{ padding: 60, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <SectionTag num="01" label={product.category} />
            <h1 className="display" style={{ fontSize: 120, margin: '20px 0 0', lineHeight: 0.9 }}>{product.name}</h1>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24, marginTop: 20, opacity: 0.7 }}>
              קלוף ביד, נחתך לחתיכות נשיכה, ארוז במקרר.
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--ink)' }}>
              <Spec label="משקל" value={product.weight} />
              <Spec label="טריות" value="היום" />
              <Spec label="ארץ" value="ישראל" />
              <Spec label="קלוריות" value="180/100ג׳" />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: 80 }}>₪{product.price}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 14, opacity: 0.5 }}>/ {product.weight}</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
              <div style={{ display: 'flex', border: '2px solid var(--ink)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'transparent', border: 'none', padding: '0 20px', fontSize: 22, fontWeight: 700 }}>−</button>
                <div style={{ padding: '14px 24px', minWidth: 60, textAlign: 'center', fontFamily: 'var(--display)', fontWeight: 800, fontSize: 22, borderRight: '2px solid var(--ink)', borderLeft: '2px solid var(--ink)' }}>{qty}</div>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'transparent', border: 'none', padding: '0 20px', fontSize: 22, fontWeight: 700 }}>+</button>
              </div>
              <button className="btn primary" style={{ background: accent, flex: 1 }}>הוסף לסל · ₪{(product.price * qty).toFixed(2)}</button>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, marginTop: 16, opacity: 0.6, letterSpacing: '0.06em' }}>
              ✓ משלוח חינם בדימונה · ✓ איסוף עצמי זמין · ✓ הזמנה עד 11:00 = משלוח היום
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '60px 40px', borderBottom: '2px solid var(--ink)' }}>
        <SectionTag num="02" label="קונים אצלנו גם" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginTop: 30, border: '1px solid var(--ink)' }}>
          {ALL_PRODUCTS.slice(1, 5).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} cols={4} total={4} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.5 }}>{label}</div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 22, marginTop: 4 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { ShopPage, ProductPage, ALL_PRODUCTS });

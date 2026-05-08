/* shop.jsx — קטלוג + דף מוצר v2 */

const ALL_PRODUCTS = [
  { id: 1, name: 'אננס קלוף', kind: 'pineapple', price: 24.90, weight: '500ג׳', category: 'קלופים', tag: 'הכי נמכר', rating: 4.9, reviews: 128 },
  { id: 2, name: 'אבטיח חתוך', kind: 'watermelon', price: 19.90, weight: '600ג׳', category: 'קלופים', rating: 4.8, reviews: 89 },
  { id: 3, name: 'תות שדה', kind: 'strawberry', price: 29.90, weight: '300ג׳', category: 'יער', tag: 'חדש', rating: 4.9, reviews: 64 },
  { id: 4, name: 'ענבי קונקורד', kind: 'grape', price: 26.90, weight: '400ג׳', category: 'יבשים', rating: 4.7, reviews: 41 },
  { id: 5, name: 'מלון אמבוסיה', kind: 'melon', price: 22.90, weight: '500ג׳', category: 'קלופים', rating: 4.8, reviews: 73 },
  { id: 6, name: 'קיווי זהב', kind: 'kiwi', price: 27.90, weight: '350ג׳', category: 'יער', rating: 4.6, reviews: 32 },
  { id: 7, name: 'סלט פירות מעורב', kind: 'mixed-salad', price: 34.90, weight: '500ג׳', category: 'סלטים', tag: 'מומלץ', rating: 4.9, reviews: 156 },
  { id: 8, name: 'אוכמניות פרמיום', kind: 'blueberry', price: 32.90, weight: '250ג׳', category: 'יער', rating: 4.8, reviews: 47 },
  { id: 9, name: 'דובדבנים', kind: 'cherry', price: 38.90, weight: '300ג׳', category: 'יער', rating: 4.7, reviews: 38 },
  { id: 10, name: 'ענבים ירוקים', kind: 'green-grape', price: 22.90, weight: '500ג׳', category: 'קלופים', rating: 4.6, reviews: 52 },
  { id: 11, name: 'קוקטייל פירות יער', kind: 'berry-mix', price: 39.90, weight: '400ג׳', category: 'סלטים', rating: 4.9, reviews: 81 },
  { id: 12, name: 'מנגו ישראלי', kind: 'mango', price: 24.90, weight: '450ג׳', category: 'קלופים', tag: 'בעונה', rating: 4.8, reviews: 49 },
];

function ShopPage({ accent = 'var(--watermelon)', compact }) {
  const m = useCompact(compact);
  const [cat, setCat] = useState('הכל');
  const [sort, setSort] = useState('פופולרי');
  const cats = [
    { id: 'הכל', label: 'הכל' },
    { id: 'קלופים', label: 'קלופים' },
    { id: 'סלטים', label: 'סלטי פירות' },
    { id: 'יער', label: 'פירות יער' },
    { id: 'יבשים', label: 'יבשים' },
  ];
  const filtered = cat === 'הכל' ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === cat);

  return (
    <div style={{ background: 'var(--paper)' }}>
      <SiteHeader active="shop" compact={compact} />

      <section style={{
        position: 'relative', overflow: 'hidden',
        borderBottom: '2px solid var(--ink)',
      }}>
        <div className="watermark" style={{
          top: m ? 30 : 50, left: -30,
          fontSize: m ? '160px' : 'clamp(220px, 26vw, 440px)',
          color: 'var(--ink)', opacity: 0.05,
        }}>CATALOG</div>

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: m ? '10px 16px' : '14px 40px',
          borderBottom: '1px solid var(--ink)',
          fontFamily: 'var(--mono)', fontSize: m ? 9 : 11, letterSpacing: '0.16em', textTransform: 'uppercase',
          gap: 10, flexWrap: 'wrap',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span className="pulse-dot" /> נחתך הבוקר
          </span>
          <span>{m ? `${ALL_PRODUCTS.length} פריטים` : `קטלוג #12 · ${ALL_PRODUCTS.length} פריטים`}</span>
          {!m && <span>06.05.2026 · אביב</span>}
        </div>

        <div style={{ position: 'relative', zIndex: 1, padding: m ? '28px 16px 22px' : '50px 40px 32px' }}>
          <SectionTag num="—" label="קטלוג · מתחדש כל בוקר" />
          <div style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : '1.5fr 1fr',
            gap: m ? 18 : 40, alignItems: 'flex-end',
            marginTop: m ? 14 : 22,
          }}>
            <h1 className="display" style={{
              fontSize: m ? 'clamp(60px, 18vw, 100px)' : 'clamp(80px, 11vw, 200px)',
              margin: 0, lineHeight: 0.85, letterSpacing: '-0.06em',
            }}>
              הכל <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: accent }}>טרי.</span>
              <br />
              הכל היום<span style={{ color: accent }}>.</span>
            </h1>
            <div style={{
              padding: m ? '14px 16px' : '20px 24px',
              border: '2px solid var(--ink)',
              boxShadow: m ? '4px 4px 0 var(--ink)' : '6px 6px 0 var(--ink)',
              background: 'var(--paper)',
              fontFamily: 'var(--serif)', fontSize: m ? 14 : 17, lineHeight: 1.5,
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', opacity: 0.6, marginBottom: 8,
              }}>על הקטלוג</div>
              {ALL_PRODUCTS.length} זנים זמינים היום, נחתכו בבוקר. <em style={{ color: accent }}>משלוח חינם בדימונה.</em>
            </div>
          </div>
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          padding: m ? '14px 16px' : '20px 40px',
          borderTop: '1px solid var(--ink)',
          background: 'var(--paper-2)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: m ? 12 : 16,
        }}>
          <div className={m ? 'snap-x' : ''} style={{
            display: 'flex', gap: m ? 6 : 10,
            flexWrap: m ? 'nowrap' : 'wrap',
            overflowX: m ? 'auto' : 'visible',
            paddingBottom: m ? 4 : 0,
            width: m ? '100%' : 'auto',
          }}>
            {cats.map(c => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                style={{
                  background: cat === c.id ? 'var(--ink)' : 'var(--paper)',
                  color: cat === c.id ? 'var(--paper)' : 'var(--ink)',
                  border: '1.5px solid var(--ink)',
                  padding: m ? '8px 14px' : '10px 18px',
                  fontFamily: 'var(--display)', fontWeight: 700, fontSize: m ? 12 : 14,
                  borderRadius: 999,
                  boxShadow: cat === c.id ? '4px 4px 0 var(--ink)' : '3px 3px 0 var(--ink)',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                {c.label}
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 10, marginInlineStart: 6,
                  padding: '2px 6px',
                  background: cat === c.id ? 'rgba(253,251,245,0.18)' : 'var(--paper-2)',
                  borderRadius: 999,
                }}>
                  {c.id === 'הכל' ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p => p.category === c.id).length}
                </span>
              </button>
            ))}
          </div>
          <div style={{
            display: 'flex', gap: m ? 8 : 14, alignItems: 'center',
            fontFamily: 'var(--mono)', fontSize: 12,
            width: m ? '100%' : 'auto', justifyContent: m ? 'space-between' : 'flex-end',
          }}>
            <span style={{
              padding: m ? '6px 10px' : '8px 14px',
              background: 'var(--paper)',
              border: '1.5px solid var(--ink)',
              fontWeight: 700, letterSpacing: '0.06em', fontSize: m ? 11 : 12,
            }}>{filtered.length} פריטים</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                background: 'var(--paper)',
                border: '1.5px solid var(--ink)',
                boxShadow: '3px 3px 0 var(--ink)',
                padding: m ? '8px 10px' : '10px 14px',
                fontFamily: 'var(--mono)', fontSize: m ? 11 : 12, fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <option>פופולרי</option>
              <option>מחיר: עולה</option>
              <option>מחיר: יורד</option>
              <option>חדש קודם</option>
            </select>
          </div>
        </div>
      </section>

      <section style={{
        padding: m ? '32px 16px 50px' : '50px 40px 70px',
        background: 'var(--paper)',
        borderBottom: '2px solid var(--ink)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="watermark" style={{
          bottom: -50, right: -30,
          fontSize: m ? '160px' : 'clamp(180px, 22vw, 360px)',
          color: 'var(--ink)',
        }}>FRESH</div>

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: m ? 12 : 20,
        }}>
          {filtered.map((p) => (
            <CatalogCard key={p.id} product={p} accent={accent} m={m} />
          ))}
        </div>
      </section>

      <section style={{
        padding: m ? '50px 16px' : '90px 40px',
        background: 'var(--paper-2)',
        borderBottom: '2px solid var(--ink)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="watermark" style={{
          top: 30, left: -20,
          fontSize: m ? '140px' : 'clamp(160px, 20vw, 320px)',
          color: 'var(--ink)',
        }}>EVENTS</div>

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '1.3fr 1fr',
          gap: m ? 30 : 50, alignItems: 'center',
        }}>
          <div>
            <SectionTag num="*" label="לאירועים גדולים?" />
            <h2 className="display" style={{
              fontSize: m ? 'clamp(50px, 14vw, 80px)' : 'clamp(60px, 8vw, 120px)',
              margin: m ? '12px 0 0' : '20px 0 0', lineHeight: 0.88, letterSpacing: '-0.05em',
            }}>
              עברו ל<span style={{ color: accent, fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>קיאקים</span>
              <span style={{ color: accent }}>.</span>
            </h2>
            <p style={{ fontFamily: 'var(--serif)', fontSize: m ? 16 : 22, lineHeight: 1.5, maxWidth: 540, marginTop: m ? 14 : 24 }}>
              לאירועים מ-8 עד 200 איש. בוחרים גודל ותוכן, מקבלים את הקיאק <em style={{ color: accent }}>ביום האירוע</em>.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: m ? 18 : 28, flexWrap: 'wrap' }}>
              <button className="btn primary" style={{ background: accent }}>פתח קונפיגורטור →</button>
              <button className="btn outline">ראה דוגמאות</button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: m ? 'center' : 'flex-end' }}>
            <div style={{
              padding: m ? 20 : 28,
              background: 'var(--paper)',
              border: '2px solid var(--ink)',
              boxShadow: m ? '5px 5px 0 var(--ink)' : '8px 8px 0 var(--ink)',
              maxWidth: 360, width: m ? '100%' : 'auto',
            }}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', opacity: 0.6, marginBottom: 12,
              }}>מתחיל מ-</div>
              <div className="display" style={{ fontSize: m ? 50 : 64, lineHeight: 0.9 }}>₪480</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: m ? 14 : 16, marginTop: 10, opacity: 0.8 }}>
                קיאק S · 8–12 אורחים · עד 12 זנים
              </div>
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed rgba(0,0,0,0.2)', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[1,2,3,4].map(i => <Sticker key={i} color={i === 2 ? accent : 'var(--paper-2)'} rotate={(i - 2) * 4}>{['S','M','L','XL'][i-1]}</Sticker>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter compact={compact} />
      {m && <MobileBottomNav active="shop" accent={accent} />}
    </div>
  );
}

function CatalogCard({ product, accent, m }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: m ? '18px 14px 14px' : '28px 26px 22px',
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
        <div style={{ position: 'absolute', top: m ? 8 : 14, right: m ? 8 : 14, zIndex: 2 }}>
          <Sticker color={
            product.tag === 'חדש' ? 'var(--leaf)' :
            product.tag === 'בעונה' ? 'var(--tangerine)' :
            product.tag === 'מומלץ' ? 'var(--citrus)' :
            'var(--watermelon)'
          } rotate={-6}>{product.tag}</Sticker>
        </div>
      )}

      <div style={{
        position: 'absolute', top: m ? 8 : 14, left: m ? 8 : 14,
        fontFamily: 'var(--mono)', fontSize: m ? 8 : 9, opacity: 0.45, letterSpacing: '0.14em',
      }}>#{String(product.id).padStart(4, '0')}</div>

      <div style={{
        height: m ? 130 : 220,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        marginTop: m ? 16 : 12,
      }}>
        <div style={{
          position: 'absolute',
          width: m ? 130 : 200, height: m ? 130 : 200,
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
          <Fruit kind={product.kind} size={m ? 110 : 190} />
        </div>
      </div>

      <div style={{
        fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, letterSpacing: '0.16em',
        textTransform: 'uppercase', opacity: 0.5,
        marginTop: m ? 8 : 10,
      }}>{product.category}</div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginTop: m ? 4 : 6, paddingBottom: m ? 8 : 12, borderBottom: '1px dashed rgba(0,0,0,0.18)',
        gap: 8,
      }}>
        <div className="display" style={{ fontSize: m ? 18 : 26, lineHeight: 1, letterSpacing: '-0.03em' }}>{product.name}</div>
        {!m && <div style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.55, letterSpacing: '0.06em' }}>{product.weight}</div>}
      </div>

      {product.rating && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginTop: m ? 6 : 10,
          fontFamily: 'var(--mono)', fontSize: m ? 10 : 11,
        }}>
          <span style={{ color: accent }}>★</span>
          <strong>{product.rating}</strong>
          {!m && <span style={{ opacity: 0.5 }}>({product.reviews})</span>}
          {m && <span style={{ opacity: 0.5, marginInlineStart: 'auto' }}>{product.weight}</span>}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: m ? 10 : 14, gap: 6 }}>
        <div className="price-tag" style={{
          background: hover ? accent : 'var(--ink)',
          color: hover ? 'var(--ink)' : 'var(--paper)',
          fontSize: m ? 14 : 18,
          padding: m ? '4px 8px' : '6px 12px',
          transition: 'all 240ms',
        }}>₪{product.price}</div>
        <button style={{
          background: hover ? accent : 'var(--ink)',
          color: hover ? 'var(--ink)' : 'var(--paper)',
          border: '2px solid var(--ink)',
          padding: m ? '7px 10px' : '10px 14px',
          fontFamily: 'var(--mono)', fontSize: m ? 11 : 12, fontWeight: 700,
          cursor: 'pointer',
          boxShadow: hover ? '3px 3px 0 var(--ink)' : '0 0 0 var(--ink)',
          transition: 'all 240ms var(--easing)',
          letterSpacing: '0.04em',
        }}>+ סל</button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   PRODUCT PAGE v2 — gallery, halo, reviews, tabs
   ════════════════════════════════════════════ */

function ProductPage({ accent = 'var(--watermelon)', compact }) {
  const m = useCompact(compact);
  const product = ALL_PRODUCTS[0];
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const [activeImg, setActiveImg] = useState(0);

  const tabs = [
    { id: 'description', label: 'תיאור' },
    { id: 'origin', label: 'מקור' },
    { id: 'shipping', label: 'משלוח' },
  ];

  return (
    <div style={{ background: 'var(--paper)' }}>
      <SiteHeader active="shop" compact={compact} />

      <section style={{
        padding: m ? '12px 16px' : '20px 40px',
        borderBottom: '1px solid var(--ink)',
        background: 'var(--paper-2)',
        fontFamily: 'var(--mono)', fontSize: m ? 10 : 12, letterSpacing: '0.06em',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 10, flexWrap: 'wrap',
      }}>
        <div>
          <span style={{ opacity: 0.5 }}>{m ? 'קטלוג ·' : `בית · קטלוג · ${product.category} ·`}</span> <strong style={{ color: accent }}>{product.name}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: 0.7 }}>
          <span className="pulse-dot" /> {m ? 'במלאי' : 'במלאי · נחתך הבוקר'}
        </div>
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: m ? '1fr' : '1.1fr 1fr',
        borderBottom: '2px solid var(--ink)',
        position: 'relative',
      }}>
        <div style={{
          background: accent,
          padding: m ? '32px 20px' : '60px 50px',
          position: 'relative',
          minHeight: m ? 'auto' : 700,
          borderLeft: m ? 'none' : '2px solid var(--ink)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          overflow: 'hidden',
          gap: m ? 18 : 0,
        }}>
          {/* halftone overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(10,10,10,0.1) 1.5px, transparent 1.6px)',
            backgroundSize: '14px 14px',
            pointerEvents: 'none',
          }} />

          <div className="watermark" style={{
            top: 20, right: 20,
            fontSize: m ? '160px' : 'clamp(180px, 22vw, 360px)',
            color: 'var(--ink)', opacity: 0.07,
          }}>0001</div>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            <div className="float-tilt">
              <Sticker color="var(--paper)" rotate={-8}>{m ? 'נחתך 06:00' : 'נחתך 06.05 · 06:00'}</Sticker>
            </div>
            <div style={{
              padding: m ? '6px 10px' : '8px 14px',
              background: 'var(--ink)', color: accent,
              fontFamily: 'var(--mono)', fontSize: m ? 10 : 11, fontWeight: 700, letterSpacing: '0.12em',
              boxShadow: '4px 4px 0 var(--paper)',
            }}>
              ★ {product.rating} · {product.reviews}
            </div>
          </div>

          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: m ? '8px 0' : '20px 0',
            minHeight: m ? 280 : 'auto',
          }}>
            <div style={{
              position: 'absolute',
              width: m ? 260 : 380, height: m ? 260 : 380,
              background: 'radial-gradient(circle, rgba(253,251,245,0.5) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }} />
            <div className="float-y" style={{
              position: 'relative', zIndex: 2,
              filter: 'drop-shadow(8px 12px 0 rgba(0,0,0,0.3))',
            }}>
              <PineappleArt size={m ? 240 : 400} />
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: m ? 6 : 10 }}>
              {[0, 1, 2, 3].map(i => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: m ? 48 : 60, height: m ? 48 : 60,
                    background: 'var(--paper)',
                    border: activeImg === i ? '2px solid var(--ink)' : '1.5px solid rgba(10,10,10,0.3)',
                    boxShadow: activeImg === i ? '3px 3px 0 var(--ink)' : 'none',
                    display: 'grid', placeItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 200ms',
                    transform: activeImg === i ? 'translate(-2px,-2px)' : 'translate(0,0)',
                  }}
                >
                  <PineappleArt size={m ? 34 : 42} />
                </button>
              ))}
            </div>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, opacity: 0.7,
              letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>SKU · 0001-PA</div>
          </div>
        </div>

        <div style={{
          padding: m ? '32px 20px' : '60px 50px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'relative',
          background: 'var(--paper)',
          gap: m ? 28 : 0,
          borderTop: m ? '2px solid var(--ink)' : 'none',
        }}>
          <div className="watermark" style={{
            top: 30, left: 30,
            fontSize: m ? '120px' : 'clamp(140px, 18vw, 280px)',
            color: 'var(--ink)',
          }}>{product.category}</div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <SectionTag num="01" label={product.category} />
            <h1 className="display" style={{
              fontSize: m ? 'clamp(54px, 16vw, 80px)' : 'clamp(70px, 9vw, 130px)',
              margin: m ? '14px 0 0' : '20px 0 0', lineHeight: 0.85, letterSpacing: '-0.05em',
            }}>
              {product.name}<span style={{ color: accent }}>.</span>
            </h1>
            <div style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: m ? 17 : 24, marginTop: m ? 14 : 20, opacity: 0.78, lineHeight: 1.4,
            }}>
              קלוף ביד, נחתך לחתיכות נשיכה, ארוז במקרר. <em style={{ color: accent, fontStyle: 'normal', fontWeight: 700 }}>מוכן לאכילה.</em>
            </div>

            <div style={{ marginTop: m ? 24 : 40 }}>
              <div style={{ display: 'flex', borderBottom: '1.5px solid var(--ink)' }}>
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    style={{
                      padding: m ? '10px 14px' : '14px 22px',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: tab === t.id ? `3px solid ${accent}` : '3px solid transparent',
                      marginBottom: -1.5,
                      fontFamily: 'var(--display)', fontWeight: 800, fontSize: m ? 14 : 16,
                      color: tab === t.id ? 'var(--ink)' : 'rgba(10,10,10,0.5)',
                      cursor: 'pointer',
                      transition: 'all 200ms',
                    }}
                  >{t.label}</button>
                ))}
              </div>
              <div style={{
                padding: m ? '14px 0' : '20px 0',
                fontFamily: 'var(--serif)', fontSize: m ? 14 : 16, lineHeight: 1.6, opacity: 0.85,
              }}>
                {tab === 'description' && (
                  <span>אננס ישראלי שנקטף בבגרות, נקלף ביד, נחתך לחתיכות נשיכה ונארז במקרר. מתוק, עסיסי, בלי נוזלים סוכריים מוספים. מוכן לאכילה ישירות מהקופסה.</span>
                )}
                {tab === 'origin' && (
                  <span>שוק העיר דימונה, ספק קבוע משנת 2018. נקטף בשעה 03:00 ועובר אצלנו במטבח עד 07:30. מקור: מטעים בערבה ובדרום.</span>
                )}
                {tab === 'shipping' && (
                  <span>הזמנה עד 11:00 = משלוח עד 14:00 בדימונה (חינם מעל ₪80). איסוף עצמי זמין מהחנות בכל יום בין 09:00–19:00.</span>
                )}
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: m ? 12 : 16,
              marginTop: m ? 18 : 32, paddingTop: m ? 16 : 24, borderTop: '1px solid var(--ink)',
            }}>
              <Spec label="משקל" value={product.weight} m={m} />
              <Spec label="טריות" value="היום" accent={accent} m={m} />
              <Spec label="ארץ" value="ישראל" m={m} />
              <Spec label="קלוריות" value="180/100ג׳" m={m} />
            </div>
          </div>

          <div style={{
            position: 'relative', zIndex: 1,
            marginTop: m ? 0 : 36, padding: m ? '20px' : '28px',
            background: 'var(--paper-2)',
            border: '2px solid var(--ink)',
            boxShadow: m ? '5px 5px 0 var(--ink)' : '8px 8px 0 var(--ink)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: m ? 8 : 12, marginBottom: m ? 14 : 20, flexWrap: 'wrap' }}>
              <span className="display" style={{ fontSize: m ? 48 : 72, lineHeight: 0.9, letterSpacing: '-0.05em' }}>₪{product.price}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: m ? 12 : 14, opacity: 0.55 }}>/ {product.weight}</span>
              <span style={{
                marginInlineStart: 'auto',
                padding: m ? '4px 10px' : '6px 12px',
                background: accent, color: 'var(--ink)',
                fontFamily: 'var(--mono)', fontSize: m ? 10 : 11, fontWeight: 700, letterSpacing: '0.1em',
                border: '1.5px solid var(--ink)',
              }}>חיסכון 12%</span>
            </div>

            <div style={{ display: 'flex', gap: m ? 8 : 12, alignItems: 'stretch', flexWrap: m ? 'wrap' : 'nowrap' }}>
              <div style={{
                display: 'flex',
                border: '2px solid var(--ink)',
                background: 'var(--paper)',
                boxShadow: '3px 3px 0 var(--ink)',
              }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{
                    background: 'transparent', border: 'none',
                    padding: m ? '0 14px' : '0 18px',
                    fontSize: m ? 20 : 24, fontWeight: 900,
                    fontFamily: 'var(--display)',
                    cursor: 'pointer',
                  }}
                >−</button>
                <div style={{
                  padding: m ? '12px 16px' : '14px 20px', minWidth: m ? 44 : 56, textAlign: 'center',
                  fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 18 : 22,
                  borderRight: '2px solid var(--ink)', borderLeft: '2px solid var(--ink)',
                }}>{qty}</div>
                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    background: 'transparent', border: 'none',
                    padding: m ? '0 14px' : '0 18px',
                    fontSize: m ? 20 : 24, fontWeight: 900,
                    fontFamily: 'var(--display)',
                    cursor: 'pointer',
                  }}
                >+</button>
              </div>
              <button className="btn primary" style={{ background: accent, flex: 1, fontSize: m ? 14 : 16, padding: m ? '14px 18px' : undefined }}>
                {m ? `הוסף · ₪${(product.price * qty).toFixed(2)}` : `הוסף לסל · ₪${(product.price * qty).toFixed(2)}`}
              </button>
            </div>

            <div style={{
              fontFamily: 'var(--mono)', fontSize: m ? 10 : 11,
              marginTop: m ? 14 : 18, paddingTop: m ? 12 : 14, borderTop: '1px dashed rgba(0,0,0,0.2)',
              display: 'flex', flexWrap: 'wrap', gap: m ? 10 : 16,
              letterSpacing: '0.06em', opacity: 0.75,
            }}>
              <span>✓ משלוח חינם</span>
              <span>✓ איסוף עצמי</span>
              <span>✓ עד 11:00</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        padding: m ? '50px 16px' : '80px 40px',
        borderBottom: '2px solid var(--ink)',
        background: 'var(--paper)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="watermark" style={{
          bottom: -40, left: -20,
          fontSize: m ? '140px' : 'clamp(180px, 22vw, 360px)',
          color: 'var(--ink)',
        }}>★★★★★</div>

        <div style={{
          position: 'relative', zIndex: 1, display: 'flex',
          justifyContent: 'space-between', alignItems: m ? 'flex-start' : 'flex-end',
          flexDirection: m ? 'column' : 'row',
          marginBottom: m ? 24 : 40, flexWrap: 'wrap', gap: m ? 14 : 24,
        }}>
          <div>
            <SectionTag num="02" label="מה אומרים על המוצר" />
            <h2 className="display" style={{
              fontSize: m ? 'clamp(46px, 12vw, 70px)' : 'clamp(50px, 7vw, 100px)',
              margin: m ? '12px 0 0' : '18px 0 0', lineHeight: 0.9, letterSpacing: '-0.05em',
            }}>
              {product.reviews} <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: accent }}>ביקורות</span>
            </h2>
          </div>
          <div style={{
            padding: m ? '14px 18px' : '20px 26px',
            background: accent, color: 'var(--ink)',
            border: '2px solid var(--ink)',
            boxShadow: m ? '4px 4px 0 var(--ink)' : '6px 6px 0 var(--ink)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            alignSelf: m ? 'stretch' : 'auto',
          }}>
            <div style={{ fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 36 : 48, letterSpacing: '-0.04em', lineHeight: 1 }}>{product.rating}</div>
            <div style={{ display: 'flex', gap: 2, fontSize: m ? 12 : 14 }}>★★★★★</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{product.reviews} ביקורות</div>
          </div>
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
          gap: m ? 16 : 20,
        }}>
          {[
            { q: 'הכי טעים שאכלתי. מתוק בלי שהוסיפו סוכר. הילדים מתים על זה.', a: 'מירב', r: '4 ימים', stars: 5 },
            { q: 'אננס ענק ויפה, חתיכות אחידות, מקרר עד שמגיעים. שווה כל שקל.', a: 'אבי', r: 'שבוע', stars: 5 },
            { q: 'הזמנתי 3 קופסאות לעבודה — נגמרו תוך שעה. אזמין עוד.', a: 'תהילה', r: '2 שבועות', stars: 5 },
          ].map((r, i) => <ReviewCard key={i} review={r} accent={accent} idx={i} m={m} />)}
        </div>
      </section>

      <section style={{
        padding: m ? '50px 16px' : '80px 40px',
        borderBottom: '2px solid var(--ink)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="watermark" style={{
          top: 30, right: -30,
          fontSize: m ? '140px' : 'clamp(160px, 20vw, 320px)',
          color: 'var(--ink)',
        }}>MORE</div>

        <div style={{
          position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between',
          alignItems: m ? 'flex-start' : 'flex-end',
          flexDirection: m ? 'column' : 'row',
          marginBottom: m ? 22 : 30, flexWrap: 'wrap', gap: m ? 10 : 16,
        }}>
          <div>
            <SectionTag num="03" label="קונים אצלנו גם" />
            <h2 className="display" style={{
              fontSize: m ? 'clamp(46px, 12vw, 70px)' : 'clamp(50px, 7vw, 100px)',
              margin: m ? '10px 0 0' : '16px 0 0', lineHeight: 0.9, letterSpacing: '-0.05em',
            }}>
              ימשיך טוב<span style={{ color: accent }}>.</span>
            </h2>
          </div>
          {!m && (
            <a style={{
              fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', textDecoration: 'underline', textUnderlineOffset: 4,
            }}>כל הקטלוג ↘</a>
          )}
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: m ? 12 : 20,
        }}>
          {ALL_PRODUCTS.slice(1, 5).map((p) => (
            <CatalogCard key={p.id} product={p} accent={accent} m={m} />
          ))}
        </div>
      </section>

      <SiteFooter compact={compact} />
      {m && <MobileBuyBar price={product.price} weight={product.weight} qty={qty} accent={accent} />}
      {m && <MobileBottomNav active="cart" accent={accent} />}
    </div>
  );
}

function ReviewCard({ review, accent, idx, m }) {
  const [hover, setHover] = React.useState(false);
  const tilt = idx % 2 === 0 ? -0.6 : 0.6;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: m ? '20px 18px 16px' : '28px 26px 22px',
        background: 'var(--paper)',
        border: '1.5px solid var(--ink)',
        position: 'relative',
        transition: 'all 260ms var(--easing)',
        transform: hover ? 'translate(-3px, -3px) rotate(0deg)' : `translate(0,0) rotate(${tilt}deg)`,
        boxShadow: hover ? '8px 8px 0 var(--ink)' : '4px 4px 0 var(--ink)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: m ? 10 : 12 }}>
        <div style={{ display: 'flex', gap: 3, color: accent, fontSize: m ? 12 : 14 }}>
          {Array.from({ length: review.stars }).map((_, i) => <span key={i}>★</span>)}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, opacity: 0.5, letterSpacing: '0.14em' }}>{review.r}</div>
      </div>

      <div style={{ fontFamily: 'var(--serif)', fontSize: m ? 15 : 18, lineHeight: 1.5 }}>"{review.q}"</div>

      <div style={{
        marginTop: m ? 14 : 18, paddingTop: m ? 12 : 14, borderTop: '1px dashed rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: m ? 28 : 32, height: m ? 28 : 32, background: accent,
          border: '1.5px solid var(--ink)',
          borderRadius: '50%',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--display)', fontWeight: 900, fontSize: m ? 11 : 13,
        }}>{review.a[0]}</div>
        <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: m ? 13 : 14 }}>{review.a}</div>
      </div>
    </div>
  );
}

function Spec({ label, value, accent, m }) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--mono)', fontSize: m ? 9 : 10, letterSpacing: '0.16em',
        textTransform: 'uppercase', opacity: 0.5,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--display)', fontWeight: 800, fontSize: m ? 17 : 22, marginTop: 4,
        color: accent || 'var(--ink)',
      }}>{value}</div>
    </div>
  );
}

Object.assign(window, { ShopPage, ProductPage, ALL_PRODUCTS, CatalogCard });

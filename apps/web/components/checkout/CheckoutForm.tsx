'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCompact } from '@/hooks/use-compact';
import { useCart } from '@/store/cart';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SectionTag } from '@/components/brand/SectionTag';
import { PriceTag } from '@/components/brand/PriceTag';
import { MobileBottomNav } from '@/components/mobile/MobileBottomNav';
import { formatPrice } from '@/lib/utils';
import { createCheckoutIntent } from '@/app/checkout/actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const DELIVERY_FEE = 2500;

// ─── Inner payment form (needs Elements context) ──────────────────────────────
function PaymentStep({ orderId, onBack }: { orderId: string; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const clear = useCart((s) => s.clear);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success?order=${orderId}` },
    });
    if (stripeError) {
      setError(stripeError.message ?? 'שגיאה בתשלום');
      setLoading(false);
    } else {
      clear();
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <PaymentElement />
      {error && (
        <div style={{ padding: '10px 14px', background: 'rgba(201,24,74,0.08)', border: '1.5px solid var(--watermelon)', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--watermelon)' }}>
          {error}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={onBack}
          style={{ padding: '12px 20px', background: 'none', border: '1.5px solid var(--ink)', fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          ← חזרה
        </button>
        <button
          onClick={handlePay}
          disabled={loading || !stripe}
          style={{
            flex: 1,
            padding: '14px',
            background: loading ? 'rgba(0,0,0,0.5)' : 'var(--ink)',
            color: 'var(--paper)',
            border: '2px solid var(--ink)',
            fontFamily: 'var(--mono)',
            fontSize: 14,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '5px 5px 0 var(--watermelon)',
            letterSpacing: '0.06em',
            transition: 'all 200ms',
          }}
        >
          {loading ? 'מעבד...' : 'שלם עכשיו →'}
        </button>
      </div>
    </div>
  );
}

// ─── Main checkout form ───────────────────────────────────────────────────────
export function CheckoutForm() {
  const m = useCompact();
  const { items, totalCents, itemCount } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    address: '', city: '',
    deliveryDate: '', deliveryWindow: 'בוקר (08:00–12:00)',
    notes: '',
  });

  const subtotal = totalCents();
  const delivery = form.city === 'דימונה' ? 0 : subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  function setField(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) { router.push('/shop'); return; }
    setLoading(true);
    setError(null);

    const result = await createCheckoutIntent({
      ...form,
      items: items.map((i) => ({
        product_id: i.product_id,
        qty: i.qty,
        price_cents: i.price_cents,
        name_he: i.name_he,
        weight: i.weight,
        kind: i.kind,
      })),
    });

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setClientSecret(result.clientSecret);
    setOrderId(result.orderId);
    setStep('payment');
    setLoading(false);
  }

  useEffect(() => {
    if (items.length === 0) router.push('/cart');
  }, [items.length, router]);

  if (items.length === 0) return null;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '1.5px solid var(--ink)',
    background: 'var(--paper)',
    fontFamily: 'var(--serif)',
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--mono)',
    fontSize: 11,
    letterSpacing: '0.08em',
    opacity: 0.55,
    display: 'block',
    marginBottom: 6,
    textTransform: 'uppercase',
  };

  return (
    <div style={{ background: 'var(--paper)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader active="shop" />

      <main style={{ flex: 1, maxWidth: 1100, margin: '0 auto', width: '100%', padding: m ? '70px 20px 120px' : '100px clamp(20px,5vw,60px) 80px' }}>
        <SectionTag num="03" label="תשלום" />
        <h1 className="display" style={{ fontSize: m ? 52 : 96, lineHeight: 0.85, letterSpacing: '-0.05em', margin: '12px 0 32px' }}>
          {step === 'form' ? 'פרטי משלוח' : 'תשלום'}<span style={{ color: 'var(--watermelon)' }}>.</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 340px', gap: m ? 24 : 40, alignItems: 'start' }}>
          {/* Form or payment step */}
          <div>
            {step === 'form' ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>שם מלא *</label>
                    <input required style={inputStyle} value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="ישראל ישראלי" />
                  </div>
                  <div>
                    <label style={labelStyle}>טלפון *</label>
                    <input required type="tel" style={inputStyle} value={form.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="050-0000000" dir="ltr" />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>אימייל *</label>
                  <input required type="email" style={inputStyle} value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="name@example.com" dir="ltr" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '2fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>רחוב ומספר *</label>
                    <input required style={inputStyle} value={form.address} onChange={(e) => setField('address', e.target.value)} placeholder="הרצל 12" />
                  </div>
                  <div>
                    <label style={labelStyle}>עיר *</label>
                    <input required style={inputStyle} value={form.city} onChange={(e) => setField('city', e.target.value)} placeholder="דימונה" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>תאריך משלוח *</label>
                    <input required type="date" style={inputStyle} value={form.deliveryDate} onChange={(e) => setField('deliveryDate', e.target.value)} dir="ltr" min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label style={labelStyle}>חלון זמן</label>
                    <select style={inputStyle} value={form.deliveryWindow} onChange={(e) => setField('deliveryWindow', e.target.value)}>
                      <option>בוקר (08:00–12:00)</option>
                      <option>צהריים (12:00–16:00)</option>
                      <option>ערב (16:00–20:00)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>הערות (אופציונלי)</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} value={form.notes} onChange={(e) => setField('notes', e.target.value)} placeholder="הוראות מיוחדות, קוד לבניין..." />
                </div>

                {error && (
                  <div style={{ padding: '10px 14px', background: 'rgba(201,24,74,0.08)', border: '1.5px solid var(--watermelon)', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--watermelon)' }}>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '16px',
                    background: loading ? 'rgba(0,0,0,0.5)' : 'var(--ink)',
                    color: 'var(--paper)',
                    border: '2px solid var(--ink)',
                    fontFamily: 'var(--mono)',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    boxShadow: loading ? 'none' : '5px 5px 0 var(--watermelon)',
                    letterSpacing: '0.06em',
                    transition: 'all 200ms',
                  }}
                >
                  {loading ? 'שולח...' : 'המשך לתשלום →'}
                </button>
              </form>
            ) : (
              clientSecret && orderId && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: 'flat',
                      variables: {
                        colorPrimary: '#0a0a0a',
                        colorBackground: '#fdfbf5',
                        fontFamily: 'Assistant, sans-serif',
                        borderRadius: '0px',
                      },
                    },
                  }}
                >
                  <PaymentStep orderId={orderId} onBack={() => setStep('form')} />
                </Elements>
              )
            )}
          </div>

          {/* Order summary sidebar */}
          <div style={{ border: '2px solid var(--ink)', padding: m ? '20px' : '28px', boxShadow: '6px 6px 0 var(--ink)', position: m ? 'static' : 'sticky', top: 100 }}>
            <h2 className="display" style={{ fontSize: 28, letterSpacing: '-0.04em', marginBottom: 16 }}>
              ההזמנה שלך
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16, borderBottom: '1px dashed rgba(0,0,0,0.18)', paddingBottom: 16 }}>
              {items.map((i) => (
                <div key={i.product_id} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 12 }}>
                  <span style={{ opacity: 0.7 }}>{i.name_he} ×{i.qty}</span>
                  <span style={{ fontWeight: 700 }}>{formatPrice(i.price_cents * i.qty)}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 12, marginBottom: 8 }}>
              <span style={{ opacity: 0.6 }}>משלוח</span>
              <span style={{ fontWeight: 700, color: 'var(--leaf)' }}>{delivery === 0 ? 'חינם' : formatPrice(delivery)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span className="display" style={{ fontSize: 18 }}>סה"כ</span>
              <PriceTag variant="accent" size={20} style={{ padding: '5px 12px' }}>{formatPrice(total)}</PriceTag>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
      {m && <MobileBottomNav active="cart" />}
    </div>
  );
}

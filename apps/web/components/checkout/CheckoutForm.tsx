'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  Paper,
  Alert,
  Divider,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearCart } from '@/store/slices/cartSlice';
import { createCheckoutIntent } from '@/app/checkout/actions';
import { BRAND } from '@/lib/brand';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const DELIVERY_FEE = 2500;

function PaymentStep({ orderId, onBack }: { orderId: string; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
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
      dispatch(clearCart());
    }
  }

  return (
    <Stack spacing={2}>
      <PaymentElement />
      {error && <Alert severity="error">{error}</Alert>}
      <Stack direction="row" spacing={2}>
        <Button onClick={onBack} variant="outlined" disabled={loading}>
          חזרה
        </Button>
        <Button
          onClick={handlePay}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{ flex: 1 }}
        >
          {loading ? 'מעבד…' : 'שלם'}
        </Button>
      </Stack>
    </Stack>
  );
}

export function CheckoutForm() {
  const router = useRouter();
  const items = useAppSelector((s) => s.cart.items);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.priceCents * i.amount, 0),
    [items],
  );

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'דימונה',
    deliveryDate: '',
    deliveryWindow: '09:00-12:00',
    notes: '',
  });
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const delivery = form.city === 'דימונה' ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const formatPrice = (cents: number) => `₪${(cents / 100).toFixed(2)}`;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError('הסל ריק');
      return;
    }
    setSubmitting(true);

    const result = await createCheckoutIntent({
      ...form,
      items: items.map((i) => ({
        product_id: i.productId,
        qty: Math.max(1, Math.round(i.amount)),
        price_cents: i.product.priceCents,
        name_he: i.product.name,
        weight: i.product.weight ?? '',
        kind: i.product.kind,
      })),
    });
    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }
    setClientSecret(result.clientSecret);
    setOrderId(result.orderId);
    setStep('payment');
  }

  if (items.length === 0 && step === 'form') {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ py: 6, textAlign: 'center', minHeight: '60vh' }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            הסל ריק
          </Typography>
          <Button variant="contained" size="large" onClick={() => router.push('/shop')}>
            לקטלוג
          </Button>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 }, minHeight: '60vh' }}>
        <Typography variant="h1" sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 800, mb: { xs: 2, md: 3 }, textAlign: { xs: 'center', md: 'right' } }}>
          תשלום
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="flex-start">
          <Paper sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
            {step === 'form' ? (
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <Typography variant="h2" sx={{ fontSize: 18, fontWeight: 700 }}>
                    פרטי הלקוח
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      name="name"
                      label="שם מלא"
                      value={form.name}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="phone"
                      label="טלפון"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </Stack>
                  <TextField
                    name="email"
                    label="דוא״ל"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    fullWidth
                  />

                  <Typography variant="h2" sx={{ fontSize: 18, fontWeight: 700, pt: 2 }}>
                    כתובת משלוח
                  </Typography>
                  <TextField
                    name="address"
                    label="כתובת"
                    value={form.address}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      name="city"
                      label="עיר"
                      value={form.city}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="deliveryDate"
                      label="תאריך משלוח"
                      type="date"
                      value={form.deliveryDate}
                      onChange={handleChange}
                      required
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                  <TextField
                    name="deliveryWindow"
                    label="חלון שעות"
                    select
                    value={form.deliveryWindow}
                    onChange={handleChange}
                    fullWidth
                  >
                    <MenuItem value="09:00-12:00">09:00–12:00</MenuItem>
                    <MenuItem value="12:00-15:00">12:00–15:00</MenuItem>
                    <MenuItem value="15:00-18:00">15:00–18:00</MenuItem>
                  </TextField>
                  <TextField
                    name="notes"
                    label="הערות (לא חובה)"
                    value={form.notes}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    fullWidth
                  />

                  {error && <Alert severity="error">{error}</Alert>}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={submitting}
                    startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : null}
                  >
                    {submitting ? 'יוצר הזמנה…' : 'המשך לתשלום'}
                  </Button>
                </Stack>
              </Box>
            ) : clientSecret && orderId ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  locale: 'he',
                  appearance: {
                    theme: 'stripe',
                    variables: { colorPrimary: BRAND.green, fontFamily: 'Rubik, system-ui' },
                  },
                }}
              >
                <PaymentStep orderId={orderId} onBack={() => setStep('form')} />
              </Elements>
            ) : null}
          </Paper>

          <Paper sx={{ width: { xs: '100%', md: 320 }, p: { xs: 2, md: 3 }, height: 'fit-content' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 700, mb: 2 }}>הזמנתך</Typography>
            <Stack spacing={1}>
              {items.map((i) => (
                <Stack key={i.productId} direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 13 }}>
                    {i.product.name} × {i.amount}
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                    {formatPrice(i.product.priceCents * i.amount)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: 13 }}>סכום ביניים</Typography>
              <Typography sx={{ fontSize: 13 }}>{formatPrice(subtotal)}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: 13 }}>משלוח</Typography>
              <Typography sx={{ fontSize: 13, color: delivery === 0 ? BRAND.green : undefined, fontWeight: 700 }}>
                {delivery === 0 ? 'חינם' : formatPrice(delivery)}
              </Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontWeight: 700 }}>סה״כ</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: 18, color: BRAND.green }}>
                {formatPrice(total)}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAppDispatch, useAppSelector } from '@/store';
import { clearCart } from '@/store/slices/cartSlice';
import { createWhatsAppOrder } from '@/app/checkout/actions';
import { BRAND } from '@/lib/brand';

const DELIVERY_FEE = 2500;

export function CheckoutForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
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

    const result = await createWhatsAppOrder({
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

    if (!result.success) {
      setSubmitting(false);
      setError(result.error);
      return;
    }

    // Clear cart, navigate to success page, then open WhatsApp.
    dispatch(clearCart());
    const successUrl = `/checkout/success?order=${result.orderId}`;
    // Open WhatsApp in a new tab so the success page still loads.
    if (typeof window !== 'undefined') {
      window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
    }
    router.push(successUrl);
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <Container maxWidth="md" sx={{ py: 6, textAlign: 'center', minHeight: '60vh' }}>
          <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: 24, md: 32 } }}>
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
          סיום הזמנה
        </Typography>

        <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={3} alignItems="flex-start">
          <Paper sx={{ flex: 1, p: { xs: 2, md: 4 }, width: '100%' }}>
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
                  label="דוא״ל (לא חובה)"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
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

                {/* Payment methods */}
                <Box
                  sx={{
                    border: `1px solid rgba(0,0,0,0.12)`,
                    borderRadius: 2,
                    p: 2,
                    bgcolor: 'grey.50',
                  }}
                >
                  <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                    אמצעי תשלום מקובלים
                  </Typography>
                  <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" gap={1}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, bgcolor: '#fff', border: '1px solid #eee', borderRadius: 1.5, px: 1.5, py: 0.75 }}>
                      <Box component="span" sx={{ fontSize: 18 }}>💙</Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 700 }}>ביט</Typography>
                    </Box>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, bgcolor: '#fff', border: '1px solid #eee', borderRadius: 1.5, px: 1.5, py: 0.75 }}>
                      <Box component="span" sx={{ fontSize: 18 }}>🏦</Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 700 }}>העברה בנקאית</Typography>
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: 11, color: 'text.secondary', mt: 1 }}>
                    תשלום מאובטח לאחר אישור ההזמנה בוואטסאפ
                  </Typography>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={submitting}
                  startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <WhatsAppIcon />}
                  sx={{
                    bgcolor: BRAND.green,
                    py: 1.75,
                    fontSize: 16,
                    fontWeight: 800,
                    '&:hover': { bgcolor: BRAND.greenDark },
                  }}
                >
                  {submitting ? 'שולח…' : 'שליחת הזמנה ב‑WhatsApp'}
                </Button>
              </Stack>
            </Box>
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

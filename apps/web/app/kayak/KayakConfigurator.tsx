'use client';
import { useMemo, useState, useTransition } from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  Paper,
  Alert,
  Chip,
  MenuItem,
  CircularProgress,
  Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { BRAND } from '@/lib/brand';
import { submitKayakOrder, type KayakSubmitInput } from './actions';
import { SuccessView } from './SuccessView';

export type SizeRow = {
  id: string;
  label: string;
  guests: string;
  price_cents: number;
};

const FRUIT_OPTIONS = [
  'אבטיח',
  'אננס',
  'מנגו',
  'תות שדה',
  'ענבים',
  'קיווי',
  'תפוז',
  'אפרסק',
  'דובדבן',
  'אגס',
  'תפוח',
  'רימון',
  'ליצי',
  'פיטאיה',
];

const DEFAULT_FRUITS = FRUIT_OPTIONS.slice(0, 6);

const EXTRA_OPTIONS = [
  { label: 'שוקולד בלגי', priceCents: 5000 },
  { label: 'אגוזים', priceCents: 4000 },
  { label: 'סושי פירות', priceCents: 8000 },
  { label: 'אריזת מתנה', priceCents: 3000 },
];

const EVENT_TYPES = [
  'חתונה',
  'בר מצווה',
  'בת מצווה',
  'יום הולדת',
  'אירוע עסקי',
  'אחר',
];

function shekel(cents: number): string {
  return `₪${(cents / 100).toLocaleString('he-IL')}`;
}

function parseGuestsMin(guestsLabel: string): number {
  // "8-12 אורחים" → 8, "50+ אורחים" → 50
  const m = guestsLabel.match(/(\d+)/);
  return m ? Number(m[1]) : 1;
}

// Returns YYYY-MM-DD for today + N days, in local time.
function todayPlusDays(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

type Props = {
  sizes: SizeRow[];
};

export function KayakConfigurator({ sizes }: Props) {
  const [selectedSizeId, setSelectedSizeId] = useState<string>(sizes[0]?.id ?? '');
  const [selectedFruits, setSelectedFruits] = useState<string[]>(DEFAULT_FRUITS);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [eventType, setEventType] = useState<string>(EVENT_TYPES[0]);
  const [eventDate, setEventDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(parseGuestsMin(sizes[0]?.guests ?? '8'));
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedSize = useMemo(
    () => sizes.find((s) => s.id === selectedSizeId) ?? null,
    [sizes, selectedSizeId],
  );

  const minEventDate = todayPlusDays(3);

  const total = useMemo(() => {
    const sizeCents = selectedSize?.price_cents ?? 0;
    const extrasCents = selectedExtras.reduce((sum, label) => {
      const found = EXTRA_OPTIONS.find((e) => e.label === label);
      return sum + (found?.priceCents ?? 0);
    }, 0);
    return sizeCents + extrasCents;
  }, [selectedSize, selectedExtras]);

  function toggleFruit(f: string) {
    setSelectedFruits((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  }

  function toggleExtra(label: string) {
    setSelectedExtras((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label],
    );
  }

  function pickSize(id: string) {
    setSelectedSizeId(id);
    const s = sizes.find((x) => x.id === id);
    if (s) setGuests(parseGuestsMin(s.guests));
  }

  function handleSubmit() {
    setError(null);

    // Client-side validation for clearer errors
    if (!selectedSizeId) return setError('יש לבחור גודל קיאק');
    if (selectedFruits.length === 0) return setError('יש לבחור לפחות פרי אחד');
    if (!eventDate) return setError('יש להזין תאריך אירוע');
    if (eventDate < minEventDate)
      return setError('תאריך האירוע חייב להיות לפחות 3 ימים מהיום');
    if (!deliveryAddress.trim()) return setError('יש להזין כתובת אספקה');
    if (!name.trim()) return setError('יש להזין שם');
    if (!phone.trim() || phone.trim().length < 9)
      return setError('יש להזין מספר טלפון תקין');
    if (!guests || guests < 1) return setError('מספר אורחים לא תקין');

    const payload: KayakSubmitInput = {
      size_id: selectedSizeId,
      fruits: selectedFruits,
      extras: selectedExtras,
      event_type: eventType,
      event_date: eventDate,
      guests,
      delivery_address: deliveryAddress.trim(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      notes: notes.trim() || undefined,
    };

    startTransition(async () => {
      const result = await submitKayakOrder(payload);
      if (result.success) {
        setOrderId(result.orderId);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        setError(result.error);
      }
    });
  }

  if (orderId) {
    return <SuccessView orderId={orderId} />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Hero */}
      <Stack spacing={1.5} sx={{ mb: { xs: 5, md: 8 } }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 12,
            letterSpacing: '0.22em',
            color: BRAND.green,
          }}
        >
          / קונפיגורטור · CONFIGURATOR
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 44, md: 80 },
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: BRAND.ink,
          }}
        >
          קיאקי פירות.
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 18, md: 24 },
            color: 'text.secondary',
            maxWidth: 640,
            fontWeight: 500,
          }}
        >
          החוויה הקולינרית לאירוע שלך.
        </Typography>
      </Stack>

      {/* STEP 01 — Size */}
      <Section number="01" label="בחירת גודל / SIZE">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 2,
          }}
        >
          {sizes.map((s) => {
            const selected = s.id === selectedSizeId;
            return (
              <Box key={s.id}>
                <Paper
                  onClick={() => pickSize(s.id)}
                  elevation={0}
                  sx={{
                    cursor: 'pointer',
                    p: { xs: 2, md: 3 },
                    border: `2px solid ${selected ? BRAND.green : BRAND.ink}`,
                    borderRadius: 2,
                    bgcolor: selected ? BRAND.greenLight : BRAND.paper,
                    position: 'relative',
                    transition: 'transform 120ms ease, box-shadow 120ms ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 0 -2px rgba(0,0,0,0.18)',
                    },
                    minHeight: 160,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {selected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 10,
                        insetInlineStart: 10,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: BRAND.green,
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CheckIcon sx={{ fontSize: 18 }} />
                    </Box>
                  )}
                  <Stack spacing={0.5}>
                    <Typography
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: 11,
                        letterSpacing: '0.2em',
                        color: 'text.secondary',
                      }}
                    >
                      {s.id}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 800 }}>
                      {s.label}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                      {s.guests}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: { xs: 18, md: 22 },
                      fontWeight: 800,
                      color: BRAND.ink,
                      mt: 2,
                    }}
                  >
                    {shekel(s.price_cents)}
                  </Typography>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </Section>

      {/* STEP 02 — Fruits */}
      <Section number="02" label="בחירת פירות / FRUITS">
        <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>
          סמנו את הפירות שתרצו על הקיאק. ניתן לבחור כמה שרוצים.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {FRUIT_OPTIONS.map((f) => {
            const on = selectedFruits.includes(f);
            return (
              <Chip
                key={f}
                label={f}
                onClick={() => toggleFruit(f)}
                clickable
                sx={{
                  px: 1.5,
                  py: 2.5,
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: '999px',
                  border: `2px solid ${on ? BRAND.green : BRAND.ink}`,
                  bgcolor: on ? BRAND.green : 'transparent',
                  color: on ? '#fff' : BRAND.ink,
                  '&:hover': {
                    bgcolor: on ? BRAND.greenDark : BRAND.cream,
                  },
                }}
              />
            );
          })}
        </Box>
      </Section>

      {/* STEP 03 — Extras */}
      <Section number="03" label="תוספות / EXTRAS">
        <Typography sx={{ color: 'text.secondary', fontSize: 14, mb: 2 }}>
          תוספות הגשה והעשרה (אופציונלי).
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {EXTRA_OPTIONS.map((e) => {
            const display = `${e.label} + ${shekel(e.priceCents)}`;
            const on = selectedExtras.includes(display);
            return (
              <Chip
                key={e.label}
                label={display}
                onClick={() => toggleExtra(display)}
                clickable
                sx={{
                  px: 1.5,
                  py: 2.5,
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: '999px',
                  border: `2px solid ${on ? BRAND.green : BRAND.ink}`,
                  bgcolor: on ? BRAND.green : 'transparent',
                  color: on ? '#fff' : BRAND.ink,
                  '&:hover': {
                    bgcolor: on ? BRAND.greenDark : BRAND.cream,
                  },
                }}
              />
            );
          })}
        </Box>
      </Section>

      {/* STEP 04 — Event details */}
      <Section number="04" label="פרטי האירוע / EVENT">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          <TextField
            select
            fullWidth
            label="סוג האירוע"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            {EVENT_TYPES.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            required
            type="date"
            label="תאריך האירוע"
            InputLabelProps={{ shrink: true }}
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            inputProps={{ min: minEventDate }}
            helperText="לפחות 3 ימים מהיום"
          />
          <TextField
            fullWidth
            type="number"
            label="מספר אורחים"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value) || 0)}
            inputProps={{ min: 1 }}
          />
          <TextField
            fullWidth
            required
            label="כתובת אספקה"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="רחוב, מספר, עיר"
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            fullWidth
            required
            label="שם מלא"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            required
            label="טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="050-1234567"
          />
          <TextField
            fullWidth
            label="אימייל (אופציונלי)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="הערות (אופציונלי)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="העדפות מיוחדות, אלרגיות, צבעים…"
          />
        </Box>
      </Section>

      {/* STEP 05 — Summary */}
      <Section number="05" label="סיכום ושליחה / SUBMIT">
        <Paper
          elevation={0}
          sx={{
            border: `2px solid ${BRAND.ink}`,
            borderRadius: 2,
            p: { xs: 2.5, md: 4 },
            bgcolor: BRAND.cream,
          }}
        >
          <Stack spacing={2}>
            <SummaryRow
              label="גודל"
              value={selectedSize ? `${selectedSize.label} (${selectedSize.guests})` : '—'}
              price={selectedSize ? shekel(selectedSize.price_cents) : undefined}
            />
            <SummaryRow
              label="פירות"
              value={selectedFruits.length > 0 ? selectedFruits.join(', ') : '—'}
            />
            <SummaryRow
              label="תוספות"
              value={
                selectedExtras.length > 0
                  ? selectedExtras
                      .map((e) => e.replace(/\s*\+\s*₪.*$/, '').trim())
                      .join(', ')
                  : 'ללא'
              }
              price={
                selectedExtras.length > 0
                  ? shekel(
                      selectedExtras.reduce((sum, label) => {
                        const found = EXTRA_OPTIONS.find(
                          (e) => `${e.label} + ${shekel(e.priceCents)}` === label,
                        );
                        return sum + (found?.priceCents ?? 0);
                      }, 0),
                    )
                  : undefined
              }
            />
            <SummaryRow label="אירוע" value={`${eventType}${eventDate ? ` · ${eventDate}` : ''}`} />
            <SummaryRow label="אורחים" value={`${guests}`} />
            <SummaryRow label="כתובת" value={deliveryAddress || '—'} />

            <Divider sx={{ borderColor: BRAND.ink, borderBottomWidth: 2, my: 1 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  color: 'text.secondary',
                }}
              >
                סך הכל / TOTAL
              </Typography>
              <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 900 }}>
                {shekel(total)}
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{
            mt: 3,
            py: 2,
            fontSize: 18,
            fontWeight: 800,
            borderRadius: 2,
            border: `2px solid ${BRAND.ink}`,
            boxShadow: `4px 4px 0 0 ${BRAND.ink}`,
            '&:hover': {
              boxShadow: `2px 2px 0 0 ${BRAND.ink}`,
              transform: 'translate(2px, 2px)',
            },
            transition: 'transform 120ms ease, box-shadow 120ms ease',
          }}
        >
          {isPending ? 'שולח…' : 'שלח בקשה'}
        </Button>
        <Typography
          sx={{ mt: 1.5, fontSize: 13, color: 'text.secondary', textAlign: 'center' }}
        >
          זוהי בקשת הזמנה ראשונית — ניצור איתך קשר לאישור הפרטים והתשלום.
        </Typography>
      </Section>
    </Container>
  );
}

function Section({
  number,
  label,
  children,
}: {
  number: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: { xs: 5, md: 8 } }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="baseline"
        sx={{ mb: 3, pb: 1.5, borderBottom: `2px solid ${BRAND.ink}` }}
      >
        <Typography
          sx={{
            fontSize: { xs: 40, md: 56 },
            fontWeight: 900,
            lineHeight: 1,
            color: BRAND.green,
            letterSpacing: '-0.02em',
          }}
        >
          {number}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: { xs: 11, md: 13 },
            letterSpacing: '0.2em',
            color: BRAND.ink,
          }}
        >
          {label}
        </Typography>
      </Stack>
      {children}
    </Box>
  );
}

function SummaryRow({
  label,
  value,
  price,
}: {
  label: string;
  value: string;
  price?: string;
}) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={0.5}>
      <Stack direction="row" spacing={2} sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.18em',
            color: 'text.secondary',
            minWidth: 80,
            pt: 0.5,
          }}
        >
          {label}
        </Typography>
        <Typography sx={{ fontSize: 15, fontWeight: 600, color: BRAND.ink, flex: 1 }}>
          {value}
        </Typography>
      </Stack>
      {price && (
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: BRAND.ink }}>
          {price}
        </Typography>
      )}
    </Stack>
  );
}

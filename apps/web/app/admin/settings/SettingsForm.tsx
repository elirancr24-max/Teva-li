'use client';

import { useActionState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import { updateSettings } from '@/app/admin/actions';
import { BRAND } from '@/lib/theme';
import type { Settings } from '@/lib/settings';

type State = { ok?: boolean; error?: string } | null;

async function action(_prev: State, formData: FormData): Promise<State> {
  const updates: Record<string, string> = {};

  const textKeys: Array<keyof Settings> = [
    'business_name',
    'business_phone',
    'business_whatsapp',
    'business_email',
    'business_address',
    'business_hours',
    'hero_title',
    'hero_subtitle',
    'banner_message',
  ];
  for (const key of textKeys) {
    const v = formData.get(key);
    if (typeof v === 'string') updates[key] = v;
  }

  // Money fields: input value is ₪ float → convert to integer cents string.
  const moneyKeys: Array<keyof Settings> = ['delivery_fee_cents', 'min_order_cents'];
  for (const key of moneyKeys) {
    const raw = formData.get(key);
    if (typeof raw === 'string' && raw.trim() !== '') {
      const num = Number(raw);
      if (!Number.isNaN(num)) {
        updates[key] = String(Math.round(num * 100));
      }
    }
  }

  const res = await updateSettings(updates);
  return res?.ok ? { ok: true } : { error: 'שמירה נכשלה' };
}

const labelSx = {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  color: '#0D0D0D',
  mb: 1,
  display: 'block',
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    bgcolor: '#fff',
    '& fieldset': { borderColor: '#0D0D0D', borderWidth: '1.5px' },
    '&:hover fieldset': { borderColor: '#0D0D0D' },
    '&.Mui-focused fieldset': { borderColor: BRAND.green, borderWidth: '2px' },
  },
};

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 0,
        border: `2px solid ${BRAND.ink}`,
        bgcolor: '#fff',
        p: { xs: 3, md: 4 },
        mb: 3,
      }}
    >
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: '#888',
          textTransform: 'uppercase',
          mb: 0.5,
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: { xs: 24, md: 28 },
          color: BRAND.ink,
          letterSpacing: '-0.02em',
          mb: 3,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>
        {children}
      </Box>
    </Paper>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = 'text',
  multiline = false,
  rows,
  full = false,
  adornment,
  inputMode,
  step,
}: {
  name: string;
  label: string;
  defaultValue: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  full?: boolean;
  adornment?: string;
  inputMode?: 'numeric' | 'decimal' | 'text';
  step?: string;
}) {
  return (
    <Box sx={{ gridColumn: full ? { xs: '1', md: '1 / -1' } : 'auto' }}>
      <Typography component="label" htmlFor={name} sx={labelSx}>
        {label}
      </Typography>
      <TextField
        id={name}
        name={name}
        defaultValue={defaultValue}
        type={type}
        fullWidth
        multiline={multiline}
        rows={rows}
        size="small"
        variant="outlined"
        sx={fieldSx}
        inputProps={{ inputMode, step, dir: 'rtl' }}
        InputProps={
          adornment
            ? {
                startAdornment: (
                  <InputAdornment position="start" sx={{ fontFamily: 'monospace', color: '#888' }}>
                    {adornment}
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  );
}

export function SettingsForm({ initial }: { initial: Settings }) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, null);

  const deliveryFee = (Number(initial.delivery_fee_cents) / 100 || 0).toFixed(2);
  const minOrder = (Number(initial.min_order_cents) / 100 || 0).toFixed(2);

  return (
    <Box component="form" action={formAction}>
      <Section eyebrow="01 / business" title="עסק">
        <Field name="business_name" label="שם העסק" defaultValue={initial.business_name} />
        <Field name="business_phone" label="טלפון" defaultValue={initial.business_phone} />
        <Field
          name="business_whatsapp"
          label="וואטסאפ (פורמט בינלאומי)"
          defaultValue={initial.business_whatsapp}
          inputMode="numeric"
        />
        <Field
          name="business_email"
          label="אימייל"
          defaultValue={initial.business_email}
          type="email"
        />
        <Field
          name="business_address"
          label="כתובת"
          defaultValue={initial.business_address}
          full
        />
        <Field
          name="business_hours"
          label="שעות פעילות"
          defaultValue={initial.business_hours}
          full
        />
      </Section>

      <Section eyebrow="02 / delivery" title="משלוח">
        <Field
          name="delivery_fee_cents"
          label="דמי משלוח"
          defaultValue={deliveryFee}
          type="number"
          inputMode="decimal"
          step="0.01"
          adornment="₪"
        />
        <Field
          name="min_order_cents"
          label="מינימום הזמנה"
          defaultValue={minOrder}
          type="number"
          inputMode="decimal"
          step="0.01"
          adornment="₪"
        />
      </Section>

      <Section eyebrow="03 / content" title="תוכן">
        <Field
          name="hero_title"
          label="כותרת ראשית"
          defaultValue={initial.hero_title}
          full
        />
        <Field
          name="hero_subtitle"
          label="תת-כותרת"
          defaultValue={initial.hero_subtitle}
          full
          multiline
          rows={2}
        />
        <Field
          name="banner_message"
          label="הודעת באנר (השאר ריק להסתרה)"
          defaultValue={initial.banner_message}
          full
          multiline
          rows={2}
        />
      </Section>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mt: 1,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={pending}
          sx={{
            bgcolor: BRAND.green,
            color: '#fff',
            fontWeight: 800,
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            px: 4,
            py: 1.25,
            boxShadow: 'none',
            '&:hover': { bgcolor: BRAND.greenDark, boxShadow: 'none' },
          }}
        >
          {pending ? 'שומר…' : 'שמור הגדרות'}
        </Button>

        {state?.ok && (
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: 12,
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: BRAND.greenDark,
              textTransform: 'uppercase',
            }}
          >
            נשמר ✓
          </Typography>
        )}
        {state?.error && (
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: 12,
              letterSpacing: '0.12em',
              fontWeight: 700,
              color: '#c0392b',
              textTransform: 'uppercase',
            }}
          >
            {state.error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

'use server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const SubmitSchema = z.object({
  size_id: z.string().min(1, 'יש לבחור גודל'),
  fruits: z.array(z.string()).min(1, 'יש לבחור לפחות פרי אחד'),
  extras: z.array(z.string()),
  event_type: z.string().min(1, 'יש לבחור סוג אירוע'),
  event_date: z.string().min(8, 'יש להזין תאריך'),
  guests: z.number().int().positive('מספר אורחים לא תקין'),
  delivery_address: z.string().min(5, 'כתובת קצרה מדי'),
  name: z.string().min(2, 'יש להזין שם'),
  phone: z.string().min(9, 'מספר טלפון לא תקין').max(20),
  email: z.string().email('כתובת מייל לא תקינה').optional().or(z.literal('')),
  notes: z.string().optional(),
});

export type KayakSubmitInput = z.infer<typeof SubmitSchema>;
export type KayakSubmitResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

// Hardcoded fallback prices in cents (used if DB lookup fails)
const FALLBACK_SIZE_PRICES: Record<string, number> = {
  S: 28000,
  M: 45000,
  L: 70000,
  XL: 120000,
};

const EXTRA_PRICES_CENTS: Record<string, number> = {
  'שוקולד בלגי': 5000,
  אגוזים: 4000,
  'סושי פירות': 8000,
  'אריזת מתנה': 3000,
};

function extraToCents(label: string): number {
  // labels in DB are stripped; labels passed in may include " + ₪50" — try both
  const clean = label.replace(/\s*\+\s*₪.*$/, '').trim();
  return EXTRA_PRICES_CENTS[clean] ?? 0;
}

export async function submitKayakOrder(
  raw: KayakSubmitInput,
): Promise<KayakSubmitResult> {
  const parsed = SubmitSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { success: false, error: first?.message ?? 'נתונים לא תקינים' };
  }
  const input = parsed.data;

  // Validate event_date is at least 3 days in the future
  const eventDate = new Date(input.event_date);
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  minDate.setDate(minDate.getDate() + 3);
  if (Number.isNaN(eventDate.getTime()) || eventDate < minDate) {
    return { success: false, error: 'תאריך האירוע חייב להיות לפחות 3 ימים מהיום' };
  }

  const supabase = await createClient();

  // Look up size price (fallback to hardcoded if not in DB)
  let sizePriceCents: number | null = null;
  const { data: sizeRow } = await supabase
    .from('kayak_sizes')
    .select('price_cents')
    .eq('id', input.size_id)
    .maybeSingle();
  const size = sizeRow as { price_cents: number } | null;
  if (size) sizePriceCents = size.price_cents;
  else sizePriceCents = FALLBACK_SIZE_PRICES[input.size_id] ?? null;

  if (sizePriceCents == null) {
    return { success: false, error: 'גודל לא תקין' };
  }

  // Compute total
  const extrasCents = input.extras.reduce((s, e) => s + extraToCents(e), 0);
  const totalCents = sizePriceCents + extrasCents;

  // Clean extra labels (strip price suffix) for storage
  const cleanExtras = input.extras.map((e) => e.replace(/\s*\+\s*₪.*$/, '').trim());

  // Insert customer (guest record)
  const { data: rawCustomer, error: custErr } = await supabase
    .from('customers')
    .insert({
      name: input.name,
      phone: input.phone,
      email: input.email && input.email.length > 0 ? input.email : null,
      default_address: input.delivery_address,
    } as never)
    .select('id')
    .single();
  const customer = rawCustomer as { id: string } | null;

  if (custErr || !customer) {
    return { success: false, error: 'שגיאה בשמירת פרטי לקוח' };
  }

  // Insert kayak order
  const { data: rawOrder, error: orderErr } = await supabase
    .from('kayak_orders')
    .insert({
      customer_id: customer.id,
      size_id: input.size_id,
      fruits: input.fruits,
      extras: cleanExtras,
      event_type: input.event_type,
      event_date: input.event_date,
      guests: input.guests,
      delivery_address: input.delivery_address,
      notes: input.notes ?? null,
      status: 'pending',
      total_cents: totalCents,
    } as never)
    .select('id')
    .single();
  const order = rawOrder as { id: string } | null;

  if (orderErr || !order) {
    return { success: false, error: 'שגיאה בשמירת הזמנה' };
  }

  return { success: true, orderId: order.id };
}

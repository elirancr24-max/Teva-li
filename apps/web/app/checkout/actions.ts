'use server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getSettings, whatsappLink } from '@/lib/settings';
import { sendNewOrderEmail, sendOrderConfirmationEmail } from '@/lib/email/resend';
import { bitPayLink } from '@/lib/settings';
import { computeDeliveryCents, CITIES_ALLOWED, MIN_ORDER_CENTS } from '@/lib/delivery';
import type { OrderItem } from '@/types/db';

const CheckoutSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9).max(15),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.enum(CITIES_ALLOWED),
  deliveryDate: z.string().min(8),
  deliveryWindow: z.string(),
  notes: z.string().optional(),
  items: z.array(z.object({
    product_id: z.string().min(1),
    qty: z.number().positive().transform((n) => Math.max(1, Math.round(n))),
    price_cents: z.number().positive().transform((n) => Math.round(n)),
    name_he: z.string(),
    weight: z.string(),
    kind: z.string(),
  })),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;
export type CheckoutResult =
  | { success: true; orderId: string; whatsappUrl: string }
  | { success: false; error: string };

const shekel = (cents: number) => `₪${(cents / 100).toLocaleString('he-IL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function buildWhatsAppMessage(args: {
  orderId: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  deliveryDate: string;
  deliveryWindow: string;
  notes?: string;
  items: { name_he: string; weight: string; qty: number; price_cents: number }[];
  subtotal: number;
  delivery: number;
  total: number;
}): string {
  const lines: string[] = [];
  lines.push(`היי טבע לי 👋`);
  lines.push(`הזמנה חדשה — מספר ${args.orderId.slice(0, 8).toUpperCase()}`);
  lines.push(``);
  lines.push(`*פרטי לקוח:*`);
  lines.push(`שם: ${args.name}`);
  lines.push(`טלפון: ${args.phone}`);
  if (args.email) lines.push(`אימייל: ${args.email}`);
  lines.push(`כתובת: ${args.address}, ${args.city}`);
  lines.push(`תאריך משלוח: ${args.deliveryDate}`);
  lines.push(`חלון שעות: ${args.deliveryWindow}`);
  if (args.notes) lines.push(`הערות: ${args.notes}`);
  lines.push(``);
  lines.push(`*פירוט הזמנה:*`);
  for (const it of args.items) {
    lines.push(`• ${it.name_he} (${it.weight}) × ${it.qty} — ${shekel(it.price_cents * it.qty)}`);
  }
  lines.push(``);
  lines.push(`סכום ביניים: ${shekel(args.subtotal)}`);
  lines.push(`משלוח: ${shekel(args.delivery)}`);
  lines.push(`*סה"כ: ${shekel(args.total)}*`);
  lines.push(``);
  lines.push(`הלקוח ישלם בביט — אנא אשרו את ההזמנה. תודה!`);
  return lines.join('\n');
}

export async function createWhatsAppOrder(input: CheckoutInput): Promise<CheckoutResult> {
  const parsed = CheckoutSchema.safeParse(input);
  if (!parsed.success) {
    const detail = parsed.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(' | ');
    return { success: false, error: `נתונים לא תקינים — ${detail}` };
  }

  const { name, phone, email, address, city, deliveryDate, deliveryWindow, notes, items } = parsed.data;

  const subtotal = items.reduce((s, i) => s + i.price_cents * i.qty, 0);

  if (subtotal < MIN_ORDER_CENTS) {
    return { success: false, error: 'מינימום הזמנה ₪50' };
  }

  const delivery = computeDeliveryCents(subtotal, city);
  const total = subtotal + delivery;

  const supabase = await createClient();
  const { data: rawCustomer, error: custErr } = await supabase
    .from('customers')
    .insert({ name, phone, email, default_address: `${address}, ${city}` } as never)
    .select('id')
    .single();
  const customer = rawCustomer as { id: string } | null;

  if (custErr || !customer) return { success: false, error: 'שגיאה בשמירת פרטי לקוח' };

  const orderItems: OrderItem[] = items.map((i) => ({
    product_id: i.product_id,
    qty: i.qty,
    price_cents: i.price_cents,
    name_he: i.name_he,
    weight: i.weight,
    kind: i.kind,
  }));

  const { data: rawOrder, error: orderErr } = await supabase
    .from('orders')
    .insert({
      customer_id: customer.id,
      items: orderItems as unknown as import('@/types/db').Json,
      subtotal_cents: subtotal,
      delivery_cents: delivery,
      total_cents: total,
      delivery_date: deliveryDate,
      delivery_address: `${address}, ${city}`,
      delivery_window: deliveryWindow,
      notes: notes ?? null,
      status: 'pending',
    } as never)
    .select('id')
    .single();
  const order = rawOrder as { id: string } | null;

  if (orderErr || !order) return { success: false, error: 'שגיאה בשמירת הזמנה' };

  const settings = await getSettings();
  const text = buildWhatsAppMessage({
    orderId: order.id,
    name, phone, email, address, city, deliveryDate, deliveryWindow, notes,
    items, subtotal, delivery, total,
  });
  const whatsappUrl = whatsappLink(settings.business_whatsapp, text);

  const emailItems = items.map((i) => ({ name: i.name_he, weight: i.weight, qty: i.qty, priceCents: i.price_cents }));
  const bitUrl = settings.business_bit_phone
    ? bitPayLink(settings.business_bit_phone, total, `טבע לי הזמנה ${order.id.slice(0, 8).toUpperCase()}`)
    : null;

  // Fire-and-forget — failures must not block the order
  sendNewOrderEmail({
    orderId: order.id,
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    address: `${address}, ${city}`,
    deliveryDate,
    deliveryWindow,
    items: emailItems,
    subtotalCents: subtotal,
    deliveryCents: delivery,
    totalCents: total,
    notes,
  }).catch((err) => console.error('[checkout] sendNewOrderEmail failed', err));

  sendOrderConfirmationEmail({
    orderId: order.id,
    customerName: name,
    customerEmail: email,
    address: `${address}, ${city}`,
    deliveryDate,
    deliveryWindow,
    items: emailItems,
    subtotalCents: subtotal,
    deliveryCents: delivery,
    totalCents: total,
    bitUrl,
    notes,
  }).catch((err) => console.error('[checkout] sendOrderConfirmationEmail failed', err));

  return { success: true, orderId: order.id, whatsappUrl };
}

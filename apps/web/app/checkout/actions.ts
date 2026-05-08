'use server';
import { z } from 'zod';
import { stripe, CURRENCY, computeDeliveryCents } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import type { OrderItem } from '@/types/db';

const CheckoutSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9).max(15),
  email: z.string().email(),
  address: z.string().min(5),
  city: z.string().min(2),
  deliveryDate: z.string().min(8),
  deliveryWindow: z.string(),
  notes: z.string().optional(),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    qty: z.number().int().positive(),
    price_cents: z.number().int().positive(),
    name_he: z.string(),
    weight: z.string(),
    kind: z.string(),
  })),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;
export type CheckoutResult =
  | { success: true; clientSecret: string; orderId: string }
  | { success: false; error: string };

export async function createCheckoutIntent(input: CheckoutInput): Promise<CheckoutResult> {
  const parsed = CheckoutSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: 'נתונים לא תקינים' };
  }

  const { name, phone, email, address, city, deliveryDate, deliveryWindow, notes, items } = parsed.data;

  const subtotal = items.reduce((s, i) => s + i.price_cents * i.qty, 0);
  const delivery = computeDeliveryCents(city);
  const total = subtotal + delivery;

  if (total < 100) return { success: false, error: 'הזמנה מינימלית 1 ₪' };

  const supabase = await createClient();

  // Upsert customer (guest — no auth_user_id)
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

  // Create Stripe PaymentIntent
  const intent = await stripe.paymentIntents.create({
    amount: total,
    currency: CURRENCY,
    metadata: { customer_id: customer.id, city, delivery_date: deliveryDate },
    description: `פרי לי — ${items.length} פריטים — ${name}`,
  });

  // Insert order (status='pending' until webhook flips to 'paid')
  const { data: rawOrder, error: orderErr } = await supabase
    .from('orders')
    .insert({
      customer_id: customer.id,
      items: orderItems as unknown as import('@/types/db').Json,
      subtotal_cents: subtotal,
      delivery_cents: delivery,
      total_cents: total,
      stripe_payment_intent: intent.id,
      delivery_date: deliveryDate,
      delivery_address: `${address}, ${city}`,
      delivery_window: deliveryWindow,
      notes: notes ?? null,
    } as never)
    .select('id')
    .single();
  const order = rawOrder as { id: string } | null;

  if (orderErr || !order) return { success: false, error: 'שגיאה בשמירת הזמנה' };

  return { success: true, clientSecret: intent.client_secret!, orderId: order.id };
}

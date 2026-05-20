import { cookies } from 'next/headers';
import { adminSupabase } from '@/lib/supabase/admin';
import { verifyAdminCookie } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';
import { toCsv, csvResponse } from '@/lib/admin/csv';
import type { Order } from '@/types/db';

type Agg = {
  phone: string;
  name: string;
  email: string | null;
  address: string | null;
  city: string | null;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string;
  firstOrderAt: string;
};

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!verifyAdminCookie(token)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { data, error } = await adminSupabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return new Response(`DB error: ${error.message}`, { status: 500 });

  const orders = (data ?? []) as Order[];

  // Group by phone — same logic as customers/page.tsx.
  const map = new Map<string, Agg>();
  for (const o of orders) {
    const rec = o as Order & {
      delivery_phone?: string | null;
      delivery_name?: string | null;
      customer_phone?: string | null;
      customer_name?: string | null;
      customer_email?: string | null;
      delivery_city?: string | null;
    };
    const phone = (rec.delivery_phone ?? rec.customer_phone ?? '').trim();
    const key = phone || `noid-${o.id.slice(0, 8)}`;
    let agg = map.get(key);
    if (!agg) {
      agg = {
        phone: phone || '',
        name: rec.delivery_name ?? rec.customer_name ?? '',
        email: rec.customer_email ?? null,
        address: o.delivery_address ?? null,
        city: rec.delivery_city ?? null,
        orderCount: 0,
        totalSpent: 0,
        lastOrderAt: o.created_at,
        firstOrderAt: o.created_at,
      };
      map.set(key, agg);
    }
    agg.orderCount += 1;
    if (!['pending', 'cancelled'].includes(o.status)) {
      agg.totalSpent += o.total_cents;
    }
    if (o.created_at > agg.lastOrderAt) agg.lastOrderAt = o.created_at;
    if (o.created_at < agg.firstOrderAt) agg.firstOrderAt = o.created_at;
    if (!agg.name) agg.name = rec.delivery_name ?? rec.customer_name ?? '';
  }

  const customers = Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);

  const headers = [
    'שם',
    'טלפון',
    'אימייל',
    'כתובת',
    'עיר',
    'מספר הזמנות',
    'סה״כ הוצאות (₪)',
    'הזמנה ראשונה',
    'הזמנה אחרונה',
  ];
  const rows = customers.map((c) => [
    c.name || '—',
    c.phone || '—',
    c.email ?? '',
    c.address ?? '',
    c.city ?? '',
    c.orderCount,
    (c.totalSpent / 100).toFixed(2),
    new Date(c.firstOrderAt).toISOString().slice(0, 10),
    new Date(c.lastOrderAt).toISOString().slice(0, 10),
  ]);

  await logAdminAction('customers.export.csv', 'customers', null, { count: rows.length });

  const filename = `customers-${new Date().toISOString().slice(0, 10)}.csv`;
  return csvResponse(filename, toCsv(headers, rows));
}

import { cookies } from 'next/headers';
import { adminSupabase } from '@/lib/supabase/admin';
import { verifyAdminCookie } from '@/lib/admin/auth';
import { logAdminAction } from '@/lib/admin/audit';
import { toCsv, csvResponse } from '@/lib/admin/csv';
import type { Order } from '@/types/db';

type OrderItem = { name?: string; qty?: number; quantity?: number };

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

  const headers = [
    'מזהה',
    'תאריך יצירה',
    'תאריך משלוח',
    'שם',
    'טלפון',
    'כתובת',
    'עיר',
    'סטטוס',
    'מספר פריטים',
    'סכום פריטים (₪)',
    'משלוח (₪)',
    'סה״כ (₪)',
    'הערות לקוח',
  ];

  const rows = orders.map((o) => {
    const rec = o as Order & {
      delivery_phone?: string | null;
      delivery_name?: string | null;
      delivery_city?: string | null;
    };
    const items = (Array.isArray(o.items) ? o.items : []) as OrderItem[];
    const totalUnits = items.reduce(
      (s, it) => s + (Number(it.qty ?? it.quantity ?? 0) || 0),
      0,
    );
    return [
      o.id,
      new Date(o.created_at).toISOString(),
      o.delivery_date ? new Date(o.delivery_date).toISOString().slice(0, 10) : '',
      rec.delivery_name ?? '',
      rec.delivery_phone ?? '',
      o.delivery_address ?? '',
      rec.delivery_city ?? '',
      o.status,
      totalUnits,
      ((o.subtotal_cents ?? 0) / 100).toFixed(2),
      ((o.delivery_cents ?? 0) / 100).toFixed(2),
      (o.total_cents / 100).toFixed(2),
      o.notes ?? '',
    ];
  });

  await logAdminAction('orders.export.csv', 'orders', null, { count: rows.length });

  const filename = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
  return csvResponse(filename, toCsv(headers, rows));
}

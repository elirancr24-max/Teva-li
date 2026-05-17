import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/brand';
import type { Order } from '@/types/db';

export const metadata: Metadata = { title: 'לוח בקרה — אדמין', robots: { index: false, follow: false } };

const STATUS_HE: Record<string, string> = {
  pending: 'ממתין', paid: 'שולם', preparing: 'בהכנה',
  shipped: 'במשלוח', delivered: 'נמסר', cancelled: 'בוטל',
};

const STATUS_COLOR: Record<string, string> = {
  pending: '#888', paid: BRAND.green, preparing: '#f0a500',
  shipped: '#3b82f6', delivered: '#22c55e', cancelled: '#ef4444',
};

function formatPrice(cents: number) {
  return `₪${(cents / 100).toFixed(0)}`;
}

export default async function AdminDashboardPage() {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [ordersRes, kayaksRes, productsRes, recentRes] = await Promise.all([
    adminSupabase.from('orders').select('id, total_cents, status, created_at'),
    adminSupabase.from('kayak_orders').select('id, status'),
    adminSupabase.from('products').select('id, active'),
    adminSupabase
      .from('orders')
      .select('id, total_cents, status, delivery_address, created_at, items')
      .order('created_at', { ascending: false })
      .limit(8),
  ]);

  const orders = ordersRes.data ?? [];
  const kayaks = kayaksRes.data ?? [];
  const products = productsRes.data ?? [];
  const recent = (recentRes.data ?? []) as Order[];

  const weekOrders = orders.filter((o) => o.created_at >= weekAgo);
  const weekRevenue = weekOrders
    .filter((o) => !['pending', 'cancelled'].includes(o.status))
    .reduce((s, o) => s + o.total_cents, 0);
  const activeOrders = orders.filter((o) =>
    ['paid', 'preparing', 'shipped'].includes(o.status),
  ).length;
  const pendingKayaks = kayaks.filter((k) => k.status === 'pending').length;
  const activeProducts = products.filter((p) => p.active).length;

  const kpis = [
    { label: 'הכנסות השבוע', value: formatPrice(weekRevenue), sub: `${weekOrders.length} הזמנות`, accent: true },
    { label: 'הזמנות פעילות', value: String(activeOrders), sub: 'שולם / בהכנה / משלוח' },
    { label: 'קיאקים ממתינים', value: String(pendingKayaks), sub: 'דרוש אישור', warn: pendingKayaks > 0 },
    { label: 'מוצרים פעילים', value: String(activeProducts), sub: `מתוך ${products.length} סה״כ` },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ px: 4, pt: 4, pb: 2.5, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#888', mb: 0.5 }}>
          {now.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em' }}>
          לוח בקרה.
        </Typography>
      </Box>

      {/* KPI strip */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `2px solid ${BRAND.ink}` }}>
        {kpis.map((kpi, i) => (
          <Box
            key={i}
            sx={{
              p: 3,
              borderLeft: i > 0 ? `1px solid ${BRAND.ink}` : 'none',
              bgcolor: kpi.accent ? BRAND.green : 'transparent',
              color: BRAND.ink,
            }}
          >
            <Typography sx={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7 }}>
              {kpi.label}
            </Typography>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: 28, md: 44 }, lineHeight: 1, mt: 1, letterSpacing: '-0.04em' }}>
              {kpi.value}
            </Typography>
            <Typography sx={{ fontFamily: 'monospace', fontSize: 11, mt: 1, color: kpi.warn ? '#ef4444' : 'inherit', opacity: kpi.warn ? 1 : 0.7 }}>
              {kpi.warn ? '⚠ ' : '↗ '}{kpi.sub}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Recent orders */}
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6 }}>
            01 · הזמנות אחרונות
          </Typography>
          <Link href="/admin/orders" style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: BRAND.ink }}>
            הצג הכל →
          </Link>
        </Box>

        <Paper variant="outlined" sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, overflow: 'hidden' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f0efec' }}>
                {['הזמנה', 'כתובת', 'פריטים', 'סכום', 'סטטוס', 'תאריך'].map((h) => (
                  <TableCell key={h} sx={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', py: 1.5 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {recent.map((order) => {
                const items = Array.isArray(order.items) ? order.items : [];
                const date = new Date(order.created_at).toLocaleDateString('he-IL');
                return (
                  <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
                      {order.id.slice(0, 8)}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, maxWidth: 180 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                        {order.delivery_address ?? '—'}
                      </span>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{items.length} פריטים</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: 14 }}>{formatPrice(order.total_cents)}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 1, py: 0.5,
                          bgcolor: STATUS_COLOR[order.status] ?? '#888',
                          color: '#fff',
                          fontFamily: 'monospace',
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {STATUS_HE[order.status] ?? order.status}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>{date}</TableCell>
                  </TableRow>
                );
              })}
              {recent.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4, color: '#888', fontFamily: 'monospace', fontSize: 12 }}>
                    אין הזמנות עדיין
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
}

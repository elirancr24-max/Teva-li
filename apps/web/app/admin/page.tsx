import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/brand';
import type { Order } from '@/types/db';
import { Sparkline } from '@/components/admin/Sparkline';
import { RangeSelector } from '@/components/admin/RangeSelector';
import { bucketDaily, rangeStart, RANGE_DAYS, type RangeKey } from '@/lib/admin/timeseries';

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

function parseRange(raw: string | undefined): RangeKey {
  if (raw === '7d' || raw === '30d' || raw === '90d') return raw;
  return '30d';
}

type OrderItem = { product_id?: string; name?: string; qty?: number; quantity?: number };

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const range = parseRange(sp.range);
  const now = new Date();
  const startIso = rangeStart(range, now).toISOString();

  const [ordersRes, kayaksRes, productsRes, recentRes] = await Promise.all([
    adminSupabase.from('orders').select('id, total_cents, status, created_at, items'),
    adminSupabase.from('kayak_orders').select('id, status'),
    adminSupabase.from('products').select('id, name_he, slug, active, stock'),
    adminSupabase
      .from('orders')
      .select('id, total_cents, status, delivery_address, created_at, items')
      .order('created_at', { ascending: false })
      .limit(8),
  ]);

  const allOrders = ordersRes.data ?? [];
  const kayaks = kayaksRes.data ?? [];
  const products = productsRes.data ?? [];
  const recent = (recentRes.data ?? []) as Order[];

  // Filter orders into range.
  const orders = allOrders.filter((o) => o.created_at >= startIso);
  const revenue = orders
    .filter((o) => !['pending', 'cancelled'].includes(o.status))
    .reduce((s, o) => s + o.total_cents, 0);
  const activeOrders = allOrders.filter((o) =>
    ['paid', 'preparing', 'shipped'].includes(o.status),
  ).length;
  const pendingKayaks = kayaks.filter((k) => k.status === 'pending').length;
  const activeProducts = products.filter((p) => p.active).length;

  // Sparkline data: revenue per day in range (exclude pending/cancelled).
  const revRows = orders
    .filter((o) => !['pending', 'cancelled'].includes(o.status))
    .map((o) => ({ created_at: o.created_at, value: o.total_cents }));
  const dailyRevenue = bucketDaily(revRows, range, now);

  // Top products by units in range.
  const productCounts = new Map<string, { name: string; units: number }>();
  for (const o of orders) {
    if (['pending', 'cancelled'].includes(o.status)) continue;
    const items = (Array.isArray(o.items) ? o.items : []) as OrderItem[];
    for (const it of items) {
      const key = it.product_id ?? it.name ?? '?';
      const name = it.name ?? key;
      const qty = Number(it.qty ?? it.quantity ?? 0) || 0;
      if (qty <= 0) continue;
      const prev = productCounts.get(key);
      productCounts.set(key, { name, units: (prev?.units ?? 0) + qty });
    }
  }
  const topProducts = Array.from(productCounts.values())
    .sort((a, b) => b.units - a.units)
    .slice(0, 5);

  // Low-stock: active products with stock < 10.
  const lowStock = products
    .filter((p) => p.active && typeof p.stock === 'number' && p.stock !== null && p.stock < 10)
    .sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0))
    .slice(0, 6);

  const kpis = [
    { label: `הכנסות (${RANGE_DAYS[range]} ימים)`, value: formatPrice(revenue), sub: `${orders.length} הזמנות`, accent: true },
    { label: 'הזמנות פעילות', value: String(activeOrders), sub: 'שולם / בהכנה / משלוח' },
    { label: 'קיאקים ממתינים', value: String(pendingKayaks), sub: 'דרוש אישור', warn: pendingKayaks > 0 },
    { label: 'מוצרים פעילים', value: String(activeProducts), sub: `מתוך ${products.length} סה״כ` },
  ];

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          pt: { xs: 3, md: 4 },
          pb: 2.5,
          borderBottom: `2px solid ${BRAND.ink}`,
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'flex-end' },
          justifyContent: 'space-between',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#888', mb: 0.5 }}>
            {now.toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 52 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em' }}>
            לוח בקרה.
          </Typography>
        </Box>
        <RangeSelector current={range} />
      </Box>

      {/* KPI strip */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, borderBottom: `2px solid ${BRAND.ink}` }}>
        {kpis.map((kpi, i) => (
          <Box
            key={i}
            sx={{
              p: { xs: 2, md: 3 },
              borderLeft: { xs: i % 2 === 0 ? 'none' : `1px solid ${BRAND.ink}`, md: i > 0 ? `1px solid ${BRAND.ink}` : 'none' },
              borderTop: { xs: i >= 2 ? `1px solid ${BRAND.ink}` : 'none', md: 'none' },
              bgcolor: kpi.accent ? BRAND.green : 'transparent',
              color: BRAND.ink,
            }}
          >
            <Typography sx={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7 }}>
              {kpi.label}
            </Typography>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: 22, md: 44 }, lineHeight: 1, mt: 1, letterSpacing: '-0.04em' }}>
              {kpi.value}
            </Typography>
            <Typography sx={{ fontFamily: 'monospace', fontSize: 11, mt: 1, color: kpi.warn ? '#ef4444' : 'inherit', opacity: kpi.warn ? 1 : 0.7 }}>
              {kpi.warn ? '⚠ ' : '↗ '}{kpi.sub}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Sparkline */}
      <Box sx={{ px: { xs: 2, md: 4 }, py: 3, borderBottom: `2px solid ${BRAND.ink}`, bgcolor: '#fff' }}>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, mb: 1.5 }}>
          02 · הכנסות יומיות
        </Typography>
        <Sparkline data={dailyRevenue} width={800} height={70} />
      </Box>

      {/* Top products + Low stock */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          borderBottom: `2px solid ${BRAND.ink}`,
        }}
      >
        <Box sx={{ p: { xs: 2, md: 4 }, borderLeft: { md: `1px solid ${BRAND.ink}` } }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, mb: 2 }}>
            03 · מוצרים מובילים
          </Typography>
          {topProducts.length === 0 ? (
            <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>
              אין נתונים בטווח זה
            </Typography>
          ) : (
            <Box component="ol" sx={{ pl: 2, m: 0 }}>
              {topProducts.map((p, i) => (
                <Box
                  component="li"
                  key={i}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: 1, borderBottom: '1px dashed #ddd' }}
                >
                  <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                    {i + 1}. {p.name}
                  </Typography>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 800, color: BRAND.green }}>
                    {p.units} יח׳
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ p: { xs: 2, md: 4 }, borderTop: { xs: `1px solid ${BRAND.ink}`, md: 'none' } }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, mb: 2 }}>
            04 · מלאי נמוך
          </Typography>
          {lowStock.length === 0 ? (
            <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>
              אין מוצרים במלאי נמוך ✓
            </Typography>
          ) : (
            <Box>
              {lowStock.map((p) => (
                <Box
                  key={p.id}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', py: 1, borderBottom: '1px dashed #ddd' }}
                >
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    style={{ fontSize: 14, fontWeight: 700, color: BRAND.ink, textDecoration: 'none' }}
                  >
                    {p.name_he}
                  </Link>
                  <Typography sx={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 800, color: '#c0392b' }}>
                    {p.stock} ביחידות
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Recent orders */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 2 }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6 }}>
            01 · הזמנות אחרונות
          </Typography>
          <Link href="/admin/orders" style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: BRAND.ink }}>
            הצג הכל →
          </Link>
        </Box>

        <Box sx={{ overflowX: 'auto' }}>
          <Paper variant="outlined" sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, overflow: 'hidden', minWidth: 600 }}>
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
                        <Link href={`/admin/orders/${order.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {order.id.slice(0, 8)}
                        </Link>
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
    </Box>
  );
}

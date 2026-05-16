import type { Metadata } from 'next';
import { Box, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/theme';
import { OrderActions } from './OrderActions';
import type { Order } from '@/types/db';

export const metadata: Metadata = { title: 'הזמנות — אדמין', robots: { index: false, follow: false } };

const STATUS_HE: Record<string, string> = {
  pending: 'ממתין', paid: 'שולם', preparing: 'בהכנה',
  shipped: 'במשלוח', delivered: 'נמסר', cancelled: 'בוטל',
};
const STATUS_COLOR: Record<string, string> = {
  pending: '#888', paid: BRAND.green, preparing: '#f0a500',
  shipped: '#3b82f6', delivered: '#22c55e', cancelled: '#ef4444',
};

function fmt(cents: number) { return `₪${(cents / 100).toFixed(0)}`; }

export default async function OrdersPage() {
  const { data } = await adminSupabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const orders = (data ?? []) as Order[];

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <Box>
      {/* Header */}
      <Box sx={{ px: 4, pt: 4, pb: 2.5, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#888', mb: 0.5 }}>
          {Object.values(statusCounts).reduce((a, b) => a + b, 0)} הזמנות סה״כ
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em' }}>
          הזמנות.
        </Typography>
      </Box>

      {/* Status summary strip */}
      <Box sx={{ display: 'flex', borderBottom: `2px solid ${BRAND.ink}`, overflowX: 'auto' }}>
        {Object.entries(STATUS_HE).map(([key, label]) => (
          <Box key={key} sx={{ px: 3, py: 2, borderLeft: `1px solid ${BRAND.ink}`, minWidth: 100 }}>
            <Typography sx={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase' }}>
              {label}
            </Typography>
            <Typography sx={{ fontWeight: 900, fontSize: 28, color: STATUS_COLOR[key] ?? '#888', letterSpacing: '-0.04em' }}>
              {statusCounts[key] ?? 0}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Table */}
      <Box sx={{ p: 4 }}>
        <Paper variant="outlined" sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, overflow: 'hidden' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f0efec' }}>
                {['מזהה', 'כתובת', 'פריטים', 'סכום', 'תאריך משלוח', 'סטטוס', 'פעולות'].map((h) => (
                  <TableCell key={h} sx={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', py: 1.5 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const items = Array.isArray(order.items) ? order.items : [];
                return (
                  <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888', whiteSpace: 'nowrap' }}>
                      {order.id.slice(0, 8)}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, maxWidth: 200 }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                        {order.delivery_address ?? '—'}
                      </span>
                      {order.notes && (
                        <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#888', display: 'block', marginTop: 2 }}>
                          {order.notes}
                        </span>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>{items.length} פריטים</TableCell>
                    <TableCell sx={{ fontWeight: 800, fontSize: 14, whiteSpace: 'nowrap' }}>{fmt(order.total_cents)}</TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888', whiteSpace: 'nowrap' }}>
                      {order.delivery_date
                        ? new Date(order.delivery_date).toLocaleDateString('he-IL')
                        : new Date(order.created_at).toLocaleDateString('he-IL')}
                    </TableCell>
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
                        }}
                      >
                        {STATUS_HE[order.status] ?? order.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <OrderActions orderId={order.id} currentStatus={order.status} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, color: '#888', fontFamily: 'monospace', fontSize: 12 }}>
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

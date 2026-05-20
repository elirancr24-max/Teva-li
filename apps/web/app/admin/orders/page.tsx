import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow, TextField, Select, MenuItem, FormControl, Button } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/brand';
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

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const filterStatus = (sp.status ?? '').trim();
  const q = (sp.q ?? '').trim().toLowerCase();

  const { data, error: queryError } = await adminSupabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const allOrders = (data ?? []) as Order[];

  // Status counts on the FULL dataset (so the strip stays stable while filtering).
  const statusCounts = allOrders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] ?? 0) + 1;
    return acc;
  }, {});

  // Apply filters.
  let orders = allOrders;
  if (filterStatus) orders = orders.filter((o) => o.status === filterStatus);
  if (q) {
    orders = orders.filter((o) => {
      const rec = o as Order & { delivery_phone?: string | null; delivery_name?: string | null };
      return (
        o.id.toLowerCase().includes(q) ||
        (o.delivery_address ?? '').toLowerCase().includes(q) ||
        (rec.delivery_phone ?? '').toLowerCase().includes(q) ||
        (rec.delivery_name ?? '').toLowerCase().includes(q)
      );
    });
  }

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      bgcolor: '#fff',
      '& fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
    },
  };

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
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#888', mb: 0.5 }}>
            {Object.values(statusCounts).reduce((a, b) => a + b, 0)} הזמנות סה״כ
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em' }}>
            הזמנות.
          </Typography>
        </Box>
        <Link
          href="/admin/orders/export.csv"
          style={{
            fontFamily: 'monospace',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '10px 18px',
            border: `2px solid ${BRAND.ink}`,
            background: '#fff',
            color: BRAND.ink,
            textDecoration: 'none',
          }}
        >
          ⇩ ייצא CSV
        </Link>
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

      {/* Filter bar */}
      <Box
        component="form"
        method="get"
        sx={{
          px: { xs: 2, md: 4 },
          py: 2,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr auto' },
          gap: 1.5,
          borderBottom: `1px solid ${BRAND.ink}`,
          alignItems: 'end',
          bgcolor: '#fafafa',
        }}
      >
        <TextField
          name="q"
          defaultValue={q}
          placeholder="חפש מזהה / כתובת / טלפון / שם…"
          size="small"
          sx={fieldSx}
        />
        <FormControl size="small" sx={fieldSx}>
          <Select name="status" defaultValue={filterStatus} displayEmpty>
            <MenuItem value=""><em>— כל הסטטוסים —</em></MenuItem>
            {Object.entries(STATUS_HE).map(([k, label]) => (
              <MenuItem key={k} value={k}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            type="submit"
            sx={{
              borderRadius: 0,
              border: `2px solid ${BRAND.ink}`,
              bgcolor: BRAND.ink,
              color: BRAND.paper,
              fontFamily: 'monospace',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              px: 2,
              py: 1,
              '&:hover': { bgcolor: '#000' },
            }}
          >
            סנן
          </Button>
          {(filterStatus || q) && (
            <Link
              href="/admin/orders"
              style={{
                borderRadius: 0,
                border: `2px solid ${BRAND.ink}`,
                background: '#fff',
                color: BRAND.ink,
                fontFamily: 'monospace',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              נקה
            </Link>
          )}
        </Box>
      </Box>

      {/* Table */}
      <Box sx={{ p: { xs: 2, md: 4 }, overflowX: 'auto' }}>
        <Paper variant="outlined" sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, overflow: 'hidden', minWidth: 800 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f0efec' }}>
                {['מזהה', 'כתובת', 'פריטים', 'סכום', 'תאריך משלוח', 'סטטוס', 'פעולות'].map((h) => (
                  <TableCell key={h} sx={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', py: 1.5, position: 'sticky', top: 0, bgcolor: '#f0efec', zIndex: 1 }}>
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
                    <TableCell sx={{ fontFamily: 'monospace', fontSize: 11, whiteSpace: 'nowrap' }}>
                      <Link href={`/admin/orders/${order.id}`} style={{ color: BRAND.ink, textDecoration: 'underline', fontWeight: 700 }}>
                        {order.id.slice(0, 8)}
                      </Link>
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
                    {queryError
                      ? `שגיאת טעינה: ${queryError.message}`
                      : (filterStatus || q)
                        ? 'אין הזמנות שתואמות לסינון'
                        : 'אין הזמנות עדיין'}
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

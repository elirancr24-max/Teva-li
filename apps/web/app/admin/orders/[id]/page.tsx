import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, Chip } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/brand';
import { OrderActions } from '../OrderActions';
import { InternalNotes } from './InternalNotes';
import type { Order } from '@/types/db';

export const metadata: Metadata = { title: 'פרטי הזמנה — אדמין', robots: { index: false, follow: false } };

type OrderItem = {
  product_id?: string;
  name?: string;
  qty?: number;
  quantity?: number;
  price_cents?: number;
  weight?: string;
};

const STATUS_HE: Record<string, string> = {
  pending: 'ממתין', paid: 'שולם', preparing: 'בהכנה',
  shipped: 'במשלוח', delivered: 'נמסר', cancelled: 'בוטל',
};

const STATUS_COLOR: Record<string, string> = {
  pending: '#888', paid: BRAND.green, preparing: '#f0a500',
  shipped: '#3b82f6', delivered: '#22c55e', cancelled: '#ef4444',
};

function fmt(cents: number) {
  return `₪${(cents / 100).toFixed(2)}`;
}

const labelSx = {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#888',
  mb: 0.5,
};

const monoHead = {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  py: 1.5,
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, error } = await adminSupabase.from('orders').select('*').eq('id', id).single();
  if (error || !data) notFound();
  const order = data as Order & { notes_internal?: string | null };

  const items = (Array.isArray(order.items) ? order.items : []) as OrderItem[];
  const itemsTotal = items.reduce(
    (s, it) => s + (Number(it.price_cents ?? 0) * Number(it.qty ?? it.quantity ?? 0)),
    0,
  );

  return (
    <Box>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          pt: { xs: 3, md: 4 },
          pb: 2.5,
          borderBottom: `2px solid ${BRAND.ink}`,
        }}
      >
        <Link href="/admin/orders" style={{ fontFamily: 'monospace', fontSize: 11, color: BRAND.ink, textDecoration: 'none' }}>
          ← חזרה להזמנות
        </Link>
        <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', md: 'flex-end' }, justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mt: 1 }}>
          <Box>
            <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#888', mb: 0.5 }}>
              {order.id}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 44 }, fontWeight: 900, letterSpacing: '-0.04em' }}>
              הזמנה #{order.id.slice(0, 8)}
            </Typography>
            <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: '#888', mt: 1 }}>
              נוצרה {new Date(order.created_at).toLocaleString('he-IL')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip
              label={STATUS_HE[order.status] ?? order.status}
              sx={{ bgcolor: STATUS_COLOR[order.status] ?? '#888', color: '#fff', fontFamily: 'monospace', fontWeight: 700, borderRadius: 0 }}
            />
            <OrderActions orderId={order.id} currentStatus={order.status} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 0 }}>
        {/* Items */}
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, mb: 2 }}>
            01 · פריטים
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <Paper variant="outlined" sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, minWidth: 400 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f0efec' }}>
                    <TableCell sx={monoHead}>שם</TableCell>
                    <TableCell sx={monoHead}>כמות</TableCell>
                    <TableCell sx={monoHead}>יחידה</TableCell>
                    <TableCell sx={monoHead}>סכום</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: 'center', py: 3, fontFamily: 'monospace', color: '#888' }}>
                        אין פריטים
                      </TableCell>
                    </TableRow>
                  )}
                  {items.map((it, i) => {
                    const qty = Number(it.qty ?? it.quantity ?? 0);
                    const price = Number(it.price_cents ?? 0);
                    return (
                      <TableRow key={i}>
                        <TableCell sx={{ fontWeight: 700, fontSize: 14 }}>{it.name ?? it.product_id ?? '—'}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: 13 }}>{qty}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{it.weight ?? '—'}</TableCell>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13 }}>{fmt(price * qty)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Box>

          {/* Totals */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              border: `2px solid ${BRAND.ink}`,
              bgcolor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Row label="סכום פריטים" value={fmt(itemsTotal)} />
            <Row label="סה״כ" value={fmt(order.total_cents)} bold />
          </Box>

          {/* Internal notes */}
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, mb: 2 }}>
              03 · הערות פנימיות
            </Typography>
            <InternalNotes orderId={order.id} initial={order.notes_internal ?? ''} />
          </Box>
        </Box>

        {/* Customer block */}
        <Box sx={{ p: { xs: 2, md: 4 }, borderLeft: { md: `1px solid ${BRAND.ink}` }, borderTop: { xs: `1px solid ${BRAND.ink}`, md: 'none' }, bgcolor: '#fafafa' }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.6, mb: 2 }}>
            02 · לקוח ומשלוח
          </Typography>
          <Detail label="כתובת" value={order.delivery_address ?? '—'} />
          <Detail label="טלפון" value={(order as Record<string, unknown>).delivery_phone as string | undefined} />
          <Detail label="עיר" value={(order as Record<string, unknown>).delivery_city as string | undefined} />
          <Detail label="תאריך משלוח" value={order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('he-IL') : undefined} />
          <Detail label="הערות לקוח" value={order.notes ?? undefined} />
        </Box>
      </Box>
    </Box>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: bold ? 13 : 11, fontWeight: bold ? 800 : 500, color: bold ? BRAND.ink : '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </Typography>
      <Typography sx={{ fontFamily: 'monospace', fontSize: bold ? 14 : 12, fontWeight: bold ? 900 : 700 }}>
        {value}
      </Typography>
    </Box>
  );
}

function Detail({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={labelSx}>{label}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 600, wordBreak: 'break-word' }}>
        {value && value !== '' ? value : '—'}
      </Typography>
    </Box>
  );
}

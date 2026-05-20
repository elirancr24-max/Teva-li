import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell, TextField } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/brand';
import { CustomerRow } from './CustomerRow';
import type { Order } from '@/types/db';

export const metadata: Metadata = { title: 'לקוחות — אדמין', robots: { index: false, follow: false } };

type CustomerAgg = {
  phone: string;
  name: string;
  email: string | null;
  address: string | null;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string;
  statuses: Record<string, number>;
  orders: Order[];
};

function fmt(cents: number) {
  return `₪${(cents / 100).toFixed(0)}`;
}

const monoHead = {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  py: 1.5,
};

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? '').trim().toLowerCase();

  const { data } = await adminSupabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const orders = (data ?? []) as Order[];

  // Group by phone (natural key — site has no user auth).
  const map = new Map<string, CustomerAgg>();
  for (const o of orders) {
    const rec = o as Order & {
      delivery_phone?: string | null;
      delivery_name?: string | null;
      customer_name?: string | null;
      customer_phone?: string | null;
      customer_email?: string | null;
    };
    const phone = (rec.delivery_phone ?? rec.customer_phone ?? '').trim();
    const key = phone || `noid-${o.id.slice(0, 8)}`;
    let agg = map.get(key);
    if (!agg) {
      agg = {
        phone: phone || '—',
        name: rec.delivery_name ?? rec.customer_name ?? '—',
        email: rec.customer_email ?? null,
        address: o.delivery_address ?? null,
        orderCount: 0,
        totalSpent: 0,
        lastOrderAt: o.created_at,
        statuses: {},
        orders: [],
      };
      map.set(key, agg);
    }
    agg.orderCount += 1;
    if (!['pending', 'cancelled'].includes(o.status)) {
      agg.totalSpent += o.total_cents;
    }
    if (o.created_at > agg.lastOrderAt) agg.lastOrderAt = o.created_at;
    agg.statuses[o.status] = (agg.statuses[o.status] ?? 0) + 1;
    if (!agg.name || agg.name === '—') agg.name = rec.delivery_name ?? rec.customer_name ?? agg.name;
    agg.orders.push(o);
  }

  let customers = Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);

  if (q) {
    customers = customers.filter(
      (c) =>
        c.phone.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        (c.email?.toLowerCase().includes(q) ?? false) ||
        (c.address?.toLowerCase().includes(q) ?? false),
    );
  }

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <Box>
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
            {customers.length} לקוחות · סה״כ {fmt(totalRevenue)}
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 52 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em' }}>
            לקוחות.
          </Typography>
        </Box>
        <Link
          href="/admin/customers/export.csv"
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

      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Box component="form" method="get" sx={{ mb: 2, maxWidth: 400 }}>
          <TextField
            name="q"
            defaultValue={q}
            placeholder="חפש לפי שם / טלפון / מייל / כתובת…"
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 0,
                bgcolor: '#fff',
                '& fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
              },
            }}
          />
        </Box>

        <Box sx={{ overflowX: 'auto' }}>
          <Paper variant="outlined" sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, minWidth: 700 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f0efec' }}>
                  <TableCell sx={monoHead}>שם</TableCell>
                  <TableCell sx={monoHead}>טלפון</TableCell>
                  <TableCell sx={monoHead}>הזמנות</TableCell>
                  <TableCell sx={monoHead}>סה״כ הוציא</TableCell>
                  <TableCell sx={monoHead}>הזמנה אחרונה</TableCell>
                  <TableCell sx={monoHead} />
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 6, fontFamily: 'monospace', color: '#888' }}>
                      לא נמצאו לקוחות
                    </TableCell>
                  </TableRow>
                )}
                {customers.map((c) => (
                  <CustomerRow key={c.phone + '-' + c.name} customer={c} />
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

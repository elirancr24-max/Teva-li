'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Box, Typography, IconButton, TableRow, TableCell, Collapse, Table, TableHead, TableBody } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BRAND } from '@/lib/brand';
import type { Order } from '@/types/db';

type Customer = {
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

const STATUS_HE: Record<string, string> = {
  pending: 'ממתין', paid: 'שולם', preparing: 'בהכנה',
  shipped: 'במשלוח', delivered: 'נמסר', cancelled: 'בוטל',
};

function fmt(cents: number) {
  return `₪${(cents / 100).toFixed(0)}`;
}

export function CustomerRow({ customer }: { customer: Customer }) {
  const [open, setOpen] = useState(false);
  const lastDate = new Date(customer.lastOrderAt).toLocaleDateString('he-IL');

  return (
    <>
      <TableRow sx={{ '&:hover': { bgcolor: '#fafafa' }, '& > *': { borderBottom: open ? 'none' : undefined } }}>
        <TableCell sx={{ fontWeight: 700, fontSize: 14 }}>{customer.name}</TableCell>
        <TableCell sx={{ fontFamily: 'monospace', fontSize: 13, direction: 'ltr', textAlign: 'right' }}>
          {customer.phone}
        </TableCell>
        <TableCell sx={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 700 }}>{customer.orderCount}</TableCell>
        <TableCell sx={{ fontFamily: 'monospace', fontSize: 13, fontWeight: 800, color: BRAND.green }}>
          {fmt(customer.totalSpent)}
        </TableCell>
        <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{lastDate}</TableCell>
        <TableCell sx={{ width: 40 }}>
          <IconButton
            size="small"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'סגור היסטוריה' : 'פתח היסטוריה'}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ p: 0, borderBottom: open ? `1px solid ${BRAND.ink}` : 'none' }}>
          <Collapse in={open}>
            <Box sx={{ p: 2, bgcolor: '#fafafa' }}>
              {customer.email && (
                <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: '#666', mb: 1 }}>
                  ✉ {customer.email}
                </Typography>
              )}
              {customer.address && (
                <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: '#666', mb: 1.5 }}>
                  📍 {customer.address}
                </Typography>
              )}
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {['הזמנה', 'תאריך', 'סכום', 'סטטוס'].map((h) => (
                      <TableCell key={h} sx={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                        <Link href={`/admin/orders/${o.id}`} style={{ color: BRAND.ink, textDecoration: 'underline' }}>
                          {o.id.slice(0, 8)}
                        </Link>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
                        {new Date(o.created_at).toLocaleDateString('he-IL')}
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13 }}>{fmt(o.total_cents)}</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 11 }}>{STATUS_HE[o.status] ?? o.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

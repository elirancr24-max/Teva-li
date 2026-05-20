'use client';
import { Select, MenuItem, FormControl } from '@mui/material';
import { useTransition } from 'react';
import { updateOrderStatus } from '@/app/admin/actions';
import { useAdminToast } from '@/components/admin/AdminToastProvider';
import type { Database } from '@/types/db';

type OrderStatus = Database['public']['Tables']['orders']['Row']['status'];

const OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'pending',   label: 'ממתין' },
  { value: 'paid',      label: 'שולם' },
  { value: 'preparing', label: 'בהכנה' },
  { value: 'shipped',   label: 'במשלוח' },
  { value: 'delivered', label: 'נמסר' },
  { value: 'cancelled', label: 'בוטל' },
];

export function OrderActions({ orderId, currentStatus }: { orderId: string; currentStatus: OrderStatus }) {
  const [isPending, startTransition] = useTransition();
  const toast = useAdminToast();

  return (
    <FormControl size="small" sx={{ minWidth: 110 }}>
      <Select
        value={currentStatus}
        disabled={isPending}
        onChange={(e) => {
          const status = e.target.value as OrderStatus;
          startTransition(async () => {
            const res = await updateOrderStatus(orderId, status);
            if (res.ok) toast.success('סטטוס הזמנה עודכן');
            else toast.error(res.error);
          });
        }}
        sx={{ fontFamily: 'monospace', fontSize: 11 }}
      >
        {OPTIONS.map((o) => (
          <MenuItem key={o.value} value={o.value} sx={{ fontFamily: 'monospace', fontSize: 11 }}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

'use client';
import { Switch } from '@mui/material';
import { useTransition, useState } from 'react';
import { toggleProductActive } from '@/app/admin/actions';
import { useAdminToast } from '@/components/admin/AdminToastProvider';
import { BRAND } from '@/lib/brand';

export function ProductToggle({ productId, active }: { productId: string; active: boolean }) {
  const [checked, setChecked] = useState(active);
  const [isPending, startTransition] = useTransition();
  const toast = useAdminToast();

  return (
    <Switch
      checked={checked}
      disabled={isPending}
      size="small"
      inputProps={{ 'aria-label': checked ? 'השהה מוצר' : 'הפעל מוצר' }}
      onChange={(e) => {
        const next = e.target.checked;
        setChecked(next);
        startTransition(async () => {
          const res = await toggleProductActive(productId, next);
          if (res.ok) toast.success(next ? 'המוצר הופעל' : 'המוצר הושהה');
          else {
            setChecked(!next); // roll back optimistic state
            toast.error(res.error);
          }
        });
      }}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': { color: BRAND.green },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: BRAND.green },
      }}
    />
  );
}

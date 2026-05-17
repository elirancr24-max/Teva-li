'use client';
import { Switch } from '@mui/material';
import { useTransition, useState } from 'react';
import { toggleProductActive } from '@/app/admin/actions';
import { BRAND } from '@/lib/brand';

export function ProductToggle({ productId, active }: { productId: string; active: boolean }) {
  const [checked, setChecked] = useState(active);
  const [isPending, startTransition] = useTransition();

  return (
    <Switch
      checked={checked}
      disabled={isPending}
      size="small"
      onChange={(e) => {
        const next = e.target.checked;
        setChecked(next);
        startTransition(() => toggleProductActive(productId, next));
      }}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': { color: BRAND.green },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: BRAND.green },
      }}
    />
  );
}

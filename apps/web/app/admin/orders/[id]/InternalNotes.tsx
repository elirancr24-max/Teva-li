'use client';
import { useState, useTransition } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { updateOrderInternalNotes } from '@/app/admin/actions';
import { useAdminToast } from '@/components/admin/AdminToastProvider';
import { BRAND } from '@/lib/brand';

export function InternalNotes({ orderId, initial }: { orderId: string; initial: string }) {
  const [value, setValue] = useState(initial);
  const [pending, start] = useTransition();
  const toast = useAdminToast();

  function save() {
    start(async () => {
      const res = await updateOrderInternalNotes(orderId, value);
      if (res.ok) toast.success('ההערות נשמרו');
      else toast.error(res.error);
    });
  }

  return (
    <Box>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        multiline
        minRows={4}
        fullWidth
        placeholder="הערות פנימיות (לא נראות ללקוח)…"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            bgcolor: '#fff',
            '& fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
            '&:hover fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
            '&.Mui-focused fieldset': { borderColor: BRAND.green, borderWidth: 2 },
          },
        }}
      />
      <Button
        onClick={save}
        disabled={pending || value === initial}
        sx={{
          mt: 1.5,
          bgcolor: BRAND.green,
          color: '#fff',
          borderRadius: 0,
          border: `2px solid ${BRAND.ink}`,
          fontFamily: 'monospace',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          px: 3,
          py: 1,
          boxShadow: 'none',
          '&:hover': { bgcolor: BRAND.greenDark, boxShadow: 'none' },
          '&.Mui-disabled': { bgcolor: '#ccc', color: '#666' },
        }}
      >
        {pending ? 'שומר…' : 'שמור הערות'}
      </Button>
    </Box>
  );
}

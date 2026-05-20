'use client';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { Box, Button } from '@mui/material';
import { deleteProduct } from '@/app/admin/actions';
import { useAdminToast } from '@/components/admin/AdminToastProvider';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { BRAND } from '@/lib/brand';

type Props = {
  productId: string;
  productName: string;
};

const btnBase = {
  borderRadius: 0,
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  px: 1.25,
  py: 0.5,
  minWidth: 0,
  boxShadow: 'none',
  lineHeight: 1.4,
};

export function RowActions({ productId, productName }: Props) {
  const [pending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const toast = useAdminToast();

  function handleConfirm() {
    startTransition(async () => {
      const res = await deleteProduct(productId);
      if (res.ok) {
        toast.success(`"${productName}" נמחק`);
        setConfirmOpen(false);
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 0.75 }}>
        <Button
          component={Link}
          href={`/admin/products/${productId}/edit`}
          variant="outlined"
          size="small"
          sx={{
            ...btnBase,
            border: `2px solid ${BRAND.ink}`,
            color: BRAND.ink,
            bgcolor: '#fff',
            '&:hover': { borderColor: BRAND.ink, bgcolor: '#f0efec' },
          }}
        >
          ערוך
        </Button>
        <Button
          type="button"
          variant="outlined"
          size="small"
          disabled={pending}
          onClick={() => setConfirmOpen(true)}
          sx={{
            ...btnBase,
            border: '2px solid #c0392b',
            color: '#c0392b',
            bgcolor: '#fff',
            '&:hover': { borderColor: '#c0392b', bgcolor: '#fff5f4' },
          }}
        >
          מחק
        </Button>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        title="מחיקת מוצר"
        message={`למחוק את "${productName}"? פעולה זו אינה הפיכה.`}
        confirmLabel="מחק"
        destructive
        pending={pending}
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

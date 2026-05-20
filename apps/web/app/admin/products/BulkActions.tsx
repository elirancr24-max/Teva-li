'use client';
import { useState, type FormEvent } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { BRAND } from '@/lib/brand';

const bulkBtnSx = {
  borderRadius: 0,
  border: `2px solid ${BRAND.ink}`,
  bgcolor: '#fff',
  color: BRAND.ink,
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  px: 1.5,
  py: 0.5,
  boxShadow: 'none',
  '&:hover': { bgcolor: '#f0efec' },
};

type Props = {
  activate: (formData: FormData) => Promise<void> | void;
  deactivate: (formData: FormData) => Promise<void> | void;
  remove: (formData: FormData) => Promise<void> | void;
};

export function BulkActions({ activate, deactivate, remove }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingForm, setPendingForm] = useState<FormData | null>(null);

  function onDeleteClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const data = new FormData(form);
    const count = data.getAll('selected').length;
    if (count === 0) return;
    setPendingForm(data);
    setConfirmOpen(true);
  }

  function confirmDelete() {
    if (pendingForm) void remove(pendingForm);
    setPendingForm(null);
    setConfirmOpen(false);
  }

  const selectedCount = pendingForm?.getAll('selected').length ?? 0;

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: BRAND.ink,
            alignSelf: 'center',
          }}
        >
          פעולות מרובות:
        </Typography>
        <Button type="submit" formAction={activate} sx={bulkBtnSx}>הפעל</Button>
        <Button type="submit" formAction={deactivate} sx={bulkBtnSx}>השהה</Button>
        <Button
          type="button"
          onClick={onDeleteClick}
          sx={{ ...bulkBtnSx, borderColor: '#c0392b', color: '#c0392b', '&:hover': { bgcolor: '#fff5f4' } }}
        >
          מחק
        </Button>
      </Box>

      <ConfirmDialog
        open={confirmOpen}
        title="מחיקה מרובה"
        message={`למחוק ${selectedCount} מוצרים? פעולה זו אינה הפיכה.`}
        confirmLabel="מחק הכל"
        destructive
        onConfirm={confirmDelete}
        onCancel={() => { setPendingForm(null); setConfirmOpen(false); }}
      />
    </>
  );
}

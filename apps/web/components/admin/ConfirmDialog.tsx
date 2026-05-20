'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { BRAND } from '@/lib/brand';

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'אישור',
  cancelLabel = 'ביטול',
  destructive = false,
  pending = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={pending ? undefined : onCancel}
      dir="rtl"
      PaperProps={{ sx: { borderRadius: 0, border: `2px solid ${BRAND.ink}` } }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'monospace',
          fontSize: 12,
          letterSpacing: '0.12em',
          fontWeight: 700,
          textTransform: 'uppercase',
          borderBottom: `2px solid ${BRAND.ink}`,
          py: 2,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2, mt: 1, minWidth: { xs: 'unset', sm: 380 } }}>
        <Typography sx={{ fontSize: 14 }}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, borderTop: `2px solid ${BRAND.ink}`, gap: 1.5 }}>
        <Button
          onClick={onCancel}
          disabled={pending}
          sx={{
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            bgcolor: BRAND.paper,
            color: BRAND.ink,
            px: 2.5,
            py: 1,
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.12em',
            fontWeight: 700,
            textTransform: 'uppercase',
            '&:hover': { bgcolor: '#f0efec' },
          }}
        >
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={pending}
          sx={{
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            bgcolor: destructive ? '#b00020' : BRAND.green,
            color: BRAND.paper,
            px: 2.5,
            py: 1,
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.12em',
            fontWeight: 700,
            textTransform: 'uppercase',
            '&:hover': { bgcolor: destructive ? '#8a0019' : BRAND.greenDark },
          }}
        >
          {pending ? '...' : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

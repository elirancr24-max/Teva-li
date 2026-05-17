'use client';
import { useTransition } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { updateKayakStatus } from '@/app/admin/actions';
import { BRAND } from '@/lib/brand';
import type { KayakOrder } from '@/types/db';

const STATUS_HE: Record<string, string> = {
  pending: 'ממתין', approved: 'אושר', in_prep: 'בהכנה',
  ready: 'מוכן', delivered: 'נמסר', cancelled: 'בוטל',
};
const STATUS_COLOR: Record<string, string> = {
  pending: '#f0a500', approved: BRAND.green, in_prep: '#3b82f6',
  ready: '#22c55e', delivered: '#888', cancelled: '#ef4444',
};

function fmt(cents: number | null) {
  return cents ? `₪${(cents / 100).toFixed(0)}` : '—';
}

export function KayakCard({ kayak }: { kayak: KayakOrder }) {
  const [isPending, startTransition] = useTransition();
  const isPendingApproval = kayak.status === 'pending';

  return (
    <Box sx={{ border: `2px solid ${BRAND.ink}` }}>
      {/* Header */}
      <Box
        sx={{
          p: '16px 20px',
          bgcolor: isPendingApproval ? '#fff3cd' : '#f0efec',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `2px solid ${BRAND.ink}`,
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
            {kayak.id.slice(0, 8)}
          </Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 16, color: BRAND.ink }}>
            {kayak.event_type ?? 'אירוע'} · {kayak.delivery_address ?? '—'}
          </Typography>
        </Box>
        <Box
          component="span"
          sx={{
            px: 1.5, py: 0.5,
            bgcolor: STATUS_COLOR[kayak.status],
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {STATUS_HE[kayak.status]}
        </Box>
      </Box>

      {/* Details */}
      <Box sx={{ p: 2.5, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, borderBottom: `1px solid ${BRAND.ink}` }}>
        <Box>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>תאריך</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 15, mt: 0.5 }}>
            {kayak.event_date ? new Date(kayak.event_date).toLocaleDateString('he-IL') : '—'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>גודל / אורחים</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 15, mt: 0.5 }}>
            {kayak.size_id?.toUpperCase() ?? '—'} · {kayak.guests ?? '—'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>סכום</Typography>
          <Typography sx={{ fontWeight: 900, fontSize: 18, mt: 0.5 }}>{fmt(kayak.total_cents)}</Typography>
        </Box>
      </Box>

      {kayak.notes && (
        <Box sx={{ px: 2.5, py: 1.5, borderBottom: `1px solid #eee` }}>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: '#666' }}>📝 {kayak.notes}</Typography>
        </Box>
      )}

      {/* Actions */}
      <Box sx={{ px: 2.5, py: 1.5, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        {isPendingApproval && (
          <>
            <Button
              size="small"
              variant="contained"
              disabled={isPending}
              onClick={() => startTransition(() => updateKayakStatus(kayak.id, 'approved'))}
              sx={{ bgcolor: BRAND.green, '&:hover': { bgcolor: BRAND.greenDark }, fontWeight: 700, borderRadius: 0 }}
            >
              אשר
            </Button>
            <Button
              size="small"
              variant="outlined"
              disabled={isPending}
              onClick={() => startTransition(() => updateKayakStatus(kayak.id, 'cancelled'))}
              sx={{ borderColor: '#ef4444', color: '#ef4444', '&:hover': { borderColor: '#ef4444', bgcolor: '#fff5f5' }, borderRadius: 0 }}
            >
              דחה
            </Button>
          </>
        )}
        {kayak.status === 'approved' && (
          <Button
            size="small"
            variant="contained"
            disabled={isPending}
            onClick={() => startTransition(() => updateKayakStatus(kayak.id, 'in_prep'))}
            sx={{ bgcolor: '#3b82f6', '&:hover': { bgcolor: '#2563eb' }, fontWeight: 700, borderRadius: 0 }}
          >
            התחל הכנה
          </Button>
        )}
        {kayak.status === 'in_prep' && (
          <Button
            size="small"
            variant="contained"
            disabled={isPending}
            onClick={() => startTransition(() => updateKayakStatus(kayak.id, 'ready'))}
            sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, fontWeight: 700, borderRadius: 0 }}
          >
            מוכן למסירה
          </Button>
        )}
        {kayak.status === 'ready' && (
          <Button
            size="small"
            variant="contained"
            disabled={isPending}
            onClick={() => startTransition(() => updateKayakStatus(kayak.id, 'delivered'))}
            sx={{ bgcolor: '#888', '&:hover': { bgcolor: '#666' }, fontWeight: 700, borderRadius: 0 }}
          >
            נמסר
          </Button>
        )}
      </Box>
    </Box>
  );
}

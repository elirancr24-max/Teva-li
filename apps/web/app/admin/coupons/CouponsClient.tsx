'use client';

import { useState, useTransition } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { createCoupon, deleteCoupon, toggleCoupon } from '@/app/admin/actions';
import { BRAND } from '@/lib/brand';

export type Coupon = {
  id: string;
  code: string;
  discount_pct: number;
  active: boolean;
  expires_at: string | null;
  created_at: string;
};

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const monoHeader = {
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: '0.12em',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  py: 1.5,
};

function CouponToggle({ id, active }: { id: string; active: boolean }) {
  const [checked, setChecked] = useState(active);
  const [pending, start] = useTransition();
  return (
    <Switch
      checked={checked}
      disabled={pending}
      size="small"
      onChange={(e) => {
        const next = e.target.checked;
        setChecked(next);
        start(() => {
          toggleCoupon(id, next);
        });
      }}
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': { color: BRAND.green },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: BRAND.green },
      }}
    />
  );
}

function DeleteButton({ id, code }: { id: string; code: string }) {
  const [pending, start] = useTransition();
  return (
    <IconButton
      size="small"
      disabled={pending}
      onClick={() => {
        if (confirm(`למחוק את הקופון ${code}?`)) {
          start(() => {
            deleteCoupon(id);
          });
        }
      }}
      sx={{ color: BRAND.ink, '&:hover': { color: '#c0392b' } }}
      aria-label={`מחק קופון ${code}`}
    >
      <DeleteOutlineIcon fontSize="small" />
    </IconButton>
  );
}

function CreateDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [code, setCode] = useState('');
  const [pct, setPct] = useState('10');
  const [expires, setExpires] = useState('');
  const [active, setActive] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      bgcolor: '#fff',
      '& fieldset': { borderColor: '#0D0D0D', borderWidth: '1.5px' },
      '&:hover fieldset': { borderColor: '#0D0D0D' },
      '&.Mui-focused fieldset': { borderColor: BRAND.green, borderWidth: '2px' },
    },
  };

  const labelSx = {
    fontFamily: 'monospace',
    fontSize: 10,
    letterSpacing: '0.12em',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    color: BRAND.ink,
    mb: 1,
    display: 'block',
  };

  function submit() {
    setError(null);
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setError('קוד נדרש');
      return;
    }
    const pctNum = Number(pct);
    if (!Number.isFinite(pctNum) || pctNum < 1 || pctNum > 100) {
      setError('הנחה חייבת להיות בין 1 ל-100');
      return;
    }
    start(async () => {
      const res = await createCoupon({
        code: trimmed,
        discount_pct: Math.round(pctNum),
        active,
        expires_at: expires ? expires : null,
      });
      if (res && 'error' in res && res.error) {
        setError(res.error);
      }
      // On success the server action redirects → component unmounts.
    });
  }

  return (
    <Dialog
      open={open}
      onClose={pending ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 0,
          border: `2px solid ${BRAND.ink}`,
          bgcolor: '#fff',
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: `2px solid ${BRAND.ink}`, py: 2 }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: '0.18em',
            color: '#888',
            textTransform: 'uppercase',
          }}
        >
          new coupon
        </Typography>
        <Typography sx={{ fontWeight: 900, fontSize: 24, color: BRAND.ink, letterSpacing: '-0.02em' }}>
          קופון חדש.
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 1 }}>
        <Box sx={{ display: 'grid', gap: 2.5, mt: 1 }}>
          <Box>
            <Typography component="label" htmlFor="coupon-code" sx={labelSx}>
              קוד
            </Typography>
            <TextField
              id="coupon-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              fullWidth
              size="small"
              variant="outlined"
              autoFocus
              placeholder="WELCOME10"
              sx={fieldSx}
              inputProps={{
                style: {
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                },
              }}
            />
          </Box>

          <Box>
            <Typography component="label" htmlFor="coupon-pct" sx={labelSx}>
              הנחה (%)
            </Typography>
            <TextField
              id="coupon-pct"
              value={pct}
              onChange={(e) => setPct(e.target.value)}
              fullWidth
              size="small"
              type="number"
              variant="outlined"
              inputProps={{ min: 1, max: 100, step: 1, inputMode: 'numeric' }}
              sx={fieldSx}
            />
          </Box>

          <Box>
            <Typography component="label" htmlFor="coupon-exp" sx={labelSx}>
              פג תוקף (אופציונלי)
            </Typography>
            <TextField
              id="coupon-exp"
              value={expires}
              onChange={(e) => setExpires(e.target.value)}
              fullWidth
              size="small"
              type="date"
              variant="outlined"
              sx={fieldSx}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: BRAND.green },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: BRAND.green },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: BRAND.ink,
                }}
              >
                פעיל
              </Typography>
            }
          />

          {error && (
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#c0392b',
                letterSpacing: '0.05em',
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2.5, borderTop: `2px solid ${BRAND.ink}`, gap: 1 }}>
        <Button
          onClick={onClose}
          disabled={pending}
          sx={{
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: BRAND.ink,
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            px: 3,
            '&:hover': { bgcolor: '#f0efec' },
          }}
        >
          ביטול
        </Button>
        <Button
          onClick={submit}
          disabled={pending}
          variant="contained"
          sx={{
            bgcolor: BRAND.green,
            color: '#fff',
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 800,
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            px: 3,
            boxShadow: 'none',
            '&:hover': { bgcolor: BRAND.greenDark, boxShadow: 'none' },
          }}
        >
          {pending ? 'יוצר…' : 'צור קופון'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function CouponsClient({ coupons }: { coupons: Coupon[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2.5 }}>
        <Button
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            bgcolor: BRAND.green,
            color: '#fff',
            fontFamily: 'monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 800,
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            px: 3,
            py: 1.1,
            boxShadow: 'none',
            '&:hover': { bgcolor: BRAND.greenDark, boxShadow: 'none' },
          }}
        >
          קופון חדש
        </Button>
      </Box>

      <Paper
        variant="outlined"
        sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, overflow: 'hidden' }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0efec' }}>
              <TableCell sx={monoHeader}>קוד</TableCell>
              <TableCell sx={monoHeader}>הנחה</TableCell>
              <TableCell sx={monoHeader}>פעיל</TableCell>
              <TableCell sx={monoHeader}>פג תוקף</TableCell>
              <TableCell sx={monoHeader} align="left">
                פעולות
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coupons.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    py: 6,
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontSize: 12,
                    letterSpacing: '0.12em',
                    color: '#888',
                    textTransform: 'uppercase',
                  }}
                >
                  אין קופונים. צור אחד חדש.
                </TableCell>
              </TableRow>
            )}
            {coupons.map((c) => (
              <TableRow
                key={c.id}
                sx={{
                  opacity: c.active ? 1 : 0.45,
                  '&:hover': { bgcolor: '#fafafa' },
                }}
              >
                <TableCell>
                  <Typography
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: 14,
                      letterSpacing: '0.08em',
                      color: BRAND.ink,
                    }}
                  >
                    {c.code}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 1,
                      py: 0.5,
                      border: `1px solid ${BRAND.ink}`,
                      fontFamily: 'monospace',
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      display: 'inline-block',
                    }}
                  >
                    -{c.discount_pct}%
                  </Box>
                </TableCell>
                <TableCell>
                  <CouponToggle id={c.id} active={c.active} />
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    color: c.expires_at ? BRAND.ink : '#aaa',
                  }}
                >
                  {fmtDate(c.expires_at)}
                </TableCell>
                <TableCell align="left">
                  <DeleteButton id={c.id} code={c.code} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <CreateDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

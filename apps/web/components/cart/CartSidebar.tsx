'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/store';
import { decrementAmount, incrementAmount, removeItem } from '@/store/slices/cartSlice';
import { BRAND } from '@/lib/theme';

const UNIT_LABEL: Record<string, string> = {
  kg: 'ק״ג',
  unit: 'יח׳',
  bunch: 'צרור',
};

export function CartSidebar() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.priceCents * i.amount, 0),
    [items],
  );

  const formatPrice = (cents: number) => `₪${(cents / 100).toFixed(2)}`;

  return (
    <Paper
      elevation={2}
      sx={{
        width: 280,
        bgcolor: BRAND.brown,
        color: '#fff',
        position: 'sticky',
        top: 160,
        alignSelf: 'flex-start',
        borderRadius: 2,
        overflow: 'hidden',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        maxHeight: 'calc(100vh - 180px)',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.18)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: 700, fontSize: 16 }}>סל הקניות שלי</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: 16, color: '#FFD60A' }}>
            {formatPrice(total)}
          </Typography>
        </Stack>
        <Button
          startIcon={<RefreshIcon />}
          size="small"
          sx={{
            mt: 1,
            color: '#fff',
            opacity: 0.85,
            justifyContent: 'flex-start',
            px: 0,
            '&:hover': { opacity: 1, bgcolor: 'transparent' },
          }}
        >
          טעינת הזמנה קודמת
        </Button>
      </Box>

      {/* Body */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: items.length === 0 ? 3 : 1.5 }}>
        {items.length === 0 ? (
          <Stack alignItems="center" spacing={1.5} sx={{ py: 4 }}>
            <ShoppingCartIcon sx={{ fontSize: 48, opacity: 0.6 }} />
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>סל הקניות שלכם ריק</Typography>
            <Typography sx={{ fontSize: 12, opacity: 0.7, textAlign: 'center' }}>
              התחילו להוסיף מוצרים
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={1}>
            {items.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.06)',
                  borderRadius: 1,
                  p: 1,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, flex: 1 }}>
                    {item.product.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(removeItem(item.productId))}
                    sx={{ color: '#fff', opacity: 0.6, p: 0.25 }}
                    aria-label="הסרה"
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.5 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconButton
                      size="small"
                      onClick={() => dispatch(decrementAmount(item.productId))}
                      sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: '#fff', p: 0.5 }}
                    >
                      <RemoveIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Typography sx={{ fontSize: 12, minWidth: 50, textAlign: 'center' }}>
                      {item.amount} {UNIT_LABEL[item.product.unit]}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => dispatch(incrementAmount(item.productId))}
                      sx={{ bgcolor: BRAND.green, color: '#fff', p: 0.5, '&:hover': { bgcolor: BRAND.greenDark } }}
                    >
                      <AddIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Stack>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#FFD60A' }}>
                    {formatPrice(item.product.priceCents * item.amount)}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.18)' }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography sx={{ fontSize: 13, opacity: 0.85 }}>סה״כ</Typography>
          <Typography sx={{ fontSize: 15, fontWeight: 800 }}>{formatPrice(total)}</Typography>
        </Stack>
        <Button
          component={Link}
          href="/checkout"
          fullWidth
          variant="contained"
          color="primary"
          disabled={items.length === 0}
          sx={{ mb: 1 }}
        >
          המשך לתשלום
        </Button>
        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.15)' }} />
        <Typography sx={{ fontSize: 10, opacity: 0.6, textAlign: 'center' }}>
          שערוך. עלות סופית לפי שקילה.
        </Typography>
      </Box>
    </Paper>
  );
}

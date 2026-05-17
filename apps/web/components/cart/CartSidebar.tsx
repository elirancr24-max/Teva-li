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
} from '@mui/material';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  decrementAmount,
  incrementAmount,
  removeItem,
} from '@/store/slices/cartSlice';
import { BRAND } from '@/lib/brand';

const UNIT_LABEL: Record<string, string> = {
  kg: 'ק״ג',
  unit: 'יח׳',
  bunch: 'צרור',
};

// Mobile cart is delivered via a separate bottom drawer component
// (out of scope here). The sidebar is desktop-only.
export function CartSidebar() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.priceCents * i.amount, 0),
    [items],
  );

  const formatPrice = (cents: number) => `₪${(cents / 100).toFixed(2)}`;
  const isEmpty = items.length === 0;

  return (
    <Paper
      elevation={1}
      sx={{
        width: 320,
        position: 'sticky',
        top: 120,
        right: 0,
        alignSelf: 'flex-start',
        height: 'calc(100vh - 140px)',
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
      }}
    >
      {/* Header (brown) */}
      <Box sx={{ bgcolor: BRAND.brown, color: '#fff', p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <ShoppingCartIcon sx={{ fontSize: 22 }} />
          <Box
            sx={{
              minWidth: 22,
              height: 22,
              borderRadius: '50%',
              bgcolor: BRAND.green,
              color: '#fff',
              fontSize: 12,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 0.75,
            }}
          >
            {items.length}
          </Box>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>סל הקניות שלי</Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 800,
            color: '#fff',
            mt: 1.5,
            letterSpacing: '-0.01em',
          }}
        >
          {formatPrice(total)}
        </Typography>

        <Button
          component={Link}
          href="/checkout"
          fullWidth
          disabled={isEmpty}
          sx={{
            mt: 2,
            bgcolor: BRAND.green,
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            py: 1.1,
            '&:hover': { bgcolor: BRAND.greenDark },
            '&.Mui-disabled': {
              bgcolor: 'rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.55)',
            },
          }}
        >
          המשך לתשלום
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<RefreshIcon />}
          sx={{
            mt: 1,
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.4)',
            fontWeight: 600,
            fontSize: 13,
            '&:hover': {
              borderColor: '#fff',
              bgcolor: 'rgba(255,255,255,0.06)',
            },
          }}
        >
          טעינת הזמנה קודמת
        </Button>
      </Box>

      {/* Scrollable middle */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: isEmpty ? 3 : 1.5 }}>
        {isEmpty ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1.25}
            sx={{ height: '100%', textAlign: 'center', color: 'text.secondary' }}
          >
            <ShoppingBasketOutlinedIcon sx={{ fontSize: 80, color: 'grey.400' }} />
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'text.secondary' }}>
              סל הקניות שלכם ריק
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
              התחילו להוסיף מוצרים
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={1}>
            {items.map((item) => (
              <Box
                key={item.productId}
                sx={{
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 1.5,
                  p: 1,
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                {/* Thumb */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    bgcolor: 'grey.100',
                    backgroundImage: item.product.imageUrl
                      ? `url(${item.product.imageUrl})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexShrink: 0,
                  }}
                />
                {/* Name + price */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: BRAND.ink,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.product.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                    {formatPrice(item.product.priceCents * item.amount)}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => dispatch(decrementAmount(item.productId))}
                      sx={{
                        bgcolor: 'grey.100',
                        color: BRAND.ink,
                        p: 0.5,
                        '&:hover': { bgcolor: 'grey.200' },
                      }}
                      aria-label="הפחת"
                    >
                      <RemoveIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Typography sx={{ fontSize: 12, minWidth: 50, textAlign: 'center' }}>
                      {item.amount} {UNIT_LABEL[item.product.unit]}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => dispatch(incrementAmount(item.productId))}
                      sx={{
                        bgcolor: BRAND.green,
                        color: '#fff',
                        p: 0.5,
                        '&:hover': { bgcolor: BRAND.greenDark },
                      }}
                      aria-label="הוסף"
                    >
                      <AddIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Stack>
                </Box>
                {/* Remove */}
                <IconButton
                  size="small"
                  onClick={() => dispatch(removeItem(item.productId))}
                  sx={{ color: 'grey.500', p: 0.5, alignSelf: 'flex-start' }}
                  aria-label="הסרה"
                >
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Paper>
  );
}

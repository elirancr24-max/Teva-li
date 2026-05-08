'use client';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem, decrementAmount, incrementAmount } from '@/store/slices/cartSlice';
import { BRAND } from '@/lib/theme';
import type { Product } from '@/types/shop';

const KIND_EMOJI: Record<string, string> = {
  tomato: '🍅',
  cucumber: '🥒',
  pepper: '🌶️',
  pumpkin: '🎃',
  artichoke: '🌿',
  asparagus: '🌱',
  pineapple: '🍍',
  watermelon: '🍉',
  melon: '🍈',
  mango: '🥭',
};

const UNIT_LABEL: Record<string, string> = {
  kg: 'ק״ג',
  unit: 'יח׳',
  bunch: 'צרור',
};

export function ProductDetail({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((s) => s.cart.items.find((i) => i.productId === product.id));
  const inCart = !!cartItem;

  const formatPrice = (cents: number) => `₪${(cents / 100).toFixed(2)}`;
  const unitLabel = UNIT_LABEL[product.unit] ?? product.weight ?? '';

  const discountPct =
    product.originalPriceCents && product.originalPriceCents > product.priceCents
      ? Math.round((1 - product.priceCents / product.originalPriceCents) * 100)
      : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Paper
          sx={{
            flex: 1,
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: { xs: 120, md: 200 },
            bgcolor: BRAND.greenLight,
          }}
        >
          {KIND_EMOJI[product.kind] ?? '🍎'}
        </Paper>

        <Stack spacing={2} sx={{ flex: 1 }}>
          {product.quality === 'premium' && (
            <Box>
              <Chip
                label="פרימיום"
                sx={{ bgcolor: BRAND.brown, color: '#fff', fontWeight: 700 }}
              />
            </Box>
          )}
          <Typography variant="h1" sx={{ fontSize: 32, fontWeight: 800 }}>
            {product.name}
          </Typography>
          {product.fullName && (
            <Typography sx={{ color: 'text.secondary' }}>{product.fullName}</Typography>
          )}

          <Stack direction="row" spacing={2} alignItems="baseline">
            <Typography sx={{ fontSize: 36, fontWeight: 800, color: BRAND.green }}>
              {formatPrice(product.priceCents)}
            </Typography>
            <Typography sx={{ fontSize: 16, color: 'text.secondary' }}>/ {unitLabel}</Typography>
            {discountPct > 0 && product.originalPriceCents && (
              <Typography sx={{ fontSize: 14, color: 'text.secondary', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPriceCents)}
              </Typography>
            )}
          </Stack>

          {discountPct > 0 && (
            <Chip
              label={`חיסכון ${discountPct}%`}
              sx={{ bgcolor: BRAND.green, color: '#fff', fontWeight: 700, alignSelf: 'flex-start' }}
            />
          )}

          <Box sx={{ pt: 2 }}>
            {inCart ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="outlined"
                  onClick={() => dispatch(decrementAmount(product.id))}
                  startIcon={<RemoveIcon />}
                >
                  הפחת
                </Button>
                <Typography sx={{ fontSize: 18, fontWeight: 700, minWidth: 80, textAlign: 'center' }}>
                  {cartItem!.amount} {unitLabel}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => dispatch(incrementAmount(product.id))}
                  startIcon={<AddIcon />}
                >
                  הוסף
                </Button>
              </Stack>
            ) : (
              <Button
                variant="contained"
                size="large"
                startIcon={<AddIcon />}
                onClick={() => dispatch(addItem({ product }))}
              >
                הוספה לסל
              </Button>
            )}
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

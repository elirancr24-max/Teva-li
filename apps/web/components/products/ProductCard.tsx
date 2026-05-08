'use client';
import { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  IconButton,
  Stack,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem, decrementAmount, incrementAmount } from '@/store/slices/cartSlice';
import { BRAND } from '@/lib/theme';
import type { Product } from '@/types/shop';

const KIND_GLOW: Record<string, string> = {
  tomato: 'radial-gradient(circle at 50% 50%, #FFB4B4 0%, transparent 60%)',
  cucumber: 'radial-gradient(circle at 50% 50%, #B8E0A1 0%, transparent 60%)',
  pepper: 'radial-gradient(circle at 50% 50%, #FFD9A8 0%, transparent 60%)',
  pumpkin: 'radial-gradient(circle at 50% 50%, #FFD08A 0%, transparent 60%)',
  artichoke: 'radial-gradient(circle at 50% 50%, #C9A1FF 0%, transparent 60%)',
  asparagus: 'radial-gradient(circle at 50% 50%, #BCE89A 0%, transparent 60%)',
  pineapple: 'radial-gradient(circle at 50% 50%, #FFE680 0%, transparent 60%)',
  watermelon: 'radial-gradient(circle at 50% 50%, #FFA0A0 0%, transparent 60%)',
  melon: 'radial-gradient(circle at 50% 50%, #C5E89A 0%, transparent 60%)',
  mango: 'radial-gradient(circle at 50% 50%, #FFC97A 0%, transparent 60%)',
};

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

export function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((s) => s.cart.items.find((i) => i.productId === product.id));
  const inCart = !!cartItem;

  const discountPct =
    product.originalPriceCents && product.originalPriceCents > product.priceCents
      ? Math.round((1 - product.priceCents / product.originalPriceCents) * 100)
      : 0;

  const isPremium = product.quality === 'premium';
  const unitLabel = UNIT_LABEL[product.unit] ?? product.weight ?? '';

  const formatPrice = (cents: number) =>
    `₪${(cents / 100).toFixed(2)}`;

  return (
    <Card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        position: 'relative',
        p: 2,
        pt: 2.5,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'box-shadow 200ms, transform 200ms',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Discount triangle (top-left in RTL = visual left) */}
      {discountPct > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderTop: `52px solid ${BRAND.green}`,
            borderRight: '52px solid transparent',
            zIndex: 2,
          }}
        />
      )}
      {discountPct > 0 && (
        <Typography
          sx={{
            position: 'absolute',
            top: 6,
            left: 6,
            zIndex: 3,
            color: '#fff',
            fontSize: 11,
            fontWeight: 800,
            transform: 'rotate(-45deg)',
            transformOrigin: 'left top',
            mt: 1,
            ml: 0.5,
          }}
        >
          הנחה
        </Typography>
      )}

      {/* Premium pill (top-right in RTL = visual right) */}
      {isPremium && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: BRAND.brown,
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            px: 1,
            py: 0.5,
            borderRadius: 0.5,
            zIndex: 2,
          }}
        >
          פרימיום
        </Box>
      )}

      {/* Bookmark */}
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          top: isPremium ? 36 : 6,
          right: 4,
          color: 'rgba(0,0,0,0.35)',
          zIndex: 2,
        }}
        aria-label="שמירה"
      >
        <BookmarkBorderIcon fontSize="small" />
      </IconButton>

      {/* Image area */}
      <Box
        sx={{
          height: 130,
          mt: 1,
          mb: 1.5,
          borderRadius: 2,
          background: KIND_GLOW[product.kind] ?? 'radial-gradient(circle, #f5f5f5 0%, transparent 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
        }}
      >
        {KIND_EMOJI[product.kind] ?? '🍎'}
      </Box>

      {/* Name */}
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: 600,
          textAlign: 'center',
          color: 'text.primary',
          minHeight: 44,
          lineHeight: 1.3,
          mb: 1,
        }}
      >
        {product.name}
      </Typography>

      {/* Price */}
      <Stack direction="row" spacing={1} alignItems="baseline" justifyContent="center" sx={{ mb: 1.5 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 800, color: BRAND.green }}>
          {formatPrice(product.priceCents)}
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>/ {unitLabel}</Typography>
        {discountPct > 0 && product.originalPriceCents && (
          <Typography
            sx={{
              fontSize: 12,
              color: 'text.secondary',
              textDecoration: 'line-through',
            }}
          >
            {formatPrice(product.originalPriceCents)}
          </Typography>
        )}
      </Stack>

      {/* Bottom action: stepper if in cart, else Add button on hover */}
      <Box sx={{ mt: 'auto' }}>
        {inCart ? (
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => dispatch(decrementAmount(product.id))}
              sx={{ bgcolor: BRAND.greenLight, color: BRAND.greenDark }}
              aria-label="הפחתה"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
              {cartItem!.amount} {unitLabel}
            </Typography>
            <IconButton
              size="small"
              onClick={() => dispatch(incrementAmount(product.id))}
              sx={{ bgcolor: BRAND.green, color: '#fff', '&:hover': { bgcolor: BRAND.greenDark } }}
              aria-label="הוספה"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => dispatch(addItem({ product }))}
            sx={{
              opacity: hover ? 1 : 0.92,
              transition: 'opacity 160ms',
            }}
          >
            הוספה לסל
          </Button>
        )}
      </Box>
    </Card>
  );
}

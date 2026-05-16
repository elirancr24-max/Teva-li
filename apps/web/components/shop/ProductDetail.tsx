'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Paper,
  Chip,
  ButtonBase,
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

export function ProductDetail({
  product,
  images,
}: {
  product: Product;
  images?: string[];
}) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((s) => s.cart.items.find((i) => i.productId === product.id));
  const inCart = !!cartItem;

  // Build gallery: prefer explicit images prop, else fall back to product.imageUrl.
  const gallery = (images && images.length > 0
    ? images
    : product.imageUrl
      ? [product.imageUrl]
      : []) as string[];

  const [activeIdx, setActiveIdx] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const activeSrc = gallery[activeIdx];
  const showActiveImage = !!activeSrc && !imgError[activeIdx];

  const formatPrice = (cents: number) => `₪${(cents / 100).toFixed(2)}`;
  const unitLabel = UNIT_LABEL[product.unit] ?? product.weight ?? '';

  const discountPct =
    product.originalPriceCents && product.originalPriceCents > product.priceCents
      ? Math.round((1 - product.priceCents / product.originalPriceCents) * 100)
      : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Paper
            sx={{
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: { xs: 120, md: 200 },
              bgcolor: showActiveImage ? '#fff' : BRAND.greenLight,
              overflow: 'hidden',
              p: showActiveImage ? 2 : 0,
              boxShadow: 'none',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {showActiveImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeSrc}
                alt={product.name}
                onError={() =>
                  setImgError((prev) => ({ ...prev, [activeIdx]: true }))
                }
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Box component="span" aria-hidden="true">
                {KIND_EMOJI[product.kind] ?? '🍎'}
              </Box>
            )}
          </Paper>

          {gallery.length > 1 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ overflowX: 'auto', pb: 0.5 }}
              role="tablist"
              aria-label="תמונות מוצר"
            >
              {gallery.map((src, i) => {
                const isActive = i === activeIdx;
                const failed = !!imgError[i];
                return (
                  <ButtonBase
                    key={`${src}-${i}`}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`תמונה ${i + 1}`}
                    aria-selected={isActive}
                    role="tab"
                    sx={{
                      width: 72,
                      height: 72,
                      flexShrink: 0,
                      borderRadius: 1.5,
                      overflow: 'hidden',
                      bgcolor: '#fff',
                      border: isActive
                        ? `2px solid ${BRAND.green}`
                        : '1px solid rgba(0,0,0,0.08)',
                      p: 0.5,
                    }}
                  >
                    {failed ? (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 28,
                        }}
                        aria-hidden="true"
                      >
                        {KIND_EMOJI[product.kind] ?? '🍎'}
                      </Box>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        onError={() =>
                          setImgError((prev) => ({ ...prev, [i]: true }))
                        }
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                        }}
                      />
                    )}
                  </ButtonBase>
                );
              })}
            </Stack>
          )}
        </Box>

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

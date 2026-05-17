'use client';
import { useState, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
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
import { useAppDispatch, useAppSelector } from '@/store';
import { addItem, decrementAmount, incrementAmount } from '@/store/slices/cartSlice';
import { BRAND } from '@/lib/brand';
import type { Product } from '@/types/shop';

const KIND_GLOW: Record<string, string> = {
  // Vegetables
  tomato:      'radial-gradient(circle at 50% 50%, #FFB4B4 0%, transparent 60%)',
  cucumber:    'radial-gradient(circle at 50% 50%, #B8E0A1 0%, transparent 60%)',
  pepper:      'radial-gradient(circle at 50% 50%, #FFD9A8 0%, transparent 60%)',
  pumpkin:     'radial-gradient(circle at 50% 50%, #FFD08A 0%, transparent 60%)',
  artichoke:   'radial-gradient(circle at 50% 50%, #C9A1FF 0%, transparent 60%)',
  asparagus:   'radial-gradient(circle at 50% 50%, #BCE89A 0%, transparent 60%)',
  eggplant:    'radial-gradient(circle at 50% 50%, #D4A1FF 0%, transparent 60%)',
  carrot:      'radial-gradient(circle at 50% 50%, #FFB97A 0%, transparent 60%)',
  onion:       'radial-gradient(circle at 50% 50%, #FFE68A 0%, transparent 60%)',
  garlic:      'radial-gradient(circle at 50% 50%, #F5F0D8 0%, transparent 60%)',
  cabbage:     'radial-gradient(circle at 50% 50%, #BCE89A 0%, transparent 60%)',
  herb:        'radial-gradient(circle at 50% 50%, #A8D88A 0%, transparent 60%)',
  beet:        'radial-gradient(circle at 50% 50%, #E89ACA 0%, transparent 60%)',
  root:        'radial-gradient(circle at 50% 50%, #D5E8B4 0%, transparent 60%)',
  corn:        'radial-gradient(circle at 50% 50%, #FFE680 0%, transparent 60%)',
  potato:      'radial-gradient(circle at 50% 50%, #E8D5B7 0%, transparent 60%)',
  leek:        'radial-gradient(circle at 50% 50%, #BCE89A 0%, transparent 60%)',
  // Fruits – peeled/whole
  pineapple:    'radial-gradient(circle at 50% 50%, #FFE680 0%, transparent 60%)',
  watermelon:   'radial-gradient(circle at 50% 50%, #FFA0A0 0%, transparent 60%)',
  melon:        'radial-gradient(circle at 50% 50%, #C5E89A 0%, transparent 60%)',
  mango:        'radial-gradient(circle at 50% 50%, #FFC97A 0%, transparent 60%)',
  strawberry:   'radial-gradient(circle at 50% 50%, #FFB4CC 0%, transparent 60%)',
  'grape-green':'radial-gradient(circle at 50% 50%, #B8E0A1 0%, transparent 60%)',
  'grape-black':'radial-gradient(circle at 50% 50%, #C49BD5 0%, transparent 60%)',
  kiwi:         'radial-gradient(circle at 50% 50%, #A8D46C 0%, transparent 60%)',
  apple:        'radial-gradient(circle at 50% 50%, #FFB4B4 0%, transparent 60%)',
  pear:         'radial-gradient(circle at 50% 50%, #C5E89A 0%, transparent 60%)',
  peach:        'radial-gradient(circle at 50% 50%, #FFDBA8 0%, transparent 60%)',
  apricot:      'radial-gradient(circle at 50% 50%, #FFB97A 0%, transparent 60%)',
  nectarine:    'radial-gradient(circle at 50% 50%, #FFCBA8 0%, transparent 60%)',
  plum:         'radial-gradient(circle at 50% 50%, #C49BD5 0%, transparent 60%)',
  cherry:       'radial-gradient(circle at 50% 50%, #FFB4C0 0%, transparent 60%)',
  blueberry:    'radial-gradient(circle at 50% 50%, #9BA8E0 0%, transparent 60%)',
  berry:        'radial-gradient(circle at 50% 50%, #FFB4CC 0%, transparent 60%)',
  fig:          'radial-gradient(circle at 50% 50%, #C49BD5 0%, transparent 60%)',
  pomegranate:  'radial-gradient(circle at 50% 50%, #FF8080 0%, transparent 60%)',
  orange:       'radial-gradient(circle at 50% 50%, #FFD09A 0%, transparent 60%)',
  lemon:        'radial-gradient(circle at 50% 50%, #FFF08A 0%, transparent 60%)',
  pomelo:       'radial-gradient(circle at 50% 50%, #FFF08A 0%, transparent 60%)',
  coconut:      'radial-gradient(circle at 50% 50%, #E8D5B7 0%, transparent 60%)',
  banana:       'radial-gradient(circle at 50% 50%, #FFE680 0%, transparent 60%)',
  lychee:       'radial-gradient(circle at 50% 50%, #FFDDE0 0%, transparent 60%)',
  guava:        'radial-gradient(circle at 50% 50%, #E8C87A 0%, transparent 60%)',
  'passion-fruit': 'radial-gradient(circle at 50% 50%, #C9A1FF 0%, transparent 60%)',
  'cactus-pear': 'radial-gradient(circle at 50% 50%, #85C57A 0%, transparent 60%)',
  'mixed-salad': 'radial-gradient(circle at 50% 50%, #BCE89A 0%, transparent 60%)',
  // Boxes & extras
  'gift-box':   'radial-gradient(circle at 50% 50%, #FFD9A8 0%, transparent 60%)',
  extra:        'radial-gradient(circle at 50% 50%, #FFF0B4 0%, transparent 60%)',
};

const KIND_EMOJI: Record<string, string> = {
  // Vegetables
  tomato: '🍅', cucumber: '🥒', pepper: '🌶️', pumpkin: '🎃',
  artichoke: '🌿', asparagus: '🌱', eggplant: '🍆', carrot: '🥕',
  onion: '🧅', garlic: '🧄', cabbage: '🥬', herb: '🌿',
  beet: '🫐', root: '🌱', corn: '🌽', potato: '🥔', leek: '🌱',
  // Fruits
  pineapple: '🍍', watermelon: '🍉', melon: '🍈', mango: '🥭',
  strawberry: '🍓', 'grape-green': '🍇', 'grape-black': '🍇',
  kiwi: '🥝', apple: '🍎', pear: '🍐', peach: '🍑', apricot: '🍑',
  nectarine: '🍑', plum: '🫐', cherry: '🍒', blueberry: '🫐',
  berry: '🍓', fig: '🫐', pomegranate: '🍎', orange: '🍊',
  lemon: '🍋', pomelo: '🍋', coconut: '🥥', banana: '🍌',
  lychee: '🍈', guava: '🥭', 'passion-fruit': '🍈', 'cactus-pear': '🌵',
  'mixed-salad': '🥗',
  // Boxes & extras
  'gift-box': '🎁', extra: '✨',
};

const UNIT_LABEL: Record<string, string> = {
  kg: 'ק״ג',
  unit: 'יח׳',
  bunch: 'צרור',
};

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);
  const showImage = !!product.imageUrl && !imgError;
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((s) => s.cart.items.find((i) => i.productId === product.id));
  const inCart = !!cartItem;

  const isDiscount =
    !!product.originalPriceCents && product.originalPriceCents > product.priceCents;

  const isPremium = product.quality === 'premium';
  // Always prefer the explicit weight string (e.g. "500 גרם", "מגש", "ק״ג")
  // since that's what the admin edits per-product. Fallback to unit label.
  const unitLabel = (product.weight && product.weight.trim()) || UNIT_LABEL[product.unit] || '';

  const formatPrice = (cents: number) => `₪${(cents / 100).toFixed(2)}`;

  // Stop propagation so clicking inside controls doesn't navigate.
  const stop = (e: MouseEvent) => e.stopPropagation();
  const goToProduct = () => router.push(`/shop/${product.slug}`);

  return (
    <Card
      onClick={goToProduct}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToProduct();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={product.name}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 280,
        p: 1.25,
        pt: 1.5,
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        outline: 'none',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          transform: 'scale(1.01)',
        },
        '&:focus-visible': {
          boxShadow: `0 0 0 2px ${BRAND.green}`,
        },
      }}
    >
      {/* Discount triangle — top-left visual corner */}
      {isDiscount && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 56,
              height: 56,
              bgcolor: '#E53935',
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              zIndex: 2,
              borderTopLeftRadius: 8,
            }}
          />
          <Typography
            component="span"
            sx={{
              position: 'absolute',
              top: 8,
              left: 6,
              zIndex: 3,
              color: '#fff',
              fontSize: 11,
              fontWeight: 800,
              fontFamily: 'var(--font-heebo), Heebo, sans-serif',
              transform: 'rotate(-45deg)',
              transformOrigin: 'left top',
              pointerEvents: 'none',
            }}
          >
            הנחה
          </Typography>
        </>
      )}

      {/* Premium pill — top-right visual corner */}
      {isPremium && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            bgcolor: BRAND.brown,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            fontFamily: 'var(--font-heebo), Heebo, sans-serif',
            px: 1.25,
            py: '4px',
            borderRadius: '12px',
            zIndex: 2,
            lineHeight: 1.2,
            pointerEvents: 'none',
          }}
        >
          <Box component="span">פרימיום</Box>
          <Box
            component="svg"
            viewBox="0 0 24 16"
            sx={{ width: 14, height: 10, display: 'block' }}
            aria-hidden="true"
          >
            <rect width="24" height="16" fill="#fff" />
            <rect y="2" width="24" height="2" fill="#0038B8" />
            <rect y="12" width="24" height="2" fill="#0038B8" />
            <polygon
              points="12,5 13.18,7.36 15.8,7.36 13.81,8.96 14.39,11.32 12,9.78 9.61,11.32 10.19,8.96 8.2,7.36 10.82,7.36"
              fill="none"
              stroke="#0038B8"
              strokeWidth="0.6"
            />
          </Box>
        </Box>
      )}

      {/* Image area */}
      <Box
        sx={{
          width: '100%',
          height: 140,
          mt: isDiscount || isPremium ? 2.5 : 0.5,
          mb: 1,
          borderRadius: 1.5,
          bgcolor: '#fff',
          background: showImage
            ? '#fff'
            : KIND_GLOW[product.kind] ?? 'radial-gradient(circle, #f5f5f5 0%, transparent 70%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
          overflow: 'hidden',
          p: 1,
        }}
      >
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl!}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
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
      </Box>

      {/* Name */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          textAlign: 'center',
          color: 'text.primary',
          lineHeight: 1.3,
          mb: 0.75,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: 36,
        }}
      >
        {product.name}
      </Typography>

      {/* Price */}
      <Stack
        direction="row"
        spacing={0.5}
        alignItems="baseline"
        justifyContent="center"
        sx={{ mb: 1 }}
      >
        <Typography
          component="span"
          sx={{ fontSize: 22, fontWeight: 800, color: BRAND.green, lineHeight: 1 }}
        >
          {formatPrice(product.priceCents)}
        </Typography>
        <Typography
          component="span"
          sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1 }}
        >
          /{unitLabel}
        </Typography>
        {isDiscount && product.originalPriceCents && (
          <Typography
            component="span"
            sx={{
              fontSize: 12,
              color: 'text.secondary',
              textDecoration: 'line-through',
              ml: 0.5,
              lineHeight: 1,
            }}
          >
            {formatPrice(product.originalPriceCents)}
          </Typography>
        )}
      </Stack>

      {/* Bottom action */}
      <Box sx={{ mt: 'auto' }} onClick={stop}>
        {inCart ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ gap: 1, height: 40 }}
          >
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(decrementAmount(product.id));
              }}
              sx={{
                bgcolor: BRAND.greenLight,
                color: BRAND.greenDark,
                width: 36,
                height: 36,
              }}
              aria-label="הפחתה"
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ fontWeight: 700, fontSize: 15 }}>
              {cartItem!.amount} {unitLabel}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(incrementAmount(product.id));
              }}
              sx={{
                bgcolor: BRAND.green,
                color: '#fff',
                width: 36,
                height: 36,
                '&:hover': { bgcolor: BRAND.greenDark },
              }}
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
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addItem({ product }));
            }}
            aria-label={`הוספה לסל ${product.name}`}
            sx={{
              height: 40,
              bgcolor: BRAND.green,
              color: '#fff',
              fontWeight: 700,
              boxShadow: 'none',
              borderRadius: 1.5,
              '&:hover': {
                bgcolor: BRAND.greenDark,
                boxShadow: 'none',
              },
            }}
          >
            הוספה לסל
          </Button>
        )}
      </Box>
    </Card>
  );
}

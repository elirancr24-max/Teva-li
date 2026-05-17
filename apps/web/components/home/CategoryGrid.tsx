'use client';
import { useEffect, useRef, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BRAND } from '@/lib/brand';
import type { Product } from '@/types/shop';

interface CategoryTile {
  slug: string;
  name: string;
  desc: string;
  image: string;
  span?: { col?: number; row?: number };
}

// Editorial photographic tiles — Unsplash CDN, high-quality macro food photography.
// Each image: w=1400&q=80&auto=format&fit=crop — sharp, cover-fits any tile.
const TILES: CategoryTile[] = [
  {
    slug: 'vegetables',
    name: 'ירקנייה טרייה',
    desc: 'נקטף בבוקר · 63 מוצרים',
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1400&q=80',
    span: { col: 2, row: 2 },
  },
  {
    slug: 'fruits',
    name: 'פירות עונתיים',
    desc: 'בשלים, מתוקים · 74 מוצרים',
    image:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=1400&q=80',
    span: { col: 2 },
  },
  {
    slug: 'mushrooms',
    name: 'פטריות ונבטים',
    desc: '13 מוצרים',
    image:
      'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'dried',
    name: 'פירות יבשים',
    desc: 'במשקל · אגוזים ופירות',
    image:
      'https://images.unsplash.com/photo-1599639957043-f3aa5c986398?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'spreads',
    name: 'ממרחים ושמנים',
    desc: 'שמן זית · 19 מוצרים',
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1400&q=80',
    span: { col: 2 },
  },
  {
    slug: 'grocery',
    name: 'מוצרי מכולת',
    desc: 'בסיס לבישול · 11 מוצרים',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80',
  },
];

interface CategoryGridProps {
  products?: Product[];
}

/**
 * Bento category grid — full-bleed editorial photography with dark gradient + bold white type.
 * Static. Photographic. No tiny floating product images, no childish gradient backgrounds.
 */
export function CategoryGrid({ products: _products = [] }: CategoryGridProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: BRAND.cream,
        py: { xs: 6, md: 10 },
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'flex-end' }}
            justifyContent="space-between"
            spacing={{ xs: 1, md: 0 }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: BRAND.greenDark,
                  fontWeight: 800,
                  mb: 1.25,
                }}
              >
                · קטלוג טבע לי
              </Typography>
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 30, md: 46 },
                  fontWeight: 900,
                  letterSpacing: '-0.035em',
                  color: BRAND.brown,
                  lineHeight: 1.02,
                  maxWidth: 720,
                }}
              >
                כל מה שצריך — נקטף בבוקר, אצלכם עד הצהריים
              </Typography>
            </Box>
            <Typography
              component="a"
              href="/shop"
              sx={{
                color: BRAND.greenDark,
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                py: 0.75,
                borderBottom: `2px solid ${BRAND.greenDark}`,
                '&:hover': { color: BRAND.green, borderColor: BRAND.green },
              }}
            >
              לכל המוצרים
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </Typography>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gap: { xs: 1.5, md: 2.5 },
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gridAutoRows: { xs: 220, md: 280 },
            }}
          >
            {TILES.map((t, i) => (
              <TileCard key={t.slug} tile={t} index={i} />
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

interface TileCardProps {
  tile: CategoryTile;
  index: number;
}

function TileCard({ tile, index }: TileCardProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.05, rootMargin: '80px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const delay = index * 60;
  const colSpan = tile.span?.col ?? 1;
  const rowSpan = tile.span?.row ?? 1;
  const isLarge = colSpan === 2 && rowSpan === 2;

  return (
    <Box
      ref={ref}
      component="a"
      href={`/shop?cat=${tile.slug}`}
      sx={{
        display: 'block',
        textDecoration: 'none',
        bgcolor: BRAND.brown,
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        gridColumn: {
          xs: 'span 1',
          sm: 'span 1',
          md: `span ${colSpan}`,
        },
        gridRow: { xs: 'span 1', md: `span ${rowSpan}` },
        opacity: visible ? 1 : 0,
        transition: `opacity 700ms ease ${delay}ms, box-shadow 280ms ease`,
        boxShadow: '0 6px 18px rgba(15,40,24,0.10)',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 18px 40px rgba(15,40,24,0.28)',
        },
        '&:hover .tile-img': {
          transform: 'scale(1.06)',
        },
        '&:hover .tile-arrow': {
          transform: 'translateX(-6px)',
        },
      }}
    >
      <Box
        className="tile-img"
        component="img"
        src={tile.image}
        alt={tile.name}
        loading="lazy"
        decoding="async"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 700ms cubic-bezier(0.2, 0.9, 0.3, 1)',
        }}
      />

      {/* Dark gradient — pulls text out of any image. RTL-aware: stronger on bottom-right. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(15,40,24,0.82) 0%, rgba(15,40,24,0.35) 45%, rgba(15,40,24,0.0) 75%), linear-gradient(to left, rgba(15,40,24,0.25) 0%, rgba(15,40,24,0) 55%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle top-right eyebrow chip on large tile */}
      {isLarge && (
        <Box
          sx={{
            position: 'absolute',
            top: 18,
            right: 18,
            bgcolor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            color: BRAND.greenDark,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          · בחירת הבית
        </Box>
      )}

      {/* Text — bottom right (RTL) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 16, md: 22 },
          right: { xs: 18, md: 24 },
          left: { xs: 18, md: 24 },
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 20, md: isLarge ? 34 : 24 },
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.08,
            letterSpacing: '-0.028em',
            textShadow: '0 2px 16px rgba(0,0,0,0.55)',
          }}
        >
          {tile.name}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 12.5, md: isLarge ? 15 : 13 },
            color: 'rgba(255,255,255,0.88)',
            fontWeight: 600,
            mt: 0.75,
            letterSpacing: '0.01em',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}
        >
          {tile.desc}
        </Typography>
        <Box
          className="tile-arrow"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            mt: 1.5,
            fontSize: 12,
            color: '#fff',
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            transition: 'transform 280ms ease',
          }}
        >
          גלה
          <ArrowBackIcon sx={{ fontSize: 14 }} />
        </Box>
      </Box>
    </Box>
  );
}

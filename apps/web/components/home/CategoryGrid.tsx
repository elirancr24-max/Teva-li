import Link from 'next/link';
import { Box, Container, Stack, Typography } from '@mui/material';
import { BRAND } from '@/lib/theme';

interface CategoryTile {
  slug: string;
  emoji: string;
  name: string;
}

/**
 * 6 visual category tiles aligned with existing DB category slugs.
 * Clicking → /shop?cat=<slug>. Emoji + name only — kept intentionally simple.
 */
const TILES: CategoryTile[] = [
  { slug: 'vegetables',  emoji: '🥬', name: 'ירקות' },
  { slug: 'whole-fruit', emoji: '🍎', name: 'פירות' },
  { slug: 'peeled',      emoji: '🍓', name: 'פירות קלופים' },
  { slug: 'boxes',       emoji: '🎁', name: 'קופסאות מתנה' },
  { slug: 'citrus',      emoji: '🍊', name: 'הדרים' },
  { slug: 'extras',      emoji: '✨', name: 'תוספות' },
];

/** Visual category tiles — 6 squares in a 3×2 grid (2×3 on mobile). */
export function CategoryGrid() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.cream,
        py: { xs: 5, md: 8 },
        borderBottom: `2px solid ${BRAND.ink}`,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 24, md: 32 },
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: BRAND.brown,
              textAlign: { xs: 'center', md: 'start' },
            }}
          >
            קטגוריות
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gap: { xs: 1.5, md: 2 },
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
            }}
          >
            {TILES.map((t) => (
              <Box
                key={t.slug}
                component="a"
                href={`/shop?cat=${t.slug}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  minHeight: 140,
                  maxWidth: { md: 200 },
                  mx: 'auto',
                  width: '100%',
                  bgcolor: BRAND.greenLight,
                  color: BRAND.ink,
                  textDecoration: 'none',
                  border: `2px solid ${BRAND.ink}`,
                  borderRadius: 2,
                  px: 2,
                  py: 3,
                  transition:
                    'background-color 180ms ease, color 180ms ease, transform 180ms ease',
                  '&:hover': {
                    bgcolor: BRAND.green,
                    color: '#fff',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: 48,
                    lineHeight: 1,
                    filter: 'drop-shadow(2px 2px 0 rgba(13,13,13,0.12))',
                  }}
                >
                  {t.emoji}
                </Box>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    textAlign: 'center',
                  }}
                >
                  {t.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

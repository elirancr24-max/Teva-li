'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Box, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch } from '@/store';
import { setProducts } from '@/store/slices/productsSlice';
import { setCategories } from '@/store/slices/categoriesSlice';
import { ProductCard } from '@/components/products/ProductCard';
import { BRAND } from '@/lib/theme';
import type { Category, Product } from '@/types/shop';

interface HomeFeaturedProps {
  /** Pre-filtered list of featured products. */
  products: Product[];
  /** Optional full catalog — when provided, hydrates Redux for hand-off to /shop. */
  catalog?: Product[];
  categories?: Category[];
}

/**
 * Horizontal scrolling rail of "popular this week" cards.
 * Renders nothing when no products are provided.
 */
export function HomeFeatured({ products, catalog, categories }: HomeFeaturedProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (catalog && catalog.length) dispatch(setProducts(catalog));
    if (categories && categories.length) dispatch(setCategories(categories));
  }, [dispatch, catalog, categories]);

  if (!products || products.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.paper,
        py: { xs: 5, md: 8 },
        borderBottom: `2px solid ${BRAND.ink}`,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="space-between"
          sx={{ mb: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 24, md: 32 },
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: BRAND.ink,
            }}
          >
            מוצרים פופולריים
          </Typography>
          <Box
            component={Link}
            href="/shop"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              color: BRAND.greenDark,
              textDecoration: 'none',
              fontSize: { xs: 13, md: 15 },
              fontWeight: 800,
              letterSpacing: '0.02em',
              '&:hover': { color: BRAND.green },
            }}
          >
            ראה הכל
            <ArrowBackIcon sx={{ fontSize: 18 }} />
          </Box>
        </Stack>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollPaddingInlineStart: { xs: 8, md: 16 },
            pb: 2,
            // Hide scrollbar but keep scroll functional.
            '&::-webkit-scrollbar': { height: 8 },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(0,0,0,0.18)',
              borderRadius: 999,
            },
            scrollbarWidth: 'thin',
          }}
        >
          {products.map((p) => (
            <Box
              key={p.id}
              sx={{
                flex: '0 0 auto',
                width: 200,
                scrollSnapAlign: 'start',
              }}
            >
              <ProductCard product={p} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

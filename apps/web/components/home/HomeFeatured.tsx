'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Box, Container, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch } from '@/store';
import { setProducts } from '@/store/slices/productsSlice';
import { setCategories } from '@/store/slices/categoriesSlice';
import { ProductCard } from '@/components/products/ProductCard';
import { BRAND } from '@/lib/brand';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (catalog && catalog.length) dispatch(setProducts(catalog));
    if (categories && categories.length) dispatch(setCategories(categories));
  }, [dispatch, catalog, categories]);

  /* Track active scroll index for dot indicator */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      if (!el) return;
      const cardW = el.scrollWidth / (products?.length ?? 1);
      // Chrome RTL: scrollLeft is 0 at start and goes negative as user scrolls left
      setActiveIdx(Math.round(Math.abs(el.scrollLeft) / cardW));
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [products]);

  if (!products || products.length === 0) return null;

  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.paper,
        py: { xs: 5, md: 8 },
        borderBottom: '1px solid #ececec',
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="baseline"
          justifyContent="space-between"
          sx={{ mb: { xs: 2, md: 3 }, px: { xs: 0.5, md: 0 } }}
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

        <Box sx={{ position: 'relative' }}>
          <Box
            ref={scrollRef}
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollPaddingInlineStart: { xs: 8, md: 16 },
              pb: 1,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {products.map((p) => (
              <Box
                key={p.id}
                sx={{
                  flex: '0 0 auto',
                  width: { xs: 'calc(82vw)', sm: 220, md: 230 },
                  maxWidth: { xs: 300, md: 'none' },
                  scrollSnapAlign: 'start',
                }}
              >
                <ProductCard product={p} />
              </Box>
            ))}
          </Box>

          {/* Fade mask — both sides */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: { xs: 16, md: 56 },
              background: `linear-gradient(to right, ${BRAND.paper} 0%, rgba(255,255,255,0) 100%)`,
              pointerEvents: 'none',
            }}
          />
        </Box>

        {/* Scroll dots — mobile only */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'center',
            gap: 0.75,
            mt: 2,
          }}
        >
          {products.slice(0, 8).map((p, i) => (
            <Box
              key={p.id}
              sx={{
                width: activeIdx === i ? 20 : 6,
                height: 6,
                borderRadius: 999,
                bgcolor: activeIdx === i ? BRAND.green : 'rgba(0,0,0,0.18)',
                transition: 'width 260ms ease, background-color 260ms ease',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

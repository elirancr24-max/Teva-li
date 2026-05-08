'use client';
import { useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useAppDispatch } from '@/store';
import { setProducts } from '@/store/slices/productsSlice';
import { setCategories } from '@/store/slices/categoriesSlice';
import { ProductCard } from '@/components/products/ProductCard';
import type { Category, Product } from '@/types/shop';

export function HomeFeatured({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProducts(products));
    dispatch(setCategories(categories));
  }, [dispatch, products, categories]);

  const featured = products.slice(0, 8);

  return (
    <Stack spacing={3}>
      <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 800 }}>
        מומלצים השבוע
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </Stack>
  );
}

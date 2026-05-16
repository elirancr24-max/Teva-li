'use client';
import { useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  Skeleton,
  type SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store';
import { setSortBy, type SortBy } from '@/store/slices/productsSlice';
import { BRAND } from '@/lib/theme';
import { ProductCard } from './ProductCard';

const GRID_COLS = {
  xs: 'repeat(2, 1fr)',
  sm: 'repeat(3, 1fr)',
  md: 'repeat(4, 1fr)',
  lg: 'repeat(5, 1fr)',
  xl: 'repeat(5, 1fr)',
} as const;

function LoadingGrid() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: '12px',
        gridTemplateColumns: GRID_COLS,
        py: 2,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            height: 280,
            p: 1.25,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 1.5 }} animation="wave" />
          <Skeleton variant="text" sx={{ fontSize: 14 }} animation="wave" />
          <Skeleton variant="text" width="60%" sx={{ fontSize: 14, mx: 'auto' }} animation="wave" />
          <Skeleton variant="text" width="40%" sx={{ fontSize: 22, mx: 'auto' }} animation="wave" />
          <Box sx={{ mt: 'auto' }}>
            <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1.5 }} animation="wave" />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function ProductGrid({
  title,
  loading = false,
}: {
  title?: string;
  loading?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { byId, ids, sortBy, query } = useAppSelector((s) => s.products);
  const activeCategoryId = useAppSelector((s) => s.categories.activeCategoryId);

  const products = useMemo(() => {
    let list = ids.map((id) => byId[id]);
    if (activeCategoryId) list = list.filter((p) => p.categoryId === activeCategoryId);
    if (query.trim()) {
      const q = query.trim();
      list = list.filter((p) => p.name.includes(q) || p.kind.includes(q));
    }
    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.priceCents - b.priceCents);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.priceCents - a.priceCents);
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'he'));
        break;
    }
    return list;
  }, [byId, ids, sortBy, query, activeCategoryId]);

  return (
    <Box sx={{ flex: 1 }}>
      <Typography
        component="h1"
        sx={{
          fontSize: { xs: 28, md: 36 },
          fontWeight: 800,
          color: BRAND.brown,
          fontFamily: 'var(--font-heebo), Heebo, sans-serif',
          mb: 1.5,
          lineHeight: 1.2,
        }}
      >
        {title ?? 'כל המוצרים'}
        <Typography
          component="span"
          sx={{
            ml: 1,
            fontSize: 16,
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          ({products.length})
        </Typography>
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
        sx={{ mb: 1.5, flexWrap: 'wrap', gap: 1 }}
      >
        <Typography
          component="label"
          htmlFor="product-sort"
          sx={{ fontSize: 14, color: 'text.secondary', fontWeight: 500 }}
        >
          מיון לפי:
        </Typography>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <Select
            id="product-sort"
            value={sortBy}
            onChange={(e: SelectChangeEvent) =>
              dispatch(setSortBy(e.target.value as SortBy))
            }
            sx={{ bgcolor: '#fff', fontSize: 14, borderRadius: 1.5 }}
            aria-label="מיון מוצרים"
          >
            <MenuItem value="category">קטגוריה - שם</MenuItem>
            <MenuItem value="price-asc">מחיר: מהזול ליקר</MenuItem>
            <MenuItem value="price-desc">מחיר: מהיקר לזול</MenuItem>
            <MenuItem value="name">לפי שם</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <LoadingGrid />
      ) : products.length === 0 ? (
        <Box
          sx={{
            py: 8,
            textAlign: 'center',
            bgcolor: '#fff',
            borderRadius: 2,
            color: 'text.secondary',
          }}
        >
          <Typography sx={{ fontSize: 48, mb: 1 }}>🍽️</Typography>
          <Typography>אין מוצרים בקטגוריה זו</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: '12px',
            py: 2,
            gridTemplateColumns: GRID_COLS,
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Box>
      )}
    </Box>
  );
}

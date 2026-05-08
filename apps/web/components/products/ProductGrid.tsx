'use client';
import { useMemo } from 'react';
import {
  Box,
  Typography,
  Stack,
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store';
import { setSortBy, type SortBy } from '@/store/slices/productsSlice';
import { ProductCard } from './ProductCard';

export function ProductGrid({ title }: { title?: string }) {
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
      >
        <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 800 }}>
          {title ?? 'כל המוצרים'}
          <Typography
            component="span"
            sx={{ ml: 1, fontSize: 14, color: 'text.secondary', fontWeight: 500 }}
          >
            ({products.length})
          </Typography>
        </Typography>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <Select
            value={sortBy}
            onChange={(e: SelectChangeEvent) => dispatch(setSortBy(e.target.value as SortBy))}
            sx={{ bgcolor: '#fff', fontSize: 14 }}
          >
            <MenuItem value="category">מיון לפי קטגוריה</MenuItem>
            <MenuItem value="name">לפי שם</MenuItem>
            <MenuItem value="price-asc">מחיר: מהזול ליקר</MenuItem>
            <MenuItem value="price-desc">מחיר: מהיקר לזול</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {products.length === 0 ? (
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
            gap: 1.5,
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
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

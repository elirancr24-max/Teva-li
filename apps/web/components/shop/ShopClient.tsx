'use client';
import { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useAppDispatch } from '@/store';
import { setProducts } from '@/store/slices/productsSlice';
import { setActiveCategory, setCategories } from '@/store/slices/categoriesSlice';
import { ProductGrid } from '@/components/products/ProductGrid';
import { CartSidebar } from '@/components/cart/CartSidebar';
import type { Category, Product } from '@/types/shop';

interface Props {
  products: Product[];
  categories: Category[];
  activeCategorySlug?: string | null;
  title?: string;
}

export function ShopClient({ products, categories, activeCategorySlug, title }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setProducts(products));
    dispatch(setCategories(categories));
  }, [dispatch, products, categories]);

  useEffect(() => {
    const cat = activeCategorySlug
      ? categories.find((c) => c.slug === activeCategorySlug)?.id ?? null
      : null;
    dispatch(setActiveCategory(cat));
  }, [dispatch, activeCategorySlug, categories]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <ProductGrid title={title} />
        <CartSidebar />
      </Box>
    </Container>
  );
}

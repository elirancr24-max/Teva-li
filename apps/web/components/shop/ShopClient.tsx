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

/**
 * 2-column shop layout:
 *   - RIGHT (sticky 320px): CartSidebar — hidden on xs/sm (B4 handles mobile cart).
 *   - LEFT (1fr): ProductGrid.
 *
 * Reads `?cat=<slug>` from props (server-resolved) and dispatches the active category
 * into Redux on mount / when the slug changes.
 */
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
    <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, md: 3 } }}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          alignItems: 'flex-start',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(0, 1fr) 320px',
          },
        }}
      >
        {/* Products (visually right column in RTL, listed first for source order) */}
        <Box sx={{ minWidth: 0 }}>
          <ProductGrid title={title} />
        </Box>

        {/* Sticky cart sidebar — hidden below md (mobile cart is handled by B4) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'sticky',
            top: 160,
            alignSelf: 'flex-start',
          }}
        >
          <CartSidebar />
        </Box>
      </Box>
    </Container>
  );
}

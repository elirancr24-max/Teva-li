import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/theme';
import type { Category } from '@/types/db';
import { CategoriesClient } from './CategoriesClient';

export const metadata: Metadata = {
  title: 'קטגוריות — אדמין',
  robots: { index: false, follow: false },
};

export default async function CategoriesPage() {
  const { data } = await adminSupabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  const categories = (data ?? []) as Category[];

  return (
    <Box dir="rtl">
      <Box sx={{ px: 4, pt: 4, pb: 2.5, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.15em',
            color: '#888',
            mb: 0.5,
          }}
        >
          {categories.length} קטגוריות
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 36, md: 52 },
            fontWeight: 900,
            color: BRAND.ink,
            letterSpacing: '-0.04em',
          }}
        >
          קטגוריות.
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <CategoriesClient categories={categories} />
      </Box>
    </Box>
  );
}

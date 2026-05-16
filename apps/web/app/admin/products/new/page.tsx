import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/theme';
import { ProductForm } from '../ProductForm';
import type { Category } from '@/types/db';

export const metadata: Metadata = {
  title: 'מוצר חדש — אדמין',
  robots: { index: false, follow: false },
};

export default async function NewProductPage() {
  const { data } = await adminSupabase
    .from('categories')
    .select('*')
    .order('sort_order');

  const categories = (data ?? []) as Category[];

  return (
    <Box>
      <Box sx={{ px: 4, pt: 4, pb: 2.5, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Box
          sx={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.15em',
            color: '#888',
            textTransform: 'uppercase',
            mb: 0.5,
            '& a': { color: 'inherit', textDecoration: 'none' },
            '& a:hover': { color: BRAND.ink },
          }}
        >
          <Link href="/admin/products">← חזרה למוצרים</Link>
        </Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 36, md: 52 },
            fontWeight: 900,
            color: BRAND.ink,
            letterSpacing: '-0.04em',
          }}
        >
          מוצר חדש.
        </Typography>
      </Box>

      <Box sx={{ p: 4, maxWidth: 1100 }}>
        <ProductForm categories={categories} />
      </Box>
    </Box>
  );
}

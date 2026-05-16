import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/theme';
import { ProductForm } from '../../ProductForm';
import type { Category, Product } from '@/types/db';

export const metadata: Metadata = {
  title: 'עריכת מוצר — אדמין',
  robots: { index: false, follow: false },
};

type Params = { id: string };

export default async function EditProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const [productRes, catsRes] = await Promise.all([
    adminSupabase.from('products').select('*').eq('id', id).maybeSingle(),
    adminSupabase.from('categories').select('*').order('sort_order'),
  ]);

  if (!productRes.data) notFound();

  const product = productRes.data as Product;
  const categories = (catsRes.data ?? []) as Category[];

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
          {product.name_he}.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.12em',
            color: '#888',
            mt: 0.5,
          }}
        >
          {product.slug}
        </Typography>
      </Box>

      <Box sx={{ p: 4, maxWidth: 1100 }}>
        <ProductForm initial={product} categories={categories} />
      </Box>
    </Box>
  );
}

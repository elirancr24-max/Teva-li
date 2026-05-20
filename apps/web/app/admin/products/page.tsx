import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
} from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/brand';
import { ProductToggle } from './ProductToggle';
import { RowActions } from './RowActions';
import { BulkActions } from './BulkActions';
import { bulkToggleActive, bulkDeleteProducts } from '@/app/admin/actions';
import type { Product, Category } from '@/types/db';

export const metadata: Metadata = { title: 'מוצרים — אדמין', robots: { index: false, follow: false } };

function fmt(cents: number) { return `₪${(cents / 100).toFixed(2)}`; }

type Search = {
  q?: string;
  cat?: string;
  sort?: 'name' | 'price' | 'stock' | 'created';
};

// Server actions used by the bulk-action <form> below. They live inline so
// the page stays self-contained — `selected` is sent as a repeated form field.
async function bulkActivateAction(formData: FormData) {
  'use server';
  const ids = formData.getAll('selected').map(String).filter(Boolean);
  await bulkToggleActive(ids, true);
}

async function bulkDeactivateAction(formData: FormData) {
  'use server';
  const ids = formData.getAll('selected').map(String).filter(Boolean);
  await bulkToggleActive(ids, false);
}

async function bulkDeleteAction(formData: FormData) {
  'use server';
  const ids = formData.getAll('selected').map(String).filter(Boolean);
  await bulkDeleteProducts(ids);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) as Record<string, string | undefined>;
  const filters: Search = {
    q: (sp.q ?? '').trim(),
    cat: sp.cat ?? '',
    sort: ((sp.sort as Search['sort']) ?? 'name') as Search['sort'],
  };

  const [productsRes, catsRes] = await Promise.all([
    adminSupabase.from('products').select('*'),
    adminSupabase.from('categories').select('*').order('sort_order'),
  ]);

  let products = (productsRes.data ?? []) as Product[];
  const cats = (catsRes.data ?? []) as Category[];
  const catMap = Object.fromEntries(cats.map((c) => [c.id, c.name_he]));

  // Filter
  if (filters.q) {
    const needle = filters.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name_he.toLowerCase().includes(needle) ||
        p.slug.toLowerCase().includes(needle) ||
        (p.name_en?.toLowerCase().includes(needle) ?? false),
    );
  }
  if (filters.cat) {
    products = products.filter((p) => p.category_id === filters.cat);
  }

  // Sort
  switch (filters.sort) {
    case 'price':
      products = [...products].sort((a, b) => a.price_cents - b.price_cents);
      break;
    case 'stock':
      products = [...products].sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0));
      break;
    case 'created':
      products = [...products].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      break;
    default:
      products = [...products].sort((a, b) => a.name_he.localeCompare(b.name_he, 'he'));
  }

  const activeCount = products.filter((p) => p.active).length;

  // Style tokens reused across the filter bar.
  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      bgcolor: '#fff',
      '& fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
      '&:hover fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
      '&.Mui-focused fieldset': { borderColor: BRAND.green, borderWidth: 2 },
    },
    '& .MuiInputBase-input': { fontSize: 14 },
    '& .MuiInputLabel-root': { fontSize: 12, fontFamily: 'monospace' },
  };

  const labelSx = {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: BRAND.ink,
    mb: 0.5,
    display: 'block',
  };

  const bulkBtnSx = {
    borderRadius: 0,
    border: `2px solid ${BRAND.ink}`,
    bgcolor: '#fff',
    color: BRAND.ink,
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    px: 1.5,
    py: 0.5,
    boxShadow: 'none',
    '&:hover': { bgcolor: '#f0efec' },
  };

  return (
    <Box>
      <Box
        sx={{
          px: { xs: 2, md: 4 },
          pt: { xs: 3, md: 4 },
          pb: 2.5,
          borderBottom: `2px solid ${BRAND.ink}`,
          display: 'flex',
          alignItems: { xs: 'flex-start', md: 'flex-end' },
          justifyContent: 'space-between',
          gap: 2,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#888', mb: 0.5 }}>
            {activeCount} פעילים · {products.length - activeCount} מושהים · {products.length} סה״כ
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em' }}>
            מוצרים.
          </Typography>
        </Box>

        <Button
          href="/admin/products/new"
          variant="contained"
          sx={{
            bgcolor: BRAND.green,
            color: '#fff',
            border: `2px solid ${BRAND.ink}`,
            borderRadius: 0,
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            px: 2.5,
            py: 1.25,
            boxShadow: 'none',
            '&:hover': { bgcolor: BRAND.greenDark, boxShadow: 'none' },
          }}
        >
          + מוצר חדש
        </Button>
      </Box>

      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* Filter bar — GET form so search/cat/sort persist in the URL. */}
        <Box
          component="form"
          method="get"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr auto' },
            gap: 1.5,
            mb: 2,
            alignItems: 'end',
          }}
        >
          <Box>
            <Typography component="label" htmlFor="q" sx={labelSx}>חיפוש שם / slug</Typography>
            <TextField
              id="q"
              name="q"
              size="small"
              fullWidth
              defaultValue={filters.q ?? ''}
              placeholder="חפש מוצר…"
              sx={fieldSx}
            />
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>קטגוריה</Typography>
            <FormControl size="small" fullWidth sx={fieldSx}>
              <Select name="cat" defaultValue={filters.cat ?? ''} displayEmpty sx={{ borderRadius: 0, fontSize: 14 }}>
                <MenuItem value=""><em>— כל הקטגוריות —</em></MenuItem>
                {cats.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.name_he}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography component="label" sx={labelSx}>מיון</Typography>
            <FormControl size="small" fullWidth sx={fieldSx}>
              <Select name="sort" defaultValue={filters.sort ?? 'name'} sx={{ borderRadius: 0, fontSize: 14 }}>
                <MenuItem value="name">שם</MenuItem>
                <MenuItem value="price">מחיר</MenuItem>
                <MenuItem value="stock">מלאי</MenuItem>
                <MenuItem value="created">תאריך יצירה</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button type="submit" sx={{ ...bulkBtnSx, py: 1, height: 40 }}>החל</Button>
        </Box>

        {/* Bulk-actions form — wraps the whole table so checkbox state is the
            submitted FormData; each action button targets a different server
            action via formAction. */}
        <Box component="form">
          <BulkActions
            activate={bulkActivateAction}
            deactivate={bulkDeactivateAction}
            remove={bulkDeleteAction}
          />

          <Box sx={{ overflowX: 'auto' }}>
          <Paper variant="outlined" sx={{ borderRadius: 0, border: `2px solid ${BRAND.ink}`, overflow: 'hidden', minWidth: 900 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f0efec' }}>
                  {['', 'תמונה', 'שם', 'קטגוריה', 'מחיר', 'מלאי', 'תגית', 'פעיל', 'פעולות'].map((h, i) => (
                    <TableCell
                      key={`${h}-${i}`}
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: 10,
                        letterSpacing: '0.12em',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        py: 1.5,
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => {
                  const lowStock = product.stock !== null && product.stock !== undefined && product.stock < 10;
                  return (
                    <TableRow
                      key={product.id}
                      sx={{
                        opacity: product.active ? 1 : 0.45,
                        '&:hover': { bgcolor: '#fafafa' },
                      }}
                    >
                      <TableCell sx={{ width: 32 }}>
                        <Checkbox
                          name="selected"
                          value={product.id}
                          size="small"
                          sx={{
                            p: 0.5,
                            color: BRAND.ink,
                            '&.Mui-checked': { color: BRAND.green },
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ width: 72 }}>
                        {product.image_url ? (
                          <Box
                            sx={{
                              position: 'relative',
                              width: 60,
                              height: 60,
                              border: `1px solid ${BRAND.ink}`,
                              bgcolor: '#fff',
                              overflow: 'hidden',
                            }}
                          >
                            <Image
                              src={product.image_url}
                              alt={product.name_he}
                              fill
                              sizes="60px"
                              loading="lazy"
                              style={{ objectFit: 'cover' }}
                              unoptimized
                            />
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              border: `1px dashed #ccc`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontFamily: 'monospace',
                              fontSize: 9,
                              color: '#aaa',
                            }}
                          >
                            ללא
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{product.name_he}</Typography>
                        <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: '#888' }}>{product.slug}</Typography>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 12 }}>
                        {product.category_id ? catMap[product.category_id] ?? '—' : '—'}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>{fmt(product.price_cents)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Typography sx={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700 }}>
                            {product.stock ?? '∞'}
                          </Typography>
                          {lowStock && (
                            <Box
                              component="span"
                              sx={{
                                px: 0.75,
                                py: 0.25,
                                bgcolor: '#c0392b',
                                color: '#fff',
                                fontFamily: 'monospace',
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                              }}
                            >
                              מלאי נמוך
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {product.tag && (
                          <Box
                            component="span"
                            sx={{
                              px: 1, py: 0.5,
                              border: `1px solid ${BRAND.ink}`,
                              fontFamily: 'monospace',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            {product.tag}
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <ProductToggle productId={product.id} active={product.active} />
                      </TableCell>
                      <TableCell>
                        <RowActions productId={product.id} productName={product.name_he} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} sx={{ textAlign: 'center', py: 4, fontFamily: 'monospace', color: '#888' }}>
                      לא נמצאו מוצרים
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

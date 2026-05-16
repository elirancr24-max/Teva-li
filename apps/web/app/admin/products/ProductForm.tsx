'use client';
import { useActionState, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Switch,
  Button,
  Paper,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import { createProduct, updateProduct } from '@/app/admin/actions';
import { BRAND } from '@/lib/theme';
import { ImageUpload } from './ImageUpload';
import { ProductGallery } from './ProductGallery';
import type { Product, Category } from '@/types/db';

// ─── Types ──────────────────────────────────────────────────────────────
type FormState = { error?: string } | null;

type Props = {
  initial?: Product | null;
  categories: Category[];
};

// ─── Style tokens ───────────────────────────────────────────────────────
const labelSx = {
  fontFamily: 'monospace',
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: BRAND.ink,
  mb: 0.75,
  display: 'block',
};

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 0,
    bgcolor: '#fff',
    '& fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
    '&:hover fieldset': { borderColor: BRAND.ink, borderWidth: 2 },
    '&.Mui-focused fieldset': { borderColor: BRAND.green, borderWidth: 2 },
  },
  '& .MuiInputBase-input': { fontSize: 14 },
};

// Client wrapper that turns FormData → typed ProductInput and calls either
// createProduct or updateProduct. Closes over `productId` so the same handler
// works for both modes.
function makeSubmit(productId: string | null) {
  return async function submit(_prev: FormState, formData: FormData): Promise<FormState> {
    const slugRaw = String(formData.get('slug') ?? '').trim().toLowerCase();
    const name_he = String(formData.get('name_he') ?? '').trim();
    const category_id_raw = String(formData.get('category_id') ?? '');
    const category_id = category_id_raw === '' ? null : category_id_raw;
    const kind = String(formData.get('kind') ?? '').trim();
    const priceShekels = Number(formData.get('price_shekels') ?? 0);
    const weight = String(formData.get('weight') ?? '').trim();
    const description_he = String(formData.get('description_he') ?? '').trim() || null;
    const tag = String(formData.get('tag') ?? '').trim() || null;
    const image_url = String(formData.get('image_url') ?? '').trim() || null;
    const stockRaw = String(formData.get('stock') ?? '').trim();
    const stock = stockRaw === '' ? null : Number(stockRaw);
    const active = formData.get('active') === 'on';

    if (!slugRaw) return { error: 'slug חובה' };
    if (!name_he) return { error: 'שם בעברית חובה' };
    if (!kind) return { error: 'kind חובה (לדוגמה: apple, banana)' };
    if (!weight) return { error: 'משקל חובה' };
    if (!(priceShekels >= 0)) return { error: 'מחיר חייב להיות מספר חיובי' };

    const input = {
      slug: slugRaw,
      name_he,
      category_id,
      kind,
      price_cents: Math.round(priceShekels * 100),
      weight,
      description_he,
      tag,
      image_url,
      stock,
      active,
    };

    try {
      if (productId) {
        const res = await updateProduct(productId, input);
        if (res && 'error' in res && res.error) return { error: res.error };
      } else {
        const res = await createProduct(input);
        if (res && 'error' in res && res.error) return { error: res.error };
      }
    } catch (err: unknown) {
      // redirect() throws — let it bubble so Next handles the navigation.
      throw err;
    }
    return null;
  };
}

export function ProductForm({ initial, categories }: Props) {
  const submit = makeSubmit(initial?.id ?? null);
  const [state, formAction, pending] = useActionState<FormState, FormData>(submit, null);
  // Bump to force <ProductGallery /> to refetch after a new upload lands.
  const [galleryKey, setGalleryKey] = useState(0);

  const initialPriceShekels =
    initial && typeof initial.price_cents === 'number'
      ? (initial.price_cents / 100).toFixed(2)
      : '';

  return (
    <Box
      component="form"
      action={formAction}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 0,
          border: `2px solid ${BRAND.ink}`,
          bgcolor: '#fff',
          p: { xs: 2.5, md: 4 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          {/* slug */}
          <Box>
            <Typography component="label" htmlFor="slug" sx={labelSx}>
              slug *
            </Typography>
            <TextField
              id="slug"
              name="slug"
              required
              fullWidth
              size="small"
              defaultValue={initial?.slug ?? ''}
              placeholder="apple-fuji"
              inputProps={{ style: { textTransform: 'lowercase' } }}
              sx={fieldSx}
            />
          </Box>

          {/* name_he */}
          <Box>
            <Typography component="label" htmlFor="name_he" sx={labelSx}>
              שם בעברית *
            </Typography>
            <TextField
              id="name_he"
              name="name_he"
              required
              fullWidth
              size="small"
              defaultValue={initial?.name_he ?? ''}
              sx={fieldSx}
            />
          </Box>

          {/* category */}
          <Box>
            <Typography component="label" sx={labelSx}>
              קטגוריה
            </Typography>
            <FormControl fullWidth size="small" sx={fieldSx}>
              <Select
                name="category_id"
                defaultValue={initial?.category_id ?? ''}
                displayEmpty
                sx={{ borderRadius: 0, bgcolor: '#fff', fontSize: 14 }}
              >
                <MenuItem value="">
                  <em>— ללא קטגוריה —</em>
                </MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name_he}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* kind */}
          <Box>
            <Typography component="label" htmlFor="kind" sx={labelSx}>
              kind * (לסמלון: apple, banana, grape…)
            </Typography>
            <TextField
              id="kind"
              name="kind"
              required
              fullWidth
              size="small"
              defaultValue={initial?.kind ?? ''}
              sx={fieldSx}
            />
          </Box>

          {/* price (in shekels) */}
          <Box>
            <Typography component="label" htmlFor="price_shekels" sx={labelSx}>
              מחיר (₪) *
            </Typography>
            <TextField
              id="price_shekels"
              name="price_shekels"
              required
              fullWidth
              size="small"
              type="number"
              inputProps={{ step: '0.01', min: '0' }}
              defaultValue={initialPriceShekels}
              sx={fieldSx}
            />
          </Box>

          {/* weight */}
          <Box>
            <Typography component="label" htmlFor="weight" sx={labelSx}>
              משקל / יחידה *
            </Typography>
            <TextField
              id="weight"
              name="weight"
              required
              fullWidth
              size="small"
              placeholder='1 ק״ג'
              defaultValue={initial?.weight ?? ''}
              sx={fieldSx}
            />
          </Box>

          {/* tag */}
          <Box>
            <Typography component="label" htmlFor="tag" sx={labelSx}>
              תגית
            </Typography>
            <TextField
              id="tag"
              name="tag"
              fullWidth
              size="small"
              placeholder="חדש / מבצע / טרי"
              defaultValue={initial?.tag ?? ''}
              sx={fieldSx}
            />
          </Box>

          {/* stock */}
          <Box>
            <Typography component="label" htmlFor="stock" sx={labelSx}>
              מלאי
            </Typography>
            <TextField
              id="stock"
              name="stock"
              fullWidth
              size="small"
              type="number"
              inputProps={{ step: '1', min: '0' }}
              defaultValue={initial?.stock ?? ''}
              sx={fieldSx}
            />
          </Box>

          {/* images — drag-drop uploader + gallery */}
          <Box sx={{ gridColumn: { md: 'span 2' } }}>
            <Typography component="label" sx={labelSx}>
              תמונות מוצר
            </Typography>
            {initial?.id ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ImageUpload
                  productId={initial.id}
                  onUploaded={() => setGalleryKey((k) => k + 1)}
                />
                <ProductGallery productId={initial.id} refreshKey={galleryKey} />
              </Box>
            ) : (
              <Box
                sx={{
                  border: `2px dashed ${BRAND.ink}`,
                  bgcolor: '#fafafa',
                  p: 2,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
                  שמור מוצר תחילה כדי להעלות תמונות
                </Typography>
              </Box>
            )}
          </Box>

          {/* image_url — advanced fallback (keep for legacy URL imports) */}
          <Box sx={{ gridColumn: { md: 'span 2' } }}>
            <Typography component="label" htmlFor="image_url" sx={labelSx}>
              כתובת תמונה ידנית (URL) — מתקדם
            </Typography>
            <TextField
              id="image_url"
              name="image_url"
              fullWidth
              size="small"
              defaultValue={initial?.image_url ?? ''}
              placeholder="https://… (אופציונלי, ידרוס את התמונה הראשית)"
              sx={fieldSx}
            />
          </Box>

          {/* description full width */}
          <Box sx={{ gridColumn: { md: 'span 2' } }}>
            <Typography component="label" htmlFor="description_he" sx={labelSx}>
              תיאור (עברית)
            </Typography>
            <TextField
              id="description_he"
              name="description_he"
              fullWidth
              multiline
              minRows={3}
              defaultValue={initial?.description_he ?? ''}
              sx={fieldSx}
            />
          </Box>

          {/* active */}
          <Box sx={{ gridColumn: { md: 'span 2' } }}>
            <FormControlLabel
              control={
                <Switch
                  name="active"
                  defaultChecked={initial?.active ?? true}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: BRAND.green },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      bgcolor: BRAND.green,
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ ...labelSx, mb: 0, display: 'inline' }}>פעיל</Typography>
              }
            />
          </Box>
        </Box>

        {state?.error && (
          <Box
            sx={{
              mt: 2.5,
              p: 1.5,
              border: '2px solid #c0392b',
              bgcolor: '#fff5f4',
            }}
          >
            <Typography
              sx={{
                color: '#c0392b',
                fontFamily: 'monospace',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              שגיאה: {state.error}
            </Typography>
          </Box>
        )}
      </Paper>

      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={pending}
          sx={{
            bgcolor: BRAND.green,
            color: '#fff',
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            px: 3,
            py: 1.25,
            boxShadow: 'none',
            '&:hover': { bgcolor: BRAND.greenDark, boxShadow: 'none' },
          }}
        >
          {pending ? '...שומר' : initial ? 'שמור שינויים' : 'צור מוצר'}
        </Button>

        <Button
          href="/admin/products"
          variant="outlined"
          sx={{
            borderRadius: 0,
            border: `2px solid ${BRAND.ink}`,
            color: BRAND.ink,
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            px: 3,
            py: 1.25,
            '&:hover': { borderColor: BRAND.ink, bgcolor: '#f0efec' },
          }}
        >
          ביטול
        </Button>
      </Box>
    </Box>
  );
}


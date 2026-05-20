'use client';
import { useCallback, useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';
import { createClient } from '@/lib/supabase/client';
import {
  deleteProductImage,
  setPrimaryImage,
  reorderProductImages,
} from '@/app/admin/actions';
import { useAdminToast } from '@/components/admin/AdminToastProvider';
import { BRAND } from '@/lib/brand';

type GalleryImage = {
  id: string;
  url: string;
  alt: string | null;
  sort_order: number;
  is_primary: boolean;
};

type Props = {
  productId: string;
  /** Bumping this value forces a refetch (e.g. after a new upload). */
  refreshKey?: number;
};

const btnSx = {
  borderRadius: 0,
  fontFamily: 'monospace',
  fontSize: 9,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  px: 0.75,
  py: 0.25,
  minWidth: 0,
  boxShadow: 'none',
  lineHeight: 1.3,
};

export function ProductGallery({ productId, refreshKey = 0 }: Props) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragId, setDragId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const toast = useAdminToast();

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from('product_images')
      .select('id, url, alt, sort_order, is_primary')
      .eq('product_id', productId)
      .order('sort_order', { ascending: true });
    setImages(((data ?? []) as unknown) as GalleryImage[]);
    setLoading(false);
  }, [productId]);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  function handleDragStart(id: string) {
    setDragId(id);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) {
      setDragId(null);
      return;
    }
    const next = [...images];
    const fromIdx = next.findIndex((i) => i.id === dragId);
    const toIdx = next.findIndex((i) => i.id === targetId);
    if (fromIdx === -1 || toIdx === -1) {
      setDragId(null);
      return;
    }
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setImages(next);
    setDragId(null);
    startTransition(() => {
      void reorderProductImages(productId, next.map((i) => i.id)).then(load);
    });
  }

  async function handleDelete(id: string) {
    const ok = window.confirm('למחוק את התמונה?');
    if (!ok) return;
    const res = await deleteProductImage(id);
    if (res.ok) toast.success('התמונה נמחקה');
    else toast.error(res.error);
    await load();
  }

  async function handlePrimary(id: string) {
    const res = await setPrimaryImage(productId, id);
    if (res.ok) toast.success('התמונה הוגדרה כראשית');
    else toast.error(res.error);
    await load();
  }

  if (loading) {
    return (
      <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
        טוען תמונות…
      </Typography>
    );
  }

  if (images.length === 0) {
    return (
      <Box
        sx={{
          border: `2px dashed ${BRAND.ink}`,
          bgcolor: '#fafafa',
          p: 2,
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
          אין תמונות. גרור תמונה למעלה
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: 1.5,
      }}
    >
      {images.map((img) => (
        <Box
          key={img.id}
          draggable
          onDragStart={() => handleDragStart(img.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(img.id)}
          sx={{
            position: 'relative',
            border: `2px solid ${img.is_primary ? BRAND.green : BRAND.ink}`,
            bgcolor: '#fff',
            cursor: 'grab',
            opacity: dragId === img.id ? 0.5 : 1,
            '&:active': { cursor: 'grabbing' },
          }}
        >
          <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
            <Image
              src={img.url}
              alt={img.alt ?? ''}
              fill
              sizes="120px"
              style={{ objectFit: 'cover' }}
              unoptimized
            />
            {img.is_primary && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 4,
                  insetInlineStart: 4,
                  px: 0.75,
                  py: 0.25,
                  bgcolor: BRAND.green,
                  color: '#fff',
                  fontFamily: 'monospace',
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                ראשי
              </Box>
            )}
          </Box>
          <Box sx={{ p: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {!img.is_primary && (
              <Button
                type="button"
                onClick={() => void handlePrimary(img.id)}
                sx={{
                  ...btnSx,
                  border: `2px solid ${BRAND.ink}`,
                  color: BRAND.ink,
                  bgcolor: '#fff',
                  '&:hover': { bgcolor: '#f0efec' },
                }}
              >
                ראשי
              </Button>
            )}
            <Button
              type="button"
              onClick={() => void handleDelete(img.id)}
              sx={{
                ...btnSx,
                border: '2px solid #c0392b',
                color: '#c0392b',
                bgcolor: '#fff',
                '&:hover': { bgcolor: '#fff5f4' },
              }}
            >
              מחק
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

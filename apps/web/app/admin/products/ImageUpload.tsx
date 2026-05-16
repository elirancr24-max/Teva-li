'use client';
import { useCallback, useState } from 'react';
import { useDropzone, type FileRejection } from 'react-dropzone';
import { Box, Typography, LinearProgress } from '@mui/material';
import { uploadProductImage } from '@/app/admin/actions';
import { BRAND } from '@/lib/theme';

type Props = {
  productId: string;
  onUploaded?: (url: string) => void;
};

const MAX_BYTES = 5 * 1024 * 1024;

export function ImageUpload({ productId, onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    async (accepted: File[], rejections: FileRejection[]) => {
      setError(null);
      if (rejections.length > 0) {
        const reason = rejections[0]?.errors[0]?.message ?? 'קובץ לא תקין';
        setError(reason);
        return;
      }
      const file = accepted[0];
      if (!file) return;
      if (file.size > MAX_BYTES) {
        setError('קובץ גדול מדי (מקסימום 5MB)');
        return;
      }

      setUploading(true);
      setProgress(20);
      try {
        const fd = new FormData();
        fd.append('image', file);
        setProgress(60);
        const res = await uploadProductImage(productId, fd);
        setProgress(100);
        if ('error' in res) {
          setError(res.error);
          return;
        }
        onUploaded?.(res.url);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setUploading(false);
        setTimeout(() => setProgress(0), 500);
      }
    },
    [productId, onUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: MAX_BYTES,
    multiple: false,
    disabled: uploading,
  });

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: `2px dashed ${isDragActive ? BRAND.green : BRAND.ink}`,
          bgcolor: isDragActive ? BRAND.greenLight : '#fafafa',
          p: 3,
          textAlign: 'center',
          cursor: uploading ? 'wait' : 'pointer',
          transition: 'background-color 120ms, border-color 120ms',
          opacity: uploading ? 0.7 : 1,
        }}
      >
        <input {...getInputProps()} />
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: BRAND.ink,
            mb: 0.5,
          }}
        >
          {isDragActive ? 'שחרר כאן' : 'גרור תמונה או לחץ לבחירה'}
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
          JPG / PNG / WEBP · עד 5MB · יוקטן ל-400×400
        </Typography>
      </Box>

      {uploading && (
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 0,
              bgcolor: '#eee',
              '& .MuiLinearProgress-bar': { bgcolor: BRAND.green },
            }}
          />
          <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: '#888', mt: 0.5 }}>
            מעלה… {progress}%
          </Typography>
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 1, p: 1, border: '2px solid #c0392b', bgcolor: '#fff5f4' }}>
          <Typography sx={{ color: '#c0392b', fontFamily: 'monospace', fontSize: 12, fontWeight: 700 }}>
            שגיאה: {error}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

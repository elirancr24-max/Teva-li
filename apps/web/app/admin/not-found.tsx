import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { BRAND } from '@/lib/brand';

export default function AdminNotFound() {
  return (
    <Box sx={{ p: { xs: 4, md: 8 }, textAlign: 'center' }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: '#888', mb: 1 }}>
        404 · ADMIN
      </Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 64 }, fontWeight: 900, letterSpacing: '-0.04em', mb: 2 }}>
        לא נמצא.
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#666', mb: 4 }}>
        הנתיב שבחרת לא קיים בפאנל האדמין.
      </Typography>
      <Link
        href="/admin"
        style={{
          fontFamily: 'monospace',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '12px 24px',
          border: `2px solid ${BRAND.ink}`,
          color: BRAND.paper,
          background: BRAND.ink,
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        ← חזרה ללוח בקרה
      </Link>
    </Box>
  );
}

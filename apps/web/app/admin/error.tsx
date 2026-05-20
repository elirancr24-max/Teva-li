'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';
import { BRAND } from '@/lib/brand';

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('admin error:', error);
  }, [error]);

  return (
    <Box sx={{ p: { xs: 4, md: 8 }, textAlign: 'center' }}>
      <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: '#c0392b', mb: 1 }}>
        ERROR · ADMIN
      </Typography>
      <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 56 }, fontWeight: 900, letterSpacing: '-0.04em', mb: 2 }}>
        משהו השתבש.
      </Typography>
      <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: '#666', mb: 1 }}>
        {error.message || 'שגיאה לא ידועה'}
      </Typography>
      {error.digest && (
        <Typography sx={{ fontFamily: 'monospace', fontSize: 10, color: '#aaa', mb: 4 }}>
          קוד: {error.digest}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
        <Button
          onClick={reset}
          sx={{
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            px: 3,
            py: 1.25,
            border: `2px solid ${BRAND.ink}`,
            bgcolor: BRAND.ink,
            color: BRAND.paper,
            borderRadius: 0,
            '&:hover': { bgcolor: '#000' },
          }}
        >
          נסה שוב
        </Button>
        <Link
          href="/admin"
          style={{
            fontFamily: 'monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '10px 24px',
            border: `2px solid ${BRAND.ink}`,
            color: BRAND.ink,
            background: '#fff',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          לוח בקרה
        </Link>
      </Box>
    </Box>
  );
}

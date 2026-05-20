'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box, Button, Stack, Typography } from '@mui/material';
import { BRAND } from '@/lib/brand';

const STORAGE_KEY = 'tl-cookie-consent';

export function CookieBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isAdmin = pathname?.startsWith('/admin') || pathname === '/admin-login';

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (SSR or blocked) — do nothing
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // ignore
    }
    setVisible(false);
  }

  function essentialOnly() {
    try {
      localStorage.setItem(STORAGE_KEY, 'essential');
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (isAdmin || !visible) return null;

  return (
    <Box
      role="dialog"
      aria-label="הסכמה לעוגיות"
      aria-live="polite"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        bgcolor: BRAND.brown,
        color: '#fff',
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 2.5 },
        boxShadow: '0 -4px 24px rgba(0,0,0,0.25)',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={{ xs: 2, sm: 3 }}
      >
        <Typography
          sx={{
            fontSize: { xs: 13, sm: 14 },
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.9)',
            flex: 1,
          }}
        >
          אנחנו משתמשים בעוגיות הכרחיות לתפעול האתר ובניתוח שימוש אנונימי (Vercel Analytics).{' '}
          <Link href="/privacy" style={{ color: BRAND.green, fontWeight: 700, textDecoration: 'none' }}>
            מדיניות פרטיות
          </Link>
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.25}
          sx={{ flexShrink: 0, width: { xs: '100%', sm: 'auto' } }}
        >
          <Button
            onClick={accept}
            variant="contained"
            size="small"
            sx={{
              bgcolor: BRAND.green,
              color: '#fff',
              fontWeight: 700,
              fontSize: 13,
              px: 2.5,
              py: 0.75,
              borderRadius: 2,
              '&:hover': { bgcolor: BRAND.greenDark },
              whiteSpace: 'nowrap',
            }}
          >
            הבנתי, מסכים
          </Button>
          <Button
            onClick={essentialOnly}
            variant="outlined"
            size="small"
            sx={{
              borderColor: 'rgba(255,255,255,0.5)',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600,
              fontSize: 13,
              px: 2.5,
              py: 0.75,
              borderRadius: 2,
              '&:hover': { borderColor: '#fff', color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
              whiteSpace: 'nowrap',
            }}
          >
            הכרחיות בלבד
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

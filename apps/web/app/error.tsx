'use client';
import { Box, Typography, Button, Stack } from '@mui/material';
import { BRAND } from '@/lib/theme';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl',
        bgcolor: BRAND.cream,
        px: 2,
        py: 8,
      }}
    >
      <Box sx={{ maxWidth: 560, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 96, lineHeight: 1, mb: 1 }}>🍋</Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: '#888', mb: 1 }}>
          ERROR
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 56 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em', mb: 2 }}>
          משהו השתבש.
        </Typography>
        <Typography sx={{ fontSize: 15, color: '#555', mb: 4 }}>
          נסה שוב, או חזור לדף הבית. אם הבעיה ממשיכה, דברו איתנו בוואטסאפ.
        </Typography>
        {error.digest && (
          <Typography sx={{ fontFamily: 'monospace', fontSize: 11, color: '#888', mb: 3 }}>
            קוד: {error.digest}
          </Typography>
        )}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            onClick={() => reset()}
            variant="contained"
            size="large"
            sx={{ bgcolor: BRAND.green, '&:hover': { bgcolor: BRAND.greenDark }, fontWeight: 700, px: 4, py: 1.5 }}
          >
            נסה שוב
          </Button>
          <Button
            href="/"
            variant="outlined"
            size="large"
            sx={{ borderColor: BRAND.ink, color: BRAND.ink, '&:hover': { borderColor: BRAND.ink, bgcolor: 'rgba(0,0,0,0.04)' }, fontWeight: 700, px: 4, py: 1.5 }}
          >
            דף הבית
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

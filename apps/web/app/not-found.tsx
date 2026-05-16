import { Box, Typography, Button, Stack } from '@mui/material';
import { BRAND } from '@/lib/theme';

export default function NotFound() {
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
        <Typography sx={{ fontSize: 96, lineHeight: 1, mb: 1 }}>🍉</Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: '#888', mb: 1 }}>
          404
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 56 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em', mb: 2 }}>
          הדף לא נמצא.
        </Typography>
        <Typography sx={{ fontSize: 16, color: '#555', mb: 4 }}>
          נראה שהפרי הזה נשר מהעץ. אולי תרצו לחזור לחנות?
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            href="/"
            variant="contained"
            size="large"
            sx={{ bgcolor: BRAND.green, '&:hover': { bgcolor: BRAND.greenDark }, fontWeight: 700, px: 4, py: 1.5 }}
          >
            דף הבית
          </Button>
          <Button
            href="/shop"
            variant="outlined"
            size="large"
            sx={{ borderColor: BRAND.ink, color: BRAND.ink, '&:hover': { borderColor: BRAND.ink, bgcolor: 'rgba(0,0,0,0.04)' }, fontWeight: 700, px: 4, py: 1.5 }}
          >
            לחנות
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

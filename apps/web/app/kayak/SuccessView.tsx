'use client';
import Link from 'next/link';
import { Box, Container, Stack, Typography, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BRAND } from '@/lib/theme';

type Props = {
  orderId: string;
};

export function SuccessView({ orderId }: Props) {
  const shortId = orderId.slice(0, 8).toUpperCase();
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          border: `2px solid ${BRAND.ink}`,
          borderRadius: 2,
          p: { xs: 3, md: 6 },
          bgcolor: BRAND.paper,
          textAlign: 'center',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              bgcolor: BRAND.greenLight,
              border: `2px solid ${BRAND.green}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 56, color: BRAND.green }} />
          </Box>

          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: 12,
              letterSpacing: '0.2em',
              color: 'text.secondary',
            }}
          >
            הזמנה התקבלה / ORDER RECEIVED
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 32, md: 44 },
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            הקיאק שלך בדרך!
          </Typography>

          <Typography sx={{ fontSize: 17, color: 'text.secondary', maxWidth: 520 }}>
            ניצור איתך קשר תוך 24 שעות לאישור הפרטים ותיאום מועד האספקה.
          </Typography>

          <Box
            sx={{
              border: `2px solid ${BRAND.ink}`,
              borderRadius: 2,
              px: 4,
              py: 2,
              bgcolor: BRAND.cream,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: '0.18em',
                color: 'text.secondary',
                mb: 0.5,
              }}
            >
              מספר הזמנה
            </Typography>
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: { xs: 22, md: 28 },
                fontWeight: 800,
                letterSpacing: '0.08em',
              }}
            >
              #{shortId}
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderWidth: 2,
                  borderColor: BRAND.ink,
                  color: BRAND.ink,
                  '&:hover': { borderWidth: 2, borderColor: BRAND.ink, bgcolor: BRAND.cream },
                }}
              >
                לדף הבית
              </Button>
            </Link>
            <Link href="/shop" style={{ textDecoration: 'none' }}>
              <Button variant="contained" size="large">
                המשך לקנייה
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

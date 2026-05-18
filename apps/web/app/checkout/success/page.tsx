import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = { title: 'הזמנה התקבלה' };

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 3 }, minHeight: '60vh', textAlign: 'center' }}>
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: { xs: 80, md: 96 },
              height: { xs: 80, md: 96 },
              borderRadius: '50%',
              bgcolor: BRAND.greenLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: { xs: 48, md: 56 }, color: BRAND.green }} />
          </Box>
          <Typography variant="h1" sx={{ fontSize: { xs: 28, md: 44 }, fontWeight: 800, lineHeight: 1.1 }}>
            הזמנתך נקלטה!
          </Typography>
          <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: 'text.secondary', maxWidth: 540, lineHeight: 1.6 }}>
            ההזמנה נשמרה במערכת. אם החלון של WhatsApp לא נפתח אוטומטית — לחצו על הכפתור כדי להעביר
            לנו את ההזמנה. ניצור איתכם קשר אישית לאישור ופרטי תשלום (Bit / העברה בנקאית).
          </Typography>
          {order && (
            <Box
              sx={{
                bgcolor: BRAND.cream,
                border: `1px solid ${BRAND.brownLight}`,
                borderRadius: 2,
                px: 2.5,
                py: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 11, color: 'text.secondary', letterSpacing: '0.18em', fontFamily: 'monospace' }}>
                מספר הזמנה
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 800, fontFamily: 'monospace', color: BRAND.brown }}>
                {order.slice(0, 8).toUpperCase()}
              </Typography>
            </Box>
          )}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}>
            <Button
              component="a"
              href="https://wa.me/972548897445"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              sx={{
                bgcolor: BRAND.green,
                py: 1.5,
                px: 3,
                fontWeight: 800,
                width: { xs: '100%', sm: 'auto' },
                '&:hover': { bgcolor: BRAND.greenDark },
              }}
            >
              פתח WhatsApp
            </Button>
            <Button
              component={Link}
              href="/shop"
              variant="outlined"
              size="large"
              sx={{ py: 1.5, px: 3, width: { xs: '100%', sm: 'auto' } }}
            >
              המשך קנייה
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
      <Container maxWidth="md" sx={{ py: 8, minHeight: '60vh', textAlign: 'center' }}>
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              bgcolor: BRAND.greenLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 56, color: BRAND.green }} />
          </Box>
          <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 800 }}>
            ההזמנה התקבלה!
          </Typography>
          <Typography sx={{ fontSize: 16, color: 'text.secondary', maxWidth: 500 }}>
            שלחנו לך אישור במייל. הפירות ייחתכו בבוקר יום המשלוח ויגיעו אליך טריים.
          </Typography>
          {order && (
            <Typography sx={{ fontSize: 13, color: 'text.secondary', fontFamily: 'monospace' }}>
              מספר הזמנה: {order.slice(0, 8).toUpperCase()}
            </Typography>
          )}
          <Stack direction="row" spacing={2}>
            <Link href="/shop">
              <Button variant="contained">המשך קנייה</Button>
            </Link>
            <Link href="/">
              <Button variant="outlined">דף הבית</Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

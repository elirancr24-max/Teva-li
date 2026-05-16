import Link from 'next/link';
import { Box, Container, Stack, Typography, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Header } from './Header';
import { Footer } from './Footer';
import { BRAND } from '@/lib/theme';

type Props = {
  title: string;
  subtitle: string;
  phase: string;
  active?: 'home' | 'shop' | 'kayak' | 'about';
  navActive?: 'home' | 'shop' | 'kayak' | 'cart' | 'profile';
  accent?: string;
};

export function PlaceholderPage({ title, subtitle, phase }: Props) {
  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, minHeight: '60vh', textAlign: 'center' }}>
        <Stack spacing={3} alignItems="center">
          <Chip
            label={`Phase ${phase}`}
            sx={{ bgcolor: BRAND.brown, color: '#fff', fontWeight: 700 }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 56 }, fontWeight: 800, lineHeight: 1.1 }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: 16, color: 'text.secondary', maxWidth: 600 }}>
            {subtitle}
          </Typography>
          <Box>
            <Link href="/shop">
              <Button
                variant="contained"
                size="large"
                startIcon={<ArrowBackIcon sx={{ transform: 'scaleX(-1)' }} />}
              >
                לקטלוג
              </Button>
            </Link>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import KayakingIcon from '@mui/icons-material/Kayaking';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryNavbar } from '@/components/layout/CategoryNavbar';
import { HomeFeatured } from '@/components/home/HomeFeatured';
import { getCatalog } from '@/lib/data/products';

export default async function Home() {
  const { products, categories } = await getCatalog();

  return (
    <>
      <Header />
      <CategoryNavbar categories={categories} />

      {/* Hero strip */}
      <Box
        sx={{
          bgcolor: '#0D0D0D',
          color: '#F5F0E8',
          py: { xs: 4, md: 6 },
          borderBottom: '4px solid #8CBE3C',
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={2} sx={{ maxWidth: 600 }}>
              <Typography sx={{ fontSize: { xs: 32, md: 48 }, fontWeight: 800, lineHeight: 1.1 }}>
                פירות וירקות
                <br />
                <Box component="span" sx={{ color: '#8CBE3C' }}>
                  טריים מהשטח.
                </Box>
              </Typography>
              <Typography sx={{ fontSize: 16, opacity: 0.85 }}>
                נחתך בבוקר, מגיע אליך באותו יום. משלוח חינם בדימונה.
              </Typography>
              <Stack direction="row" spacing={2}>
                <Link href="/shop">
                  <Button variant="contained" size="large" color="primary">
                    לקטלוג המוצרים
                  </Button>
                </Link>
                <Link href="/kayak">
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<KayakingIcon />}
                    sx={{ color: '#F5F0E8', borderColor: '#F5F0E8', '&:hover': { borderColor: '#8CBE3C' } }}
                  >
                    קיאקי פירות
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Box sx={{ flexShrink: 0 }}>
              <Image src="/logo.png" alt="פרי לי" width={220} height={220} priority />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Featured products */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <HomeFeatured products={products} categories={categories} />
      </Container>

      <Footer />
    </>
  );
}

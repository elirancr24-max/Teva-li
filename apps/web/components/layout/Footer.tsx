import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Stack, Typography, Divider } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { BRAND } from '@/lib/theme';

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: BRAND.brown, color: '#fff', mt: 6 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'flex-start' }}
        >
          {/* Brand */}
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Image src="/logo.png" alt="פרי לי" width={48} height={48} />
              <Box>
                <Typography sx={{ fontSize: 20, fontWeight: 800 }}>פרי לי</Typography>
                <Typography sx={{ fontSize: 12, opacity: 0.7 }}>פירות וירקות טריים · דימונה</Typography>
              </Box>
            </Stack>
            <Typography sx={{ fontSize: 13, opacity: 0.85 }}>
              ח.פ. 123456789
              <br />
              רחוב הדימונאים 1, דימונה
              <br />
              טל׳: 050-1234567
              <br />
              דוא״ל: hello@peri-li.com
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
              <WhatsAppIcon sx={{ fontSize: 24, opacity: 0.9 }} />
              <FacebookIcon sx={{ fontSize: 24, opacity: 0.9 }} />
              <InstagramIcon sx={{ fontSize: 24, opacity: 0.9 }} />
            </Stack>
          </Stack>

          {/* Account links */}
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>החשבון שלי</Typography>
            <Link href="/account">
              <Typography sx={{ fontSize: 13, opacity: 0.85, '&:hover': { opacity: 1 } }}>
                פרטי חשבון
              </Typography>
            </Link>
            <Link href="/account/orders">
              <Typography sx={{ fontSize: 13, opacity: 0.85, '&:hover': { opacity: 1 } }}>
                היסטוריית הזמנות
              </Typography>
            </Link>
            <Link href="/delivery-areas">
              <Typography sx={{ fontSize: 13, opacity: 0.85, '&:hover': { opacity: 1 } }}>
                אזורי חלוקה
              </Typography>
            </Link>
          </Stack>

          {/* Help */}
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>עזרה</Typography>
            <Link href="/terms-of-use">
              <Typography sx={{ fontSize: 13, opacity: 0.85 }}>תנאי שימוש</Typography>
            </Link>
            <Link href="/privacy-policy">
              <Typography sx={{ fontSize: 13, opacity: 0.85 }}>מדיניות פרטיות</Typography>
            </Link>
            <Link href="/accessibility">
              <Typography sx={{ fontSize: 13, opacity: 0.85 }}>הצהרת נגישות</Typography>
            </Link>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.15)' }} />
        <Typography sx={{ fontSize: 12, opacity: 0.6, textAlign: 'center' }}>
          © {new Date().getFullYear()} פרי לי. כל הזכויות שמורות.
        </Typography>
      </Container>
    </Box>
  );
}

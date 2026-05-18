import Link from 'next/link';
import { Box, Container, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { BRAND } from '@/lib/brand';

const FOOTER_INFO = {
  name: 'טבע לי',
  phone: '054-8897445',
  whatsapp: '972548897445',
  email: 'orders@teva-li.com',
  address: 'דימונה, ישראל',
  tagline: 'פירות וירקות טריים · קיאקי פירות לאירועים',
} as const;

const LINK_SX = {
  fontSize: 14,
  color: '#fff',
  opacity: 0.85,
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'opacity 160ms, color 160ms',
  '&:hover': { opacity: 1, color: BRAND.green },
};

const SOCIAL_SX = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  border: '1.5px solid rgba(255,255,255,0.3)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  transition: 'all 160ms',
  '&:hover': { borderColor: BRAND.green, color: BRAND.green },
};

export function Footer() {
  const year = new Date().getFullYear();
  const waHref = `https://wa.me/${FOOTER_INFO.whatsapp.replace(/[^0-9]/g, '')}`;
  const telHref = `tel:${FOOTER_INFO.phone.replace(/\s+/g, '')}`;
  const mailHref = `mailto:${FOOTER_INFO.email}`;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: BRAND.brown,
        color: '#fff',
        mt: { xs: 5, md: 8 },
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 5, md: 6 }, pb: 3, px: { xs: 2, md: 2 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, md: 6 },
            alignItems: 'flex-start',
            textAlign: { xs: 'center', md: 'right' },
          }}
        >
          {/* Right (logical first): Brand */}
          <Stack spacing={2} sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Box
              component="img"
              src="/logo-teva-trans.png"
              alt={FOOTER_INFO.name}
              sx={{
                width: 100,
                height: 'auto',
                filter:
                  'drop-shadow(0 0 8px rgba(255,255,255,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
              }}
            />
            <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', maxWidth: 280, lineHeight: 1.55 }}>
              {FOOTER_INFO.tagline}
            </Typography>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <PlaceOutlinedIcon sx={{ fontSize: 18, color: BRAND.gold }} />
              <Typography sx={{ fontSize: 14, color: '#fff', opacity: 0.85 }}>
                {FOOTER_INFO.address}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: BRAND.gold }} />
              <Typography component="a" href={telHref} sx={LINK_SX}>
                {FOOTER_INFO.phone}
              </Typography>
            </Stack>
          </Stack>

          {/* Middle: Contact */}
          <Stack spacing={1.75} sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Typography
              sx={{
                fontSize: 13,
                letterSpacing: '0.12em',
                opacity: 0.7,
                textTransform: 'uppercase',
                mb: 0.5,
              }}
            >
              צרו קשר
            </Typography>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <WhatsAppIcon sx={{ fontSize: 18, color: BRAND.green }} />
              <Typography
                component="a"
                href={waHref}
                target="_blank"
                rel="noreferrer"
                sx={LINK_SX}
              >
                WhatsApp
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <PhoneOutlinedIcon sx={{ fontSize: 18, color: BRAND.green }} />
              <Typography component="a" href={telHref} sx={LINK_SX}>
                {FOOTER_INFO.phone}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <EmailOutlinedIcon sx={{ fontSize: 18, color: BRAND.green }} />
              <Typography component="a" href={mailHref} sx={LINK_SX}>
                {FOOTER_INFO.email}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.25} sx={{ pt: 1 }}>
              <Box
                component="a"
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                sx={SOCIAL_SX}
              >
                <InstagramIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box
                component="a"
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                sx={SOCIAL_SX}
              >
                <FacebookIcon sx={{ fontSize: 18 }} />
              </Box>
            </Stack>
          </Stack>

          {/* Left: Links */}
          <Stack spacing={1.5} sx={{ alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Typography
              sx={{
                fontSize: 13,
                letterSpacing: '0.12em',
                opacity: 0.7,
                textTransform: 'uppercase',
                mb: 0.5,
              }}
            >
              קישורים
            </Typography>
            <Link href="/terms" style={{ textDecoration: 'none' }}>
              <Typography sx={LINK_SX}>תנאי שימוש</Typography>
            </Link>
            <Link href="/accessibility" style={{ textDecoration: 'none' }}>
              <Typography sx={LINK_SX}>הצהרת נגישות</Typography>
            </Link>
            <Link href="/privacy" style={{ textDecoration: 'none' }}>
              <Typography sx={LINK_SX}>מדיניות פרטיות</Typography>
            </Link>
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <Typography sx={LINK_SX}>אודות</Typography>
            </Link>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <Typography sx={LINK_SX}>צור קשר</Typography>
            </Link>
          </Stack>
        </Box>

        {/* Bottom strip */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            pt: 2.5,
            borderTop: '1px solid rgba(255,255,255,0.15)',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: 13, color: '#fff', opacity: 0.7 }}>
            © {year} {FOOTER_INFO.name}. כל הזכויות שמורות.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

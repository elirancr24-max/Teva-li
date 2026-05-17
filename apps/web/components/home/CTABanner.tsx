import { Box, Button, Container, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BRAND } from '@/lib/brand';

interface CTABannerProps {
  whatsappHref: string;
  phone: string;
}

/** WhatsApp / phone CTA — green band with mesh accent. */
export function CTABanner({ whatsappHref, phone }: CTABannerProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        background: `linear-gradient(105deg, ${BRAND.green} 0%, #65C84A 50%, ${BRAND.greenDark} 100%)`,
        color: '#fff',
        py: { xs: 6, md: 8 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(at 15% 30%, rgba(255,255,255,0.25) 0px, transparent 50%), radial-gradient(at 85% 70%, rgba(255,179,48,0.35) 0px, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 6 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                opacity: 0.85,
                fontWeight: 800,
                color: '#fff',
              }}
            >
              · בואו נדבר · {phone}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 30, md: 52 },
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
                color: '#fff',
              }}
            >
              יש לכם שאלה?
              <Box component="span" sx={{ display: 'block', color: BRAND.goldLight }}>
                דברו איתנו בוואטסאפ.
              </Box>
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 16 }, opacity: 0.92, fontWeight: 500, maxWidth: 600 }}>
              עונים אישית, כל יום, גם בסופ&quot;ש. הזמנות, התאמות אישיות לאירועים, אנחנו פה לכל שאלה.
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ flexShrink: 0 }}>
            <Button
              component="a"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              endIcon={<ArrowBackIcon />}
              sx={{
                bgcolor: '#fff',
                color: BRAND.greenDark,
                fontSize: 16,
                fontWeight: 900,
                px: 4,
                py: 1.75,
                borderRadius: 999,
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                '&:hover': { bgcolor: BRAND.goldLight, color: BRAND.brown },
              }}
            >
              צ׳אט בוואטסאפ
            </Button>
            <Button
              component="a"
              href={`tel:${phone.replace(/-/g, '')}`}
              variant="outlined"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{
                borderColor: '#fff',
                borderWidth: '1.5px',
                color: '#fff',
                fontSize: 16,
                fontWeight: 800,
                px: 4,
                py: 1.75,
                borderRadius: 999,
                '&:hover': {
                  borderColor: '#fff',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  borderWidth: '1.5px',
                },
              }}
            >
              {phone}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BRAND } from '@/lib/theme';

interface CTABannerProps {
  whatsappHref: string;
  phone: string;
}

/** Sticky-feeling green WhatsApp CTA strip at page bottom. */
export function CTABanner({ whatsappHref, phone }: CTABannerProps) {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#25D366',
        color: BRAND.ink,
        py: { xs: 5, md: 7 },
        borderTop: `2px solid ${BRAND.ink}`,
        borderBottom: `2px solid ${BRAND.ink}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: '50%',
          left: { xs: -20, md: 80 },
          transform: 'translateY(-50%) rotate(-12deg)',
          fontSize: { xs: 100, md: 180 },
          opacity: 0.12,
          pointerEvents: 'none',
        }}
      >
        💬
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 3, md: 4 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: { xs: 11, md: 13 },
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                opacity: 0.65,
                fontWeight: 700,
              }}
            >
              · TALK TO US · {phone}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 28, md: 48 },
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: BRAND.ink,
              }}
            >
              יש לך שאלה? <Box component="span" sx={{ fontStyle: 'italic' }}>דברו איתנו בוואטסאפ.</Box>
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 16 }, opacity: 0.78, fontWeight: 500, pt: 0.5 }}>
              עונים אישית, כל יום, גם בסופ"ש. הזמנות, התאמות, אירועים — אנחנו כאן.
            </Typography>
          </Stack>
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
              bgcolor: BRAND.ink,
              color: '#FFF',
              fontSize: { xs: 16, md: 18 },
              fontWeight: 800,
              px: { xs: 3, md: 5 },
              py: { xs: 1.75, md: 2.25 },
              borderRadius: 999,
              letterSpacing: '0.02em',
              flexShrink: 0,
              '&:hover': { bgcolor: BRAND.greenDark, color: BRAND.ink },
            }}
          >
            לפתיחת צ'אט בוואטסאפ
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

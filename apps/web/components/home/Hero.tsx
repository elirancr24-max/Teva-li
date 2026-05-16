import Link from 'next/link';
import { Box, Button, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BRAND } from '@/lib/theme';

interface HeroProps {
  /** Optional title override (default: brand line). */
  title?: string;
  /** Optional subtitle override (default: brand tagline). */
  subtitle?: string;
  /** Image path under /public. Falls back to /kayak-real.jpg, then solid brand color. */
  imageSrc?: string;
  /** Optional CTA href (default /shop). */
  ctaHref?: string;
  /** Optional CTA label (default "הזמן עכשיו"). */
  ctaLabel?: string;
}

/**
 * Full-width hero banner — single image (1920×300-ish), dark overlay, centered title + CTA.
 * Graceful image fallback: tries /hero-banner.jpg, then /kayak-real.jpg, then BRAND.green.
 * Renders as a server component (no client state needed).
 */
export function Hero({
  title = 'טבע לי — קיאקי פירות לאירועים',
  subtitle = 'פירות וירקות טריים — ישר אליכם הביתה',
  imageSrc = '/hero-banner.jpg',
  ctaHref = '/shop',
  ctaLabel = 'הזמן עכשיו',
}: HeroProps) {
  // Layered backgrounds: primary image, then fallback image, then brand color base.
  // CSS quietly skips a missing image and falls through to the next layer.
  const backgroundImage = `url(${imageSrc}), url(/kayak-real.jpg)`;

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 250, md: 400 },
        backgroundColor: BRAND.green,
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        borderBottom: `2px solid ${BRAND.ink}`,
      }}
    >
      {/* Dark overlay for text contrast */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0,0,0,0.35)',
        }}
      />

      {/* Centered content */}
      <Stack
        spacing={{ xs: 1.5, md: 2.5 }}
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'relative',
          height: '100%',
          textAlign: 'center',
          px: 2,
          zIndex: 1,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: 'var(--font-heebo), Heebo, system-ui, sans-serif',
            color: '#fff',
            fontWeight: 800,
            fontSize: { xs: 32, sm: 44, md: 64, lg: 72 },
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,0.45)',
            maxWidth: 1000,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: '#fff',
            opacity: 0.95,
            fontSize: { xs: 14, md: 18 },
            fontWeight: 500,
            textShadow: '0 1px 8px rgba(0,0,0,0.45)',
            maxWidth: 720,
          }}
        >
          {subtitle}
        </Typography>
        <Box sx={{ pt: { xs: 0.5, md: 1 } }}>
          <Button
            href={ctaHref}
            variant="contained"
            size="large"
            endIcon={<ArrowBackIcon />}
            sx={{
              bgcolor: BRAND.green,
              color: '#fff',
              fontSize: { xs: 16, md: 18 },
              fontWeight: 800,
              px: { xs: 3, md: 4 },
              py: { xs: 1.25, md: 1.5 },
              borderRadius: 999,
              boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
              letterSpacing: '0.02em',
              '&:hover': { bgcolor: BRAND.greenDark },
            }}
          >
            {ctaLabel}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

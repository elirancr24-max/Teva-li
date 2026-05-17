import { Box, Container, Stack, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BRAND, MESH } from '@/lib/brand';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  ctaHref?: string;
  ctaLabel?: string;
}

/**
 * Tropical hero — full-bleed photo background with warm overlay + mesh gradient,
 * two-column layout: text + floating stats card with floating logo.
 */
export function Hero({
  title = 'פירות וירקות טריים במשלוח חינם לדימונה',
  subtitle = 'נקטף בבוקר, אצלכם עד הצהריים. קיאקי פירות לאירועים, קופסאות בריאות, פירות מקולפים ופחיות פירות מוכנות. משלוח חינם בדימונה מעל ₪150.',
  imageSrc = '/hero-tropical.jpg',
  ctaHref = '/shop',
  ctaLabel = 'לקנייה בחנות',
}: HeroProps) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 600, md: 820 },
        display: 'flex',
        alignItems: 'center',
        // Full-bleed photo
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Warm overlay: keeps text readable while preserving the tropical feel */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(110deg, rgba(42,24,16,0.55) 0%, rgba(42,24,16,0.25) 45%, rgba(42,24,16,0.15) 100%)',
        }}
      />
      {/* Tropical mesh accent — adds vivid color pops at corners */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: MESH.sunset,
          mixBlendMode: 'soft-light',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
          }}
        >
          {/* Text column */}
          <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ textAlign: { xs: 'center', md: 'right' }, alignItems: { xs: 'center', md: 'stretch' } }}>
            <Box
              sx={{
                alignSelf: 'flex-start',
                bgcolor: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.6)',
                color: BRAND.brown,
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: '0.05em',
                height: 34,
                display: 'inline-flex',
                alignItems: 'center',
                px: 2,
                gap: 1,
                borderRadius: 999,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: BRAND.gold }} />
              טבע לי · דימונה · משלוח עד חצי שעה!
            </Box>
            <Typography
              component="h1"
              sx={{
                fontFamily: 'var(--font-heebo), Heebo, system-ui, sans-serif',
                color: '#fff',
                fontWeight: 900,
                fontSize: { xs: 38, sm: 52, md: 68, lg: 80 },
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                textShadow: '0 2px 18px rgba(0,0,0,0.35)',
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.92)',
                fontSize: { xs: 15, md: 18 },
                fontWeight: 500,
                lineHeight: 1.55,
                maxWidth: 540,
                textShadow: '0 1px 6px rgba(0,0,0,0.3)',
              }}
            >
              {subtitle}
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ pt: 1, flexWrap: 'wrap', gap: 1.5 }}>
              <Button
                href={ctaHref}
                variant="contained"
                size="large"
                endIcon={<ArrowBackIcon />}
                sx={{
                  bgcolor: BRAND.green,
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 900,
                  px: 4,
                  py: 1.75,
                  borderRadius: 999,
                  letterSpacing: '0.02em',
                  '&:hover': { bgcolor: BRAND.greenDark },
                }}
              >
                {ctaLabel}
              </Button>
              <Button
                href="/kayak"
                variant="outlined"
                size="large"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.96)',
                  color: BRAND.brown,
                  borderColor: 'transparent',
                  fontSize: 16,
                  fontWeight: 900,
                  px: 4,
                  py: 1.75,
                  borderRadius: 999,
                  backdropFilter: 'blur(6px)',
                  '&:hover': { bgcolor: '#fff', borderColor: 'transparent' },
                }}
              >
                קיאק פירות לאירוע
              </Button>
            </Stack>
            {/* Mini-stats */}
            <Stack
              direction="row"
              divider={
                <Box
                  sx={{
                    width: '1px',
                    alignSelf: 'stretch',
                    bgcolor: 'rgba(255,255,255,0.28)',
                  }}
                />
              }
              spacing={{ xs: 3, md: 4 }}
              sx={{ pt: { xs: 1.5, md: 2 } }}
            >
              <Stat value="180+" label="מוצרים בקטלוג" />
              <Stat value="30׳" label="זמן משלוח" />
              <Stat value="24/7" label="שירות לקוחות" />
            </Stack>
          </Stack>

          {/* Logo + price tag card */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              position: 'relative',
            }}
          >
            <Box
              component="img"
              src="/logo-teva-trans.png"
              alt="טבע לי"
              sx={{
                width: { md: 340, lg: 420 },
                height: 'auto',
                filter:
                  'drop-shadow(0 0 12px rgba(255,255,255,0.95)) drop-shadow(0 0 40px rgba(255,255,255,0.7)) drop-shadow(0 18px 36px rgba(0,0,0,0.45))',
              }}
            />
            {/* Floating price tag */}
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(12px)',
                borderRadius: 3,
                px: 3,
                py: 2,
                boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
                textAlign: 'center',
                border: `2px solid ${BRAND.gold}`,
              }}
            >
              <Typography sx={{ fontSize: 11, color: BRAND.goldDark, fontWeight: 900, letterSpacing: '0.14em' }}>
                קיאק פירות החל מ
              </Typography>
              <Typography sx={{ fontSize: 32, fontWeight: 900, color: BRAND.brown, lineHeight: 1, mt: 0.5 }}>
                ₪599
              </Typography>
              <Typography sx={{ fontSize: 11, color: BRAND.brownLight, mt: 0.5 }}>
                לאירוע · מקיף לכל סגנון
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: 900,
          color: '#fff',
          lineHeight: 1,
          textShadow: '0 2px 10px rgba(0,0,0,0.35)',
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.88)',
          mt: 0.5,
          letterSpacing: '0.03em',
          textShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

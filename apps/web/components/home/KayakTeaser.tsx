import { Box, Button, Container, Stack, Typography } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BRAND } from '@/lib/brand';

/** Cinematic tropical teaser for the kayak event-ordering experience. */
export function KayakTeaser() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        // Tropical photo backdrop with deep brown overlay
        backgroundImage: 'url(/hero-tropical.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(26,22,18,0.85) 0%, rgba(26,22,18,0.65) 55%, rgba(26,22,18,0.4) 100%)',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
          }}
        >
          <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ textAlign: { xs: 'center', md: 'right' }, alignItems: { xs: 'center', md: 'stretch' } }}>
            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  bgcolor: BRAND.green,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <CelebrationIcon sx={{ fontSize: 22 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: { xs: 11, md: 12 },
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: BRAND.gold,
                }}
              >
                · חוויה ייחודית · SIGNATURE
              </Typography>
            </Stack>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 36, md: 76 },
                fontWeight: 900,
                letterSpacing: '-0.035em',
                lineHeight: 1,
                color: '#fff',
                textShadow: '0 2px 18px rgba(0,0,0,0.35)',
              }}
            >
              קיאק פירות
              <Box component="span" sx={{ color: BRAND.gold, display: 'block' }}>
                האטרקציה של האירוע.
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 16, md: 20 },
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.9)',
                maxWidth: 560,
                fontWeight: 500,
              }}
            >
              חתונות, ימי הולדת, בר/בת מצווה, אירועי עסקים — קיאק עץ ענק עמוס בפירות עונתיים,
              חתוכים בידנו ומסודרים כיצירת אומנות. מגיע מוכן, נראה מהמם, נעלם מהר.
            </Typography>
            {/* Highlights chips */}
            <Stack direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ flexWrap: 'wrap', gap: 1, pt: 1 }}>
              {[
                'קיאק יחיד מ־₪599',
                'אירוע גדול עד ₪1,999',
                'מסירה והתקנה כלולים',
                'תמונה לזיכרון',
              ].map((chip) => (
                <Box
                  key={chip}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.12)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.22)',
                    px: 2,
                    py: 0.75,
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 700,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ✓ {chip}
                </Box>
              ))}
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}>
              <Button
                href="/kayak"
                variant="contained"
                size="large"
                endIcon={<ArrowBackIcon />}
                sx={{
                  bgcolor: BRAND.gold,
                  color: BRAND.brown,
                  fontSize: 16,
                  fontWeight: 900,
                  px: 4.5,
                  py: 1.75,
                  borderRadius: 999,
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': { bgcolor: BRAND.goldDark },
                }}
              >
                בנה את הקיאק שלי
              </Button>
              <Button
                href="tel:054-8897445"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: '#fff',
                  borderWidth: '1.5px',
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 800,
                  px: 4,
                  py: 1.75,
                  borderRadius: 999,
                  width: { xs: '100%', sm: 'auto' },
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)', borderWidth: '1.5px' },
                }}
              >
                התקשרו: 054-8897445
              </Button>
            </Stack>
          </Stack>

          {/* Logo callout card */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Box
              component="img"
              src="/logo-teva-trans.png"
              alt=""
              sx={{
                width: 280,
                height: 'auto',
                filter:
                  'drop-shadow(0 0 16px rgba(255,255,255,0.5)) drop-shadow(0 20px 40px rgba(0,0,0,0.5))',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

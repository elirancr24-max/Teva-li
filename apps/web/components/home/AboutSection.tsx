import { Box, Container, Stack, Typography } from '@mui/material';
import { BRAND, MESH } from '@/lib/brand';

/**
 * "טבע לי דימונה — מאז 2019" + family story.
 * Layered composition: tropical bg → mesh overlay → centered logo with halo → text on left.
 */
export function AboutSection() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.paper,
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: MESH.tropical,
          opacity: 0.18,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          }}
        >
          {/* LEFT visual side — multi-layer logo composition */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: { xs: '4 / 3', md: '1 / 1' },
              maxHeight: { xs: 360, md: 560 },
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 30px 80px -24px rgba(15,40,24,0.5)',
            }}
          >
            {/* Layer 1: Tropical photo bg */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/hero-tropical.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'saturate(1.1) brightness(0.95)',
              }}
            />
            {/* Layer 2: Mesh gradient overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: MESH.sunset,
                mixBlendMode: 'soft-light',
                opacity: 0.7,
              }}
            />
            {/* Layer 3: Soft dark vignette for logo focus */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at center, transparent 0%, rgba(15,40,24,0.35) 70%, rgba(15,40,24,0.65) 100%)',
              }}
            />
            {/* Layer 4: White halo glow (behind logo) */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                height: '70%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
            {/* Layer 5: Logo centered with float animation */}
            <Box
              component="img"
              src="/logo-teva-trans.png"
              alt="טבע לי"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '70%', md: '65%' },
                height: 'auto',
                filter:
                  'drop-shadow(0 0 18px rgba(255,255,255,0.85)) drop-shadow(0 0 40px rgba(255,200,80,0.6)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
              }}
            />
            {/* Layer 6: EST · 2019 chip top-right */}
            <Box
              sx={{
                position: 'absolute',
                top: 24,
                right: 24,
                bgcolor: 'rgba(255,255,255,0.95)',
                color: BRAND.brown,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 11,
                letterSpacing: '0.2em',
                fontWeight: 800,
                px: 1.75,
                py: 0.9,
                borderRadius: 999,
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                zIndex: 2,
              }}
            >
              EST · 2019
            </Box>
            {/* Layer 7: DIMONA badge bottom-left */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 24,
                left: 24,
                bgcolor: BRAND.gold,
                color: BRAND.brown,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 11,
                letterSpacing: '0.2em',
                fontWeight: 800,
                px: 1.75,
                py: 0.9,
                borderRadius: 999,
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                zIndex: 2,
              }}
            >
              DIMONA · ISRAEL
            </Box>
          </Box>

          {/* RIGHT text side */}
          <Stack spacing={{ xs: 3, md: 4 }} sx={{ maxWidth: 640, textAlign: { xs: 'center', md: 'right' }, alignItems: { xs: 'center', md: 'stretch' } }}>
            <Typography
              sx={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: { xs: 11, md: 12 },
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: BRAND.green,
                fontWeight: 800,
              }}
            >
              · הסיפור שלנו
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 38, md: 64 },
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
                color: BRAND.brown,
              }}
            >
              עסק משפחתי מדימונה,
              <Box component="span" sx={{ color: BRAND.green, display: 'block' }}>
                עם טעם אמיתי של בית.
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 17, md: 19 },
                lineHeight: 1.6,
                color: BRAND.brownLight,
                fontWeight: 500,
              }}
            >
              ב־2019 התחלנו עם רעיון פשוט: פירות וירקות אמיתיים, ישר מהשדה, לדלת שלכם בחצי שעה.
              כל מנגו נחתך ביד באותו בוקר, כל קיאק פירות מעוצב במקצועיות לאירוע שלכם, וכל לקוח
              מקבל יחס אישי על קצה הטלפון.
            </Typography>

            {/* Stats — premium cards */}
            <Stack
              direction="row"
              spacing={{ xs: 1.5, sm: 2 }}
              sx={{ pt: 2 }}
            >
              <StatChip value="+6" label="שנים של פרי טרי" accentColor={BRAND.green} />
              <StatChip value="100%" label="ישראלי, חתוך ביד" accentColor={BRAND.gold} />
              <StatChip value="24/7" label="תמיכה בוואטסאפ" accentColor={BRAND.teal} />
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function StatChip({
  value,
  label,
  accentColor,
}: {
  value: string;
  label: string;
  accentColor: string;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        bgcolor: '#fff',
        borderRadius: 3,
        px: { xs: 1.5, sm: 2.5 },
        py: { xs: 2, sm: 2.5 },
        boxShadow: '0 4px 20px -4px rgba(15,40,24,0.14)',
        border: `1.5px solid ${accentColor}22`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          bgcolor: accentColor,
          borderRadius: '3px 3px 0 0',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 28, sm: 34, md: 38 },
          fontWeight: 900,
          lineHeight: 1,
          color: accentColor,
          letterSpacing: '-0.03em',
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 11, sm: 12 },
          fontWeight: 700,
          color: BRAND.brownLight,
          mt: 0.75,
          lineHeight: 1.3,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

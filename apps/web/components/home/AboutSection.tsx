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
              aspectRatio: '1 / 1',
              maxHeight: 560,
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
          <Stack spacing={{ xs: 3, md: 4 }} sx={{ maxWidth: 640 }}>
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

            {/* Stats — tropical chips */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3 }}
              sx={{ pt: 2 }}
            >
              <StatChip value="+6" label="שנים של פרי טרי" color={BRAND.green} />
              <StatChip value="100%" label="ישראלי, חתוך ביד" color={BRAND.gold} colorText={BRAND.brown} />
              <StatChip value="24/7" label="תמיכה בוואטסאפ" color={BRAND.teal} />
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
  color,
  colorText = '#fff',
}: {
  value: string;
  label: string;
  color: string;
  colorText?: string;
}) {
  return (
    <Box
      sx={{
        bgcolor: color,
        color: colorText,
        borderRadius: 3,
        px: 3,
        py: 2,
        flex: 1,
        boxShadow: '0 8px 20px -6px rgba(15,40,24,0.18)',
      }}
    >
      <Typography sx={{ fontSize: { xs: 32, md: 36 }, fontWeight: 900, lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 700, opacity: 0.9, mt: 0.5 }}>{label}</Typography>
    </Box>
  );
}

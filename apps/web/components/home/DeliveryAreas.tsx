import { Box, Container, Stack, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { BRAND } from '@/lib/brand';

const CITIES = ['דימונה', 'ערד', 'באר שבע', 'ירוחם', 'מצפה רמון'];

/** Delivery zones block — soft green band, icon + cities pills + free-shipping highlight. */
export function DeliveryAreas() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        background: `linear-gradient(135deg, ${BRAND.brown} 0%, #163921 55%, #1d4a2b 100%)`,
        py: { xs: 7, md: 10 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(at 85% 15%, rgba(255,179,48,0.22) 0px, transparent 45%), radial-gradient(at 15% 85%, rgba(76,174,58,0.25) 0px, transparent 55%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={2.25}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: BRAND.gold,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: BRAND.brown,
                boxShadow: '0 8px 24px rgba(255,179,48,0.35)',
              }}
            >
              <LocalShippingOutlinedIcon sx={{ fontSize: 30 }} />
            </Box>
            <Typography
              component="h2"
              sx={{
                color: '#fff',
                fontSize: { xs: 28, md: 44 },
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
              }}
            >
              משלוח טרי
              <br />
              עד הדלת
            </Typography>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: { xs: 15, md: 17 },
                fontWeight: 500,
                lineHeight: 1.55,
                maxWidth: 460,
              }}
            >
              פירות וירקות איכותיים, נקטף בבוקר ומגיע אצלכם באותו יום. למבחר ערים בדרום.
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(255,179,48,0.18)',
                color: BRAND.gold,
                px: 2,
                py: 1,
                borderRadius: 999,
                border: `1px solid rgba(255,179,48,0.35)`,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.02em',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: BRAND.gold }} />
              משלוח חינם מעל ₪150
            </Box>
          </Stack>

          <Stack spacing={2.25}>
            <Typography
              sx={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 11,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: BRAND.gold,
                fontWeight: 800,
              }}
            >
              · אזורי חלוקה
            </Typography>
            <Stack direction="row" flexWrap="wrap" sx={{ gap: 1.25 }}>
              {CITIES.map((city) => (
                <Box
                  key={city}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#fff',
                    px: 2,
                    py: 1.25,
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.75,
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: BRAND.green }} />
                  {city}
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

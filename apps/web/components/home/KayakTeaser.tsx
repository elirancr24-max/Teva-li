import Link from 'next/link';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import KayakingIcon from '@mui/icons-material/Kayaking';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BRAND } from '@/lib/theme';

/** Bold dark teaser block for the kayak event-ordering experience. */
export function KayakTeaser() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.ink,
        color: BRAND.cream,
        py: { xs: 8, md: 14 },
        borderBottom: `2px solid ${BRAND.ink}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative emoji watermarks */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: { xs: -20, md: -40 },
          left: { xs: -10, md: 60 },
          fontSize: { xs: 120, md: 240 },
          opacity: 0.08,
          transform: 'rotate(-18deg)',
          pointerEvents: 'none',
        }}
      >
        🛶
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: { xs: -30, md: -60 },
          right: { xs: -20, md: 80 },
          fontSize: { xs: 140, md: 260 },
          opacity: 0.08,
          transform: 'rotate(12deg)',
          pointerEvents: 'none',
        }}
      >
        🍉
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 6 }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={{ xs: 2, md: 3 }} sx={{ flex: 1, maxWidth: 760 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <KayakingIcon sx={{ fontSize: 28, color: BRAND.green }} />
              <Typography
                sx={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: { xs: 11, md: 13 },
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                  fontWeight: 700,
                  color: BRAND.green,
                }}
              >
                · SIGNATURE EXPERIENCE
              </Typography>
            </Stack>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 40, md: 80 },
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 0.95,
                color: BRAND.cream,
              }}
            >
              אירוע מיוחד? <br />
              <Box component="span" sx={{ color: BRAND.green }}>
                קיאק פירות.
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 17, md: 20 },
                lineHeight: 1.5,
                color: BRAND.cream,
                opacity: 0.78,
                maxWidth: 540,
                fontWeight: 500,
              }}
            >
              חתונות, ימי הולדת, מסיבות משרד — קיאק עץ ענק עמוס בפירות עונתיים, חתוכים בידנו ומסודרים
              כמו יצירת אומנות. מגיע מוכן, נראה מהמם, נעלם מהר.
            </Typography>
            <Box sx={{ pt: 1 }}>
              <Button
                href="/kayak"
                variant="contained"
                size="large"
                endIcon={<ArrowBackIcon />}
                sx={{
                  bgcolor: BRAND.green,
                  color: BRAND.ink,
                  fontSize: 16,
                  fontWeight: 800,
                  px: 4.5,
                  py: 1.75,
                  borderRadius: 999,
                  letterSpacing: '0.02em',
                  '&:hover': { bgcolor: BRAND.greenLight },
                }}
              >
                לבקשת הצעה לקיאק
              </Button>
            </Box>
          </Stack>

          {/* Decorative oversize emoji block */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: 360 },
              height: { xs: 200, md: 360 },
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                inset: 0,
                borderRadius: 4,
                border: `2px solid ${BRAND.green}`,
                opacity: 0.3,
                transform: 'rotate(-4deg)',
              }}
            />
            <Box
              sx={{
                fontSize: { xs: 140, md: 240 },
                lineHeight: 1,
                filter: 'drop-shadow(8px 8px 0 rgba(140,190,60,0.3))',
              }}
            >
              🛶
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

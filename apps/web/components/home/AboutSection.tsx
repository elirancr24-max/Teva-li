import { Box, Container, Stack, Typography } from '@mui/material';
import { BRAND } from '@/lib/theme';

/** "טבע לי דימונה — מאז 2019" + family story. Two-column on desktop. */
export function AboutSection() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.paper,
        py: { xs: 8, md: 14 },
        borderBottom: `2px solid ${BRAND.ink}`,
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 10 }}
          alignItems="center"
        >
          {/* Decorative side (visually left in RTL) */}
          <Box
            sx={{
              position: 'relative',
              width: { xs: '100%', md: 480 },
              minHeight: { xs: 320, md: 520 },
              flexShrink: 0,
              border: `2px solid ${BRAND.ink}`,
              borderRadius: 3,
              bgcolor: BRAND.greenLight,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                top: 24,
                right: 28,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                opacity: 0.55,
                fontWeight: 700,
              }}
            >
              EST. 2019
            </Box>
            <Box sx={{ textAlign: 'center', px: 3 }}>
              <Box
                sx={{
                  fontSize: { xs: 120, md: 200 },
                  lineHeight: 1,
                  transform: 'rotate(-6deg)',
                  filter: 'drop-shadow(6px 6px 0 rgba(13,13,13,0.14))',
                }}
              >
                🍇
              </Box>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
                <Box sx={{ fontSize: { xs: 56, md: 88 }, transform: 'rotate(10deg)' }}>🥭</Box>
                <Box sx={{ fontSize: { xs: 56, md: 88 }, transform: 'rotate(-8deg)' }}>🍑</Box>
              </Box>
            </Box>
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                bottom: 24,
                left: 28,
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 11,
                letterSpacing: '0.16em',
                opacity: 0.55,
                fontWeight: 700,
              }}
            >
              DIMONA · ISRAEL
            </Box>
          </Box>

          {/* Text side */}
          <Stack spacing={{ xs: 3, md: 4 }} sx={{ flex: 1, maxWidth: 640 }}>
            <Typography
              sx={{
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: { xs: 11, md: 13 },
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                opacity: 0.55,
                fontWeight: 700,
              }}
            >
              · OUR STORY
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 36, md: 60 },
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 0.98,
                color: BRAND.ink,
              }}
            >
              טבע לי דימונה — <br />
              <Box component="span" sx={{ color: BRAND.greenDark }}>מאז 2019.</Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 22 },
                lineHeight: 1.55,
                color: BRAND.ink,
                opacity: 0.82,
                fontWeight: 500,
              }}
            >
              המשפחה שלנו, האהבה שלך לפירות. מתחילים את היום עם פירות טריים שנבחרים יחד עם המגדלים,
              חתוכים בידנו בכל בוקר, ומגיעים לדלת שלך עוד בטרם השוק נפתח.
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 4 }}
              divider={
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: '2px',
                    bgcolor: BRAND.ink,
                    opacity: 0.15,
                  }}
                />
              }
              sx={{ pt: 2 }}
            >
              <Stack spacing={0.5}>
                <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 900, letterSpacing: '-0.02em' }}>
                  6+
                </Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.7, fontWeight: 600 }}>
                  שנים של פרי טרי
                </Typography>
              </Stack>
              <Stack spacing={0.5}>
                <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 900, letterSpacing: '-0.02em' }}>
                  100%
                </Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.7, fontWeight: 600 }}>
                  ישראלי, חתוך ביד
                </Typography>
              </Stack>
              <Stack spacing={0.5}>
                <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 900, letterSpacing: '-0.02em' }}>
                  24/7
                </Typography>
                <Typography sx={{ fontSize: 13, opacity: 0.7, fontWeight: 600 }}>
                  תמיכה אישית בוואטסאפ
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

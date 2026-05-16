import { Box, Container, Stack, Typography } from '@mui/material';
import { BRAND } from '@/lib/theme';

interface Badge {
  emoji: string;
  label: string;
  title: string;
  accent?: string;
}

const BADGES: Badge[] = [
  { emoji: '🌿', label: 'FRESHNESS', title: 'טרי מהמשתלה', accent: BRAND.green },
  { emoji: '🚚', label: 'DELIVERY',  title: 'משלוח עד הדלת', accent: BRAND.ink },
  { emoji: '💬', label: 'SUPPORT',   title: 'תמיכה אישית 24/7', accent: BRAND.green },
  { emoji: '🏡', label: 'LOCAL',     title: 'מאז 2019 בדימונה', accent: '#C9184A' },
];

/** Editorial trust strip — 4 bordered cards, monospace label + bold tagline. */
export function TrustBadges() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.paper,
        borderBottom: `2px solid ${BRAND.ink}`,
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 7 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {BADGES.map((b) => (
            <Stack
              key={b.title}
              spacing={1.5}
              sx={{
                border: `2px solid ${BRAND.ink}`,
                borderRadius: 2,
                p: { xs: 2.5, md: 3 },
                bgcolor: BRAND.cream,
                minHeight: { xs: 140, md: 180 },
                transition: 'transform 180ms ease, box-shadow 180ms ease',
                '&:hover': {
                  transform: 'translate(-4px, -4px)',
                  boxShadow: `8px 8px 0 ${BRAND.ink}`,
                },
              }}
            >
              <Box sx={{ fontSize: { xs: 36, md: 44 }, lineHeight: 1 }}>{b.emoji}</Box>
              <Typography
                sx={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: { xs: 10, md: 11 },
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  opacity: 0.55,
                  color: BRAND.ink,
                  fontWeight: 700,
                }}
              >
                · {b.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 17, md: 22 },
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  color: b.accent ?? BRAND.ink,
                }}
              >
                {b.title}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

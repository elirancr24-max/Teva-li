import { Box, Container, Stack, Typography } from '@mui/material';
import LocalFloristOutlinedIcon from '@mui/icons-material/LocalFloristOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import type { ComponentType, SVGProps } from 'react';
import { BRAND } from '@/lib/brand';

interface Badge {
  Icon: ComponentType<{ sx?: object }>;
  label: string;
  title: string;
  desc: string;
}

interface BadgeWithColor extends Badge {
  iconBg: string;
  iconColor: string;
}

const BADGES: BadgeWithColor[] = [
  {
    Icon: LocalFloristOutlinedIcon,
    label: 'FRESHNESS',
    title: 'טרי מהמשתלה',
    desc: 'נקטף בבוקר, מגיע אליכם באותו יום',
    iconBg: '#E8F5DC',
    iconColor: BRAND.greenDark,
  },
  {
    Icon: LocalShippingOutlinedIcon,
    label: 'DELIVERY',
    title: 'משלוח עד חצי שעה',
    desc: 'דימונה והסביבה · מעל ₪150 חינם',
    iconBg: '#FFF4D6',
    iconColor: BRAND.goldDark,
  },
  {
    Icon: SupportAgentOutlinedIcon,
    label: 'SUPPORT',
    title: 'תמיכה אישית 24/7',
    desc: 'בוואטסאפ או טלפון, תמיד פה',
    iconBg: '#DFF5F1',
    iconColor: BRAND.tealDark,
  },
  {
    Icon: VerifiedOutlinedIcon,
    label: 'LOCAL',
    title: 'מאז 2019 בדימונה',
    desc: 'עסק משפחתי, פירות וירקות איכותיים',
    iconBg: '#FFEDED',
    iconColor: BRAND.watermelonDark,
  },
];

/** Premium trust strip — 4 minimal cards, SVG icons inside green circle. */
export function TrustBadges() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: BRAND.paper,
        borderBottom: `1px solid #ececec`,
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
          {BADGES.map(({ Icon, label, title, desc, iconBg, iconColor }) => (
            <Stack
              key={title}
              spacing={1.5}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              textAlign={{ xs: 'right', md: 'center' }}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: 4,
                transition: 'background-color 220ms ease, box-shadow 220ms ease',
                '&:hover': {
                  bgcolor: 'rgba(255,249,229,0.55)',
                  boxShadow: '0 8px 22px rgba(15,40,24,0.06)',
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: 56, md: 72 },
                  height: { xs: 56, md: 72 },
                  borderRadius: '50%',
                  bgcolor: iconBg,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: iconColor,
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(42,24,16,0.08)',
                }}
              >
                <Icon sx={{ fontSize: { xs: 28, md: 36 } }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: BRAND.brownLight,
                  fontWeight: 800,
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 16, md: 19 },
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  color: BRAND.ink,
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 13, md: 14 },
                  color: 'rgba(0,0,0,0.62)',
                  lineHeight: 1.5,
                  maxWidth: 280,
                }}
              >
                {desc}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

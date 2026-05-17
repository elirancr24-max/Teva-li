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
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 7 } }}>

        {/* Mobile: horizontal scroll strip */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            gap: 2,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            pb: 1,
            mx: -2,
            px: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {BADGES.map(({ Icon, label, title, desc, iconBg, iconColor }) => (
            <Stack
              key={title}
              spacing={1.25}
              alignItems="flex-start"
              sx={{
                flex: '0 0 160px',
                scrollSnapAlign: 'start',
                bgcolor: '#fff',
                borderRadius: 3,
                p: 2,
                boxShadow: '0 2px 12px rgba(15,40,24,0.07)',
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  bgcolor: iconBg,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: iconColor,
                  flexShrink: 0,
                }}
              >
                <Icon sx={{ fontSize: 24 }} />
              </Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  color: BRAND.ink,
                }}
              >
                {title}
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: 'rgba(0,0,0,0.58)', lineHeight: 1.45 }}>
                {desc}
              </Typography>
            </Stack>
          ))}
        </Box>

        {/* Desktop: 4-col grid */}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid' },
            gap: 3,
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
        >
          {BADGES.map(({ Icon, label, title, desc, iconBg, iconColor }) => (
            <Stack
              key={title}
              spacing={1.5}
              alignItems="center"
              textAlign="center"
              sx={{
                p: 3,
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
                  width: 72,
                  height: 72,
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
                <Icon sx={{ fontSize: 36 }} />
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
              <Typography sx={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2, color: BRAND.ink }}>
                {title}
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'rgba(0,0,0,0.62)', lineHeight: 1.5, maxWidth: 280 }}>
                {desc}
              </Typography>
            </Stack>
          ))}
        </Box>

      </Container>
    </Box>
  );
}

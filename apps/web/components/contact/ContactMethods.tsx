import { Box, Stack, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { BRAND } from '@/lib/brand';
import { whatsappLink } from '@/lib/settings';

type Props = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
};

const LABEL_SX = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  opacity: 0.6,
};

export function ContactMethods({ phone, whatsapp, email, address, hours }: Props) {
  const waHref = whatsappLink(whatsapp, 'היי! יש לי שאלה.');
  const telHref = `tel:${phone.replace(/\s+/g, '')}`;
  const mailHref = `mailto:${email}`;

  return (
    <Stack spacing={2.5}>
      {/* WhatsApp — big green card */}
      <Box
        component="a"
        href={waHref}
        target="_blank"
        rel="noreferrer"
        sx={{
          textDecoration: 'none',
          border: `2px solid ${BRAND.ink}`,
          bgcolor: BRAND.green,
          color: BRAND.ink,
          p: { xs: 3, md: 4 },
          display: 'block',
          transition: 'transform 200ms, box-shadow 200ms',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: `6px 6px 0 ${BRAND.ink}`,
          },
        }}
      >
        <Stack direction="row" spacing={2.5} alignItems="center">
          <Box
            sx={{
              width: 56,
              height: 56,
              bgcolor: BRAND.ink,
              color: BRAND.green,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 30 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ ...LABEL_SX, color: BRAND.ink }}>הכי מהיר</Typography>
            <Typography sx={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em', mt: 0.5 }}>
              שלחו לנו WhatsApp
            </Typography>
            <Typography sx={{ fontSize: 13, opacity: 0.85, mt: 0.5 }}>
              עונים בדרך כלל תוך 10 דקות בשעות הפעילות.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Phone */}
      <Box
        component="a"
        href={telHref}
        sx={{
          textDecoration: 'none',
          border: `2px solid ${BRAND.ink}`,
          bgcolor: '#fff',
          color: BRAND.ink,
          p: 3,
          display: 'block',
          transition: 'background-color 200ms',
          '&:hover': { bgcolor: BRAND.cream },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              border: `2px solid ${BRAND.green}`,
              color: BRAND.green,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PhoneOutlinedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography sx={LABEL_SX}>טלפון</Typography>
            <Typography
              sx={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em', mt: 0.25, direction: 'ltr' }}
            >
              {phone}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Email */}
      <Box
        component="a"
        href={mailHref}
        sx={{
          textDecoration: 'none',
          border: `2px solid ${BRAND.ink}`,
          bgcolor: '#fff',
          color: BRAND.ink,
          p: 3,
          display: 'block',
          transition: 'background-color 200ms',
          '&:hover': { bgcolor: BRAND.cream },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              border: `2px solid ${BRAND.green}`,
              color: BRAND.green,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <EmailOutlinedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography sx={LABEL_SX}>אימייל</Typography>
            <Typography
              sx={{ fontSize: 18, fontWeight: 700, mt: 0.25, direction: 'ltr', wordBreak: 'break-all' }}
            >
              {email}
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Address + hours */}
      <Box
        sx={{
          border: `2px solid ${BRAND.ink}`,
          bgcolor: '#fff',
          color: BRAND.ink,
          p: 3,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box
            sx={{
              width: 44,
              height: 44,
              border: `2px solid ${BRAND.green}`,
              color: BRAND.green,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PlaceOutlinedIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography sx={LABEL_SX}>איפה אנחנו</Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 700, mt: 0.25 }}>{address}</Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', mt: 1.5, lineHeight: 1.6 }}>
              שעות פעילות
              <br />
              {hours}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

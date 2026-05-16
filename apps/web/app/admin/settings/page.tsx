import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import { getSettings } from '@/lib/settings';
import { BRAND } from '@/lib/theme';
import { SettingsForm } from './SettingsForm';

export const metadata: Metadata = {
  title: 'הגדרות — אדמין',
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <Box>
      <Box sx={{ px: 4, pt: 4, pb: 2.5, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: 11,
            letterSpacing: '0.15em',
            color: '#888',
            mb: 0.5,
            textTransform: 'uppercase',
          }}
        >
          ניהול אתר · עסק · משלוח · תוכן
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 36, md: 52 },
            fontWeight: 900,
            color: BRAND.ink,
            letterSpacing: '-0.04em',
          }}
        >
          הגדרות.
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <SettingsForm initial={settings} />
      </Box>
    </Box>
  );
}

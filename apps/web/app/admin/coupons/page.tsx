import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/theme';
import { CouponsClient, type Coupon } from './CouponsClient';

export const metadata: Metadata = {
  title: 'קופונים — אדמין',
  robots: { index: false, follow: false },
};

export default async function CouponsPage() {
  const { data } = await adminSupabase
    .from('coupons')
    .select('id, code, discount_pct, active, expires_at, created_at')
    .order('created_at', { ascending: false });

  const coupons = (data ?? []) as Coupon[];
  const activeCount = coupons.filter((c) => c.active).length;

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
          {activeCount} פעילים · {coupons.length - activeCount} כבויים
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
          קופונים.
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <CouponsClient coupons={coupons} />
      </Box>
    </Box>
  );
}

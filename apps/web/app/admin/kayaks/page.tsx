import type { Metadata } from 'next';
import { Box, Typography } from '@mui/material';
import { adminSupabase } from '@/lib/supabase/admin';
import { BRAND } from '@/lib/brand';
import { KayakCard } from './KayakCard';
import type { KayakOrder } from '@/types/db';

export const metadata: Metadata = { title: 'קיאקים — אדמין', robots: { index: false, follow: false } };

export default async function KayaksPage() {
  const { data } = await adminSupabase
    .from('kayak_orders')
    .select('*')
    .order('created_at', { ascending: false });

  const kayaks = (data ?? []) as KayakOrder[];
  const pending = kayaks.filter((k) => k.status === 'pending').length;

  return (
    <Box>
      <Box sx={{ px: 4, pt: 4, pb: 2.5, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', color: '#888', mb: 0.5 }}>
          {kayaks.length} הזמנות · {pending} ממתינות לאישור
        </Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 900, color: BRAND.ink, letterSpacing: '-0.04em' }}>
          קיאקים.
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        {kayaks.length === 0 ? (
          <Typography sx={{ fontFamily: 'monospace', fontSize: 13, color: '#888', textAlign: 'center', py: 6 }}>
            אין הזמנות קיאק עדיין
          </Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {kayaks.map((kayak) => (
              <KayakCard key={kayak.id} kayak={kayak} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

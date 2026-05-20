import { Box, Skeleton } from '@mui/material';
import { BRAND } from '@/lib/brand';

export default function AdminLoading() {
  return (
    <Box>
      <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 3, md: 4 }, pb: 2.5, borderBottom: `2px solid ${BRAND.ink}` }}>
        <Skeleton variant="text" width={140} height={16} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={320} height={56} />
      </Box>
      <Box sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 0 }} />
        <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 0 }} />
        <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 0 }} />
        <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 0 }} />
        <Skeleton variant="rectangular" height={48} sx={{ borderRadius: 0 }} />
      </Box>
    </Box>
  );
}

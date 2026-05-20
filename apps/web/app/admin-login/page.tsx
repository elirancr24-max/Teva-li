import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { LoginForm } from './LoginForm';
import { verifyAdminCookie } from '@/lib/admin/auth';

export const metadata: Metadata = { title: 'כניסה לאדמין', robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (verifyAdminCookie(token)) redirect('/admin');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0D0D0D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl',
      }}
    >
      <Box sx={{ width: 360 }}>
        <Typography sx={{ fontWeight: 900, fontSize: 40, color: '#fff', mb: 0.5, letterSpacing: '-0.03em' }}>
          טבע לי
        </Typography>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', color: '#555', mb: 4 }}>
          ADMIN PANEL
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}

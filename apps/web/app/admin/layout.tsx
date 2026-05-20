import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Box } from '@mui/material';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminToastProvider } from '@/components/admin/AdminToastProvider';
import { verifyAdminCookie } from '@/lib/admin/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;

  if (!verifyAdminCookie(token)) {
    redirect('/admin-login');
  }

  return (
    <AdminToastProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh', direction: 'rtl', bgcolor: '#f8f7f5' }}>
        <AdminShell>{children}</AdminShell>
      </Box>
    </AdminToastProvider>
  );
}

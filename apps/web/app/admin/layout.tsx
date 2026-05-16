import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Box } from '@mui/material';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || token !== adminPassword) {
    redirect('/admin-login');
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', direction: 'rtl' }}>
      <AdminSidebar />
      <Box sx={{ flex: 1, overflow: 'auto', bgcolor: '#f8f7f5' }}>
        {children}
      </Box>
    </Box>
  );
}

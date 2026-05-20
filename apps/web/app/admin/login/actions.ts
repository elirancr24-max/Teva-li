'use server';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAdminPassword, mintSessionToken, getClientIp } from '@/lib/admin/auth';
import { checkLoginRate } from '@/lib/admin/rate-limit';
import { logAdminAction } from '@/lib/admin/audit';

export async function adminLogin(_prev: unknown, formData: FormData) {
  const hdrs = await headers();
  const ip = getClientIp(hdrs);

  const rate = checkLoginRate(ip);
  if (!rate.allowed) {
    return { error: `יותר מדי ניסיונות. נסה שוב בעוד ${rate.resetInSec} שניות.` };
  }

  const password = String(formData.get('password') ?? '');
  const ok = await verifyAdminPassword(password);

  if (!ok) {
    await logAdminAction('login.fail', 'auth', null, { ip });
    return { error: 'סיסמה שגויה' };
  }

  // Success — clear rate limit window for this IP and mint signed session.
  rate.reset();

  const token = mintSessionToken();
  const cookieStore = await cookies();
  cookieStore.set('admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24h for admin
    path: '/',
    sameSite: 'lax',
  });

  await logAdminAction('login.success', 'auth', null, { ip });
  redirect('/admin');
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin-token');
  await logAdminAction('logout', 'auth');
  redirect('/admin-login');
}

'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function adminLogin(_prev: unknown, formData: FormData) {
  const password = formData.get('password') as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return { error: 'סיסמה שגויה' };
  }

  const cookieStore = await cookies();
  cookieStore.set('admin-token', adminPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
  });

  redirect('/admin');
}

import type { Metadata, Viewport } from 'next';
import { Heebo, Rubik } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-rubik',
  display: 'swap',
});

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peri-li.com'),
  title: {
    default: 'פרי לי · פירות וירקות טריים · דימונה',
    template: '%s · פרי לי',
  },
  description:
    'פירות וירקות טריים נחתכים בבוקר. משלוח חינם בדימונה, באותו יום.',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    siteName: 'פרי לי',
  },
};

export const viewport: Viewport = {
  themeColor: '#F0EFEC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${heebo.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

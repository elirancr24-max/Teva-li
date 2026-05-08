import type { Metadata, Viewport } from 'next';
import { Heebo, Frank_Ruhl_Libre, JetBrains_Mono, Assistant } from 'next/font/google';
import './globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-heebo',
  display: 'swap',
});

const frank = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal'],
  variable: '--font-frank',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-assistant',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://peri-li.com'),
  title: {
    default: 'פרי לי · פירות קלופים · קיאקי אירועים · דימונה',
    template: '%s · פרי לי',
  },
  description:
    'פירות קלופים שנחתכו בבוקר וקיאקי פירות לאירועים שלא שוכחים. מדימונה, ביד, באותו יום.',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    siteName: 'פרי לי',
  },
};

export const viewport: Viewport = {
  themeColor: '#fdfbf5',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${frank.variable} ${jetbrains.variable} ${assistant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

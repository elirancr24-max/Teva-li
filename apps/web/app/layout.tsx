import type { Metadata, Viewport } from 'next';
import { Heebo, Rubik } from 'next/font/google';
import { Providers } from './providers';
import { AccessibilityWidget } from '@/components/a11y/AccessibilityWidget';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://teva-li.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'טבע לי · פירות וירקות טריים במשלוח חינם לדימונה',
    template: '%s · טבע לי',
  },
  description:
    'פירות וירקות טריים נקטפים בבוקר, אצלכם עד הצהריים. משלוח חינם בדימונה מעל ₪150. קיאקי פירות לאירועים, פירות מקולפים, פחיות פירות מוכנות.',
  keywords: ['פירות', 'ירקות', 'דימונה', 'משלוח פירות', 'קיאק פירות', 'פירות חתוכים', 'פחיות פירות', 'אירועים', 'טבע לי'],
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    siteName: 'טבע לי',
    title: 'טבע לי · פירות וירקות טריים במשלוח חינם לדימונה',
    description:
      'פירות וירקות טריים נקטפים בבוקר. משלוח חינם בדימונה מעל ₪150. קיאקי פירות לאירועים.',
    images: ['/logo-teva-trans.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'טבע לי · פירות וירקות טריים לדימונה',
    description: 'נקטף בבוקר, אצלכם עד הצהריים.',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  themeColor: '#F0EFEC',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const ldJson = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#org`,
      name: 'טבע לי',
      url: SITE_URL,
      logo: `${SITE_URL}/logo-teva-trans.png`,
      sameAs: [],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}#business`,
      name: 'טבע לי',
      image: `${SITE_URL}/logo-teva-trans.png`,
      url: SITE_URL,
      priceRange: '₪₪',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'דימונה',
        addressCountry: 'IL',
      },
      areaServed: 'דימונה והסביבה',
      servesCuisine: 'פירות וירקות טריים',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} ${heebo.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">דלגו לתוכן העיקרי</a>
        <Providers>
          <div id="main">{children}</div>
        </Providers>
        <AccessibilityWidget />
      </body>
    </html>
  );
}

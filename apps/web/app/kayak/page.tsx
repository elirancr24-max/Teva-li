import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';
import { KayakConfigurator, type SizeRow } from './KayakConfigurator';

export const metadata: Metadata = {
  title: 'בנה קיאק · פירות לאירוע',
  description:
    'בחר גודל, פירות ותוספות לקיאק הפירות שלך. החוויה הקולינרית לאירוע — חתונות, בר/בת מצווה, ימי הולדת ואירועים עסקיים.',
};

// Hardcoded fallback if kayak_sizes table is empty or unreachable.
const FALLBACK_SIZES: SizeRow[] = [
  { id: 'S', label: 'קטן', guests: '8-12 אורחים', price_cents: 28000 },
  { id: 'M', label: 'בינוני', guests: '15-25 אורחים', price_cents: 45000 },
  { id: 'L', label: 'גדול', guests: '30-45 אורחים', price_cents: 70000 },
  { id: 'XL', label: 'ענק', guests: '50+ אורחים', price_cents: 120000 },
];

const SIZE_ORDER: Record<string, number> = { S: 0, M: 1, L: 2, XL: 3 };

export default async function KayakPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('kayak_sizes')
    .select('id, label, guests, price_cents');

  const rows = (data as SizeRow[] | null) ?? [];
  let sizes: SizeRow[] = rows.length > 0 ? rows : FALLBACK_SIZES;

  // Sort by canonical S→M→L→XL order if ids match; otherwise leave as-is.
  sizes = [...sizes].sort((a, b) => {
    const ai = SIZE_ORDER[a.id] ?? 99;
    const bi = SIZE_ORDER[b.id] ?? 99;
    return ai - bi;
  });

  return (
    <>
      <Header />
      <main>
        <KayakConfigurator sizes={sizes} />
      </main>
      <Footer />
    </>
  );
}

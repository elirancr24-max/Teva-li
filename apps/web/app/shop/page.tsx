import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = {
  title: 'קטלוג · פירות קלופים',
  description: '12 זנים זמינים היום, נחתכו בבוקר ונארזו במקרר. משלוח חינם בדימונה.',
};

export default function ShopPage() {
  return (
    <PlaceholderPage
      title="הקטלוג"
      subtitle="הקטלוג המלא יעבור לכאן ב-Phase 2 — חיבור ל-Supabase, רשת מוצרים מהדאטה, סינון, מיון, ועריכה דרך האדמין."
      phase="02"
      active="shop"
      navActive="shop"
    />
  );
}

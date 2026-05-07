import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = {
  title: 'הסל שלי',
};

export default function CartPage() {
  return (
    <PlaceholderPage
      title="הסל"
      subtitle="הסל יעבור לכאן ב-Phase 3 — Zustand persistent store, qty steppers, סיכום משלוח, וכפתור 'המשך לתשלום'."
      phase="03"
      navActive="cart"
    />
  );
}

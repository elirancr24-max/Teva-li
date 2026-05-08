import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = {
  title: 'אדמין',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <PlaceholderPage
      title="ניהול"
      subtitle="פאנל האדמין ייבנה ב-Phase 6 — KPI דשבורד, CRUD מוצרים, ניהול הזמנות + קיאקים, אישורי תשלום, קופונים, הגדרות משלוח."
      phase="06"
    />
  );
}

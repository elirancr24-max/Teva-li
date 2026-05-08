import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = {
  title: 'בנה קיאק · פירות לאירוע',
  description: 'בחר גודל, פירות, ותוספות — מקבל את הקיאק ביום האירוע.',
};

export default function KayakPage() {
  return (
    <PlaceholderPage
      title="בנה את הקיאק שלך"
      subtitle="הקונפיגורטור יעבור לכאן ב-Phase 4 — בחירת גודל, פירות ותוספות, פתיחת הזמנה ל-DB עם status pending, ושליחת מייל לאדמין."
      phase="04"
      active="kayak"
      navActive="kayak"
    />
  );
}

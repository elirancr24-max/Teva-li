import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'האזור האישי' };

export default function AccountPage() {
  return (
    <PlaceholderPage
      title="האזור האישי"
      subtitle="האזור האישי ייפתח ב-Phase 5 — Supabase Auth (magic link + Google OAuth), הזמנות, קיאקים, כתובות, הגדרות."
      phase="05"
      navActive="profile"
    />
  );
}

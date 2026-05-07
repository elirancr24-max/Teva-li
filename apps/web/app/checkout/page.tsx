import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/layout/PlaceholderPage';

export const metadata: Metadata = { title: 'תשלום' };

export default function CheckoutPage() {
  return (
    <PlaceholderPage
      title="תשלום"
      subtitle="תהליך התשלום יוקם ב-Phase 3 — Stripe PaymentElement, Server Action ליצירת PaymentIntent, webhook לעדכון סטטוס ב-Supabase, מייל אישור."
      phase="03"
      navActive="cart"
    />
  );
}

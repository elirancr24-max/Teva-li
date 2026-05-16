import type { Metadata } from 'next';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export const metadata: Metadata = { title: 'תשלום' };

export default function CheckoutPage() {
  return <CheckoutForm />;
}

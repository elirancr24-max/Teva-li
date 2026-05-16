import type { Metadata } from 'next';
import { CartView } from '@/components/cart/CartView';

export const metadata: Metadata = {
  title: 'הסל שלי',
};

export default function CartPage() {
  return <CartView />;
}

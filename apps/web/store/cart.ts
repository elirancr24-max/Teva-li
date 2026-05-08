import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderItem } from '@/types/db';

type CartItem = OrderItem & { slug: string };

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  totalCents: () => number;
  itemCount: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add(item) {
        set((s) => {
          const existing = s.items.find((i) => i.product_id === item.product_id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.product_id === item.product_id
                  ? { ...i, qty: i.qty + item.qty }
                  : i,
              ),
            };
          }
          return { items: [...s.items, item] };
        });
      },

      remove(productId) {
        set((s) => ({ items: s.items.filter((i) => i.product_id !== productId) }));
      },

      setQty(productId, qty) {
        if (qty <= 0) {
          get().remove(productId);
          return;
        }
        set((s) => ({
          items: s.items.map((i) => (i.product_id === productId ? { ...i, qty } : i)),
        }));
      },

      clear() {
        set({ items: [] });
      },

      totalCents() {
        return get().items.reduce((sum, i) => sum + i.price_cents * i.qty, 0);
      },

      itemCount() {
        return get().items.reduce((sum, i) => sum + i.qty, 0);
      },
    }),
    { name: 'peri-li-cart' },
  ),
);

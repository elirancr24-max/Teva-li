import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '@/types/shop';

interface CartState {
  items: CartItem[];
  isExpanded: boolean;
}

const initialState: CartState = {
  items: [],
  isExpanded: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items;
      state.isExpanded = action.payload.isExpanded;
    },
    addItem(state, action: PayloadAction<{ product: Product; amount?: number }>) {
      const { product, amount } = action.payload;
      const inc = amount ?? product.step;
      const existing = state.items.find((i) => i.productId === product.id);
      if (existing) {
        existing.amount = +(existing.amount + inc).toFixed(2);
      } else {
        state.items.push({ productId: product.id, amount: inc, product });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    updateAmount(state, action: PayloadAction<{ productId: string; amount: number }>) {
      const { productId, amount } = action.payload;
      if (amount <= 0) {
        state.items = state.items.filter((i) => i.productId !== productId);
        return;
      }
      const item = state.items.find((i) => i.productId === productId);
      if (item) item.amount = +amount.toFixed(2);
    },
    incrementAmount(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.amount = +(item.amount + item.product.step).toFixed(2);
    },
    decrementAmount(state, action: PayloadAction<string>) {
      const item = state.items.find((i) => i.productId === action.payload);
      if (!item) return;
      const next = +(item.amount - item.product.step).toFixed(2);
      if (next <= 0) {
        state.items = state.items.filter((i) => i.productId !== action.payload);
      } else {
        item.amount = next;
      }
    },
    toggleCart(state) {
      state.isExpanded = !state.isExpanded;
    },
    clearCart(state) {
      state.items = [];
    },
    loadPreviousOrder(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  hydrate,
  addItem,
  removeItem,
  updateAmount,
  incrementAmount,
  decrementAmount,
  toggleCart,
  clearCart,
  loadPreviousOrder,
} = cartSlice.actions;

export default cartSlice.reducer;

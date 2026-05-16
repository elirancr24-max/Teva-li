'use client';
import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cart, { hydrate } from './slices/cartSlice';
import products from './slices/productsSlice';
import categories from './slices/categoriesSlice';

const STORAGE_KEY = 'teva-li-cart-v2';

const persistMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  if (typeof window === 'undefined') return result;
  const a = action as { type?: string };
  if (a.type && a.type.startsWith('cart/')) {
    try {
      const state = (storeApi.getState() as RootState).cart;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }
  return result;
};

export const store = configureStore({
  reducer: { cart, products, categories },
  middleware: (getDefault) => getDefault().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function loadCartFromStorage() {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) {
      store.dispatch(hydrate(parsed));
    }
  } catch {}
}

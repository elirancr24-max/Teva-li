import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/shop';

export type SortBy = 'category' | 'price-asc' | 'price-desc' | 'name';

interface ProductsState {
  byId: Record<string, Product>;
  ids: string[];
  sortBy: SortBy;
  query: string;
}

const initialState: ProductsState = {
  byId: {},
  ids: [],
  sortBy: 'category',
  query: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.byId = {};
      state.ids = [];
      for (const p of action.payload) {
        state.byId[p.id] = p;
        state.ids.push(p.id);
      }
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setProducts, setSortBy, setQuery } = productsSlice.actions;
export default productsSlice.reducer;

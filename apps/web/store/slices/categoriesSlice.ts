import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from '@/types/shop';

interface CategoriesState {
  byId: Record<string, Category>;
  ids: string[];
  activeCategoryId: string | null;
}

const initialState: CategoriesState = {
  byId: {},
  ids: [],
  activeCategoryId: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.byId = {};
      state.ids = [];
      for (const c of action.payload) {
        state.byId[c.id] = c;
        state.ids.push(c.id);
      }
    },
    setActiveCategory(state, action: PayloadAction<string | null>) {
      state.activeCategoryId = action.payload;
    },
  },
});

export const { setCategories, setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;

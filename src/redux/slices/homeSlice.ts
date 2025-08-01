import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../types';

interface HomeState {
 categories: Category[];
 selectedCategory: Category | null;
}

const initialState: HomeState = {
  categories: [],
  selectedCategory: null,
};


const homeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<{categories: Category[]}>) => {
      state.categories = action.payload?.categories || [];
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategories, setSelectedCategory } = homeSlice.actions;
export default homeSlice.reducer;

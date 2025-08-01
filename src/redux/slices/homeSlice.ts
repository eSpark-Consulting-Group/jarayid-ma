import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, Category } from '../../types';

interface HomeState {
  categories: Category[];
  selectedCategory: Category | null;
  articles: Article[];
}

const initialState: HomeState = {
  categories: [],
  selectedCategory: null,
  articles: [],
};

const homeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCategories: (
      state,
      action: PayloadAction<{ categories: Category[] }>,
    ) => {
      state.categories = action.payload?.categories || [];
    },
    setSelectedCategory: (state, action: PayloadAction<Category | null>) => {
      state.selectedCategory = action.payload;
    },
    setArticles: (state, action: PayloadAction<{ articles: Article[] }>) => {
      state.articles = action.payload.articles || [];
    },
  },
});

export const { setCategories, setSelectedCategory, setArticles } =
  homeSlice.actions;
export default homeSlice.reducer;

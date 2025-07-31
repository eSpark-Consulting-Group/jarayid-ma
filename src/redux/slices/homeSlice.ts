import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
 categories: any;
 selectedCategory: string | null;
}

const initialState: HomeState = {
  categories: [],
  selectedCategory: null,
};


const homeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload?.categories || [];
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategories, setSelectedCategory } = homeSlice.actions;
export default homeSlice.reducer;

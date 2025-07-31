import api from './api';
import { setCategories } from '../redux/slices/homeSlice';

import { AppDispatch } from '../redux/store';

export const fetchAllCategories = () => async (dispatch: AppDispatch) => {
  let allItems: any[] = [];
  let page = 1;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const response = await api.get(`/categories?page=${page}&limit=10`);
      const { items, pagination } = response.data.data;
      allItems = allItems.concat(items);
      hasNextPage = pagination.hasNextPage;
      page = pagination.nextPage || page + 1;
    }
    dispatch(setCategories({ categories: allItems }));
  } catch (error) {
    // Optionally handle error here
    console.error('Failed to fetch categories:', error);
  }
};

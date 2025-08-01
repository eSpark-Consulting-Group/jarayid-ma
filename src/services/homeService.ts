import api from './api';
import { setCategories } from '../redux/slices/homeSlice';

import { AppDispatch } from '../redux/store';
import { Category } from '../types';

export const fetchAllCategories = () => async (dispatch: AppDispatch) => {
  let allItems: Category[] = [];
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


export const fetchYoutubeContent = async ({
  page = 1,
  limit = 20,
  categoryId,
  isEnabled = true,
  deviceType = 'MOBILE',
  sortBy = 'createdAt',
  sortOrder = 'desc',
}: {
  page?: number;
  limit?: number;
  categoryId: string;
  isEnabled?: boolean;
  deviceType?: string;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const response = await api.get(
    `/youtube-content?page=${page}&limit=${limit}&categoryId=${categoryId}&isEnabled=${isEnabled}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return response.data.data;
};


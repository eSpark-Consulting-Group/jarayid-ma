import api from './api';

export interface NewSourceFilterParams {
  search?: string;
  categoryId?: string;
  status?: boolean;
  subType?: 'SPORTS' | 'ECONOMICS' | 'POLITICS';
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  status: string;
  logo: string;
  categoryId: string;
  subType: string;
  category: NewSourceCategories;
  createdAt: string;
  updatedAt: string;
}

interface NewSourceCategories {
  id: string;
  name: string;
  type: string;
}


export const getAllNewSourceData = async (
  filters: NewSourceFilterParams = {}
): Promise<any[]> => {
  let allItems: any[] = [];
  let page = 1;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const response = await api.get('/rss-feeds', {
        params: {
          ...filters,
          page,
          limit: 20,
        },
      });
        console.log('Fetched Sources:', response.data.data);
      const { items, pagination } = response.data.data;
      allItems = allItems.concat(items);
      hasNextPage = pagination.hasNextPage;
      page = pagination.nextPage || page + 1;
    }

    return allItems;
  } catch (error) {
    console.error('Failed to fetch news sources:', error);
    return [];
  }
};
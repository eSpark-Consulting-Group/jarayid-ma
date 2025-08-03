import api from './api';

interface ArticlesParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?:
    | 'title'
    | 'publishedAt'
    | 'createdAt'
    | 'viewCount'
    | 'source'
    | 'pinned';
  sortOrder?: 'asc' | 'desc';
  categoryId?: string;
  subType?: 'SPORTS' | 'ECONOMICS' | 'POLITICS';
  pinned?: boolean;
  status?: boolean;
  trackViews?: boolean;
  dateFrom?: string;
  dateTo?: string;
  createdFrom?: string;
  createdTo?: string;
}

export const getArticles = async (params: ArticlesParams) => {
  const response = await api.get('/articles', { params });
  return response.data.data;
};

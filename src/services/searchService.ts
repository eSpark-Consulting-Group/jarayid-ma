import api from './api';

interface SearchArticlesParams {
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

export const searchArticles = async (params: SearchArticlesParams) => {
  const response = await api.get('/articles', { params });
  return response.data.data;
};

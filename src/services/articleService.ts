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

interface CommentParams {
  articleId: string;
  content: string;
}

export const getArticles = async (params: ArticlesParams) => {
  const response = await api.get('/articles', { params });
  return response.data.data;
};

export const getArticleById = async (id: string) => {
  const response = await api.get(`/articles/${id}`);
  return response.data.data;
};

export const commentArticle = async (params: CommentParams) => {
  const response = await api.post('/comments', { params });
  return response.data.data;
};

import api from './api';

export interface ReadLaterServiceList {
  items: ReadLaterServiceItem[];
  pagination: Pagination;
  meta: Meta;
}

export interface ReadLaterServiceItem {
  id: string;
  title: string;
  url: string;
  source: string;
  originalContent: any;
  summaryArabic: string;
  summaryEnglish: string;
  image: string;
  imageKey: string;
  categoryId: string;
  subType: string;
  category: Category;
  status: boolean;
  pinned: boolean;
  viewCount: number;
  publishedAt: string;
  userId: string;
  author: Author;
  _count: Count;
  createdAt: string;
  updatedAt: string;
  addedToReadLaterAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: string;
}

export interface Author {
  id: string;
  name: any; 
  email: string;
}

export interface Count {
  comments: number;
  favorites: number;
  readLater: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  total: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number | null;
}

export interface Meta {
  totalReadLater: number;
}


export const readLater = async (articleID: string) => {
  const response = await api.post(`articles/${articleID}/toggle-read-later`);
  return response.data;
};

export const fetchAllReadLaterArticles = async (): Promise<{
  success: boolean;
  data?: ReadLaterServiceItem[];
  error?: any;
}> => {
  let allItems: ReadLaterServiceItem[] = [];
  let page = 1;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const response = await api.get(`articles/feeds/read-later?page=${page}&limit=10`);
      const { items, pagination } = response.data.data;
      allItems = allItems.concat(items);
      hasNextPage = pagination.hasNextPage;
      page = pagination.nextPage || page + 1;
    }

    return { success: true, data: allItems };
  } catch (error) {
    console.error('Failed to fetch read later articles:', error);
    return { success: false, error };
  }
};
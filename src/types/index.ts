export type YoutubeContent = {
  id: string;
  title: string;
  youtubeUrl: string;
  contentType: 'FULL_VIDEO' | 'SHORTS';
  thumbnailUrl: string | null;
  duration: string | null;
  viewCount: number;
  deviceType: 'WEB' | 'MOBILE' | string;
  createdAt: string;
};

export type CreatedBy = {
  id: string;
  name: string;
  email: string;
};

export type Count = {
  articles: number;
  rssFeeds: number;
  youtubeContents: number;
};

export type YoutubeStats = {
  total: number;
  shorts: number;
  fullVideos: number;
  totalViews: number;
};

export type Category = {
  id: string;
  name: string;
  type: 'COUNTRY' | 'NORMAL' | string;
  logo: string | null;
  logoKey: string | null;
  videoUrl: string | null;
  description: string;
  seoMeta: Record<string, any> | string;
  thresholdDays: number;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedBy;
  youtubeContents: YoutubeContent[];
  _count: Count;
  youtubeStats: YoutubeStats;
};

export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  summaryArabic: string;
  summaryEnglish: string;
  image: string;
  categoryId: string;
  subType: 'SPORTS' | 'ECONOMICS' | 'POLITICS';
  status: boolean;
  pinned: boolean;
  viewCount: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  _count: {
    comments: number;
    favorites: number;
    readLater: number;
  };
}

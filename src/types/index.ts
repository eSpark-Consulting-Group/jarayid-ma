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

export type Comment = {
  id: string;
  content: string;
  isDeleted: boolean;
  user: {
    id: string;
    name: string;
    image: string;
    role: 'USER' | 'ADMIN'; // Extend roles if needed
  };
  createdAt: string; // ISO timestamp
  articleId: string;
  userId: string;
  article: {
    id: string;
    title: string;
    url: string;
    category: {
      name: string;
    };
  };
};

export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  originalContent: {
    html: string;
    tags: string[];
    text: string;
    rss_id: string;
    authors: [
      {
        name: string;
      },
    ];
    summary: string;
    language: 'ar';
    scrapedContent: {
      metadata: {
        url: string;
        title: string;
        author: string;
        siteName: string;
        description: string;
        modifiedTime: string;
        publishedTime: string;
      };
      scrapedAt: string;
      htmlContent: string;
      textContent: string;
      contentLength: 817;
      translatedContent: {
        translatedAt: string;
        arabicContent: string;
        contentSource: string;
        englishContent: string;
        sourceLanguage: 'ar';
        originalContent: string;
      };
    };
    rssTranslatedContent: {
      translatedAt: string;
      arabicContent: string;
      contentSource: string;
      englishContent: string;
      sourceLanguage: 'ar';
      originalContent: string;
    };
  };
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
  category: {
    id: string;
    name: 'string';
    type: 'COUNTRY';
  };
  author: {
    id: string;
    name: string;
    email: string;
  };
  rssFeed: {
    id: string;
    name: string;
    logo: string;
    url: string;
  };
  _count: {
    comments: number;
    favorites: number;
    readLater: number;
  };
  comments: Comment[];
}

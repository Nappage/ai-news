export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  publishedAt: Date;
  source: string;
  sourceUrl: string;
  category: NewsCategory;
  company?: string;
  imageUrl?: string;
  tags: string[];
  featured?: boolean;
}

export type NewsCategory = 
  | 'llm'
  | 'companies'
  | 'research'
  | 'tools'
  | 'industry'
  | 'funding'
  | 'policy';

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  rssUrl?: string;
  category: NewsCategory;
  company?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface FilterOptions {
  categories: NewsCategory[];
  companies: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
  sortBy: 'latest' | 'popular' | 'relevance';
}
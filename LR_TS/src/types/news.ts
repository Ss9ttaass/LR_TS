import type { Source } from './sources';

/** Ссылка на источник внутри статьи (ответ API everything) */
export interface NewsSourceRef {
  id: string | null;
  name: string;
}

/** Статья новостей (NewsAPI) */
export interface NewsArticle {
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  source: NewsSourceRef;
}

/** Ответ API /everything */
export interface NewsResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsArticle[];
}

/** Данные для карточки статьи (подмножество полей) */
export type ArticleCardData = Pick<
  NewsArticle,
  'title' | 'url' | 'description' | 'urlToImage' | 'publishedAt' | 'author' | 'source'
>;

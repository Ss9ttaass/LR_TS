import type { Source } from './sources';

/** Ответ API /sources */
export interface SourcesResponse {
  status: 'ok' | 'error';
  sources: Source[];
}

/** Endpoint'ы запросов */
export type RequestEndpoint = 'sources' | 'everything';

/** HTTP-метод */
export type HttpMethod = 'GET' | 'POST';

/** Опции инициализации Loader (apiKey и т.д.) */
export interface LoaderOptions {
  apiKey?: string;
  [key: string]: string | undefined;
}

/** Параметры запроса getResp */
export interface RequestParams {
  endpoint: RequestEndpoint;
  options?: Record<string, string>;
}

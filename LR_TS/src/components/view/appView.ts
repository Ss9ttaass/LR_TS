import News from './news/news';
import Sources from './sources/sources';
import type { NewsArticle, NewsResponse } from '../../types/news';
import type { Source } from '../../types/sources';
import type { SourcesResponse } from '../../types/api';

export class AppView {
  private readonly news: News;
  private readonly sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: NewsResponse | undefined): void {
    const values: NewsArticle[] = data?.articles ?? [];
    this.news.draw(values);
  }

  drawSources(data: SourcesResponse | undefined): void {
    const values: Source[] = data?.sources ?? [];
    this.sources.draw(values);
  }
}

export default AppView;

import AppLoader from './appLoader';
import type { Callback } from '../../types/common';
import type { SourcesResponse } from '../../types/api';
import type { NewsResponse } from '../../types/news';

class AppController extends AppLoader {
  getSources(callback: Callback<SourcesResponse>): void {
    super.getResp<SourcesResponse>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: MouseEvent, callback: Callback<NewsResponse>): void {
    let target: EventTarget | null = e.target;
    const newsContainer: EventTarget | null = e.currentTarget;

    if (newsContainer === null || !(newsContainer instanceof HTMLElement)) {
      return;
    }

    while (target !== null && target !== newsContainer) {
      if (target instanceof HTMLElement && target.classList.contains('source__item')) {
        const sourceId: string | null = target.getAttribute('data-source-id');
        const currentSource: string | null = newsContainer.getAttribute('data-source');
        if (sourceId !== null && currentSource !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp<NewsResponse>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target instanceof Node ? target.parentNode : null;
    }
  }
}

export default AppController;

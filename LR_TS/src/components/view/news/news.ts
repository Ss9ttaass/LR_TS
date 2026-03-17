import './news.css';
import type { NewsArticle } from '../../../types/news';

class News {
  draw(data: NewsArticle[]): void {
    const news: NewsArticle[] =
      data.length >= 10 ? data.filter((_item: NewsArticle, idx: number): boolean => idx < 10) : data;
    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

    if (newsItemTemp === null || newsItemTemp.content === undefined) {
      return;
    }

    const newsContainer: HTMLElement | null = document.querySelector('.news');
    if (newsContainer === null) {
      return;
    }

    news.forEach((item: NewsArticle, idx: number): void => {
      const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;
      const newsItem: Element | null = newsClone.querySelector('.news__item');
      if (newsItem instanceof HTMLElement) {
        if (idx % 2 !== 0) {
          newsItem.classList.add('alt');
        }
      }

      const metaPhoto: Element | null = newsClone.querySelector('.news__meta-photo');
      if (metaPhoto instanceof HTMLElement) {
        metaPhoto.style.backgroundImage = `url(${item.urlToImage ?? 'img/news_placeholder.jpg'})`;
      }

      const metaAuthor: Element | null = newsClone.querySelector('.news__meta-author');
      if (metaAuthor instanceof HTMLElement) {
        metaAuthor.textContent = item.author ?? item.source.name;
      }

      const metaDate: Element | null = newsClone.querySelector('.news__meta-date');
      if (metaDate instanceof HTMLElement) {
        metaDate.textContent = item.publishedAt
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('-');
      }

      const descTitle: Element | null = newsClone.querySelector('.news__description-title');
      if (descTitle instanceof HTMLElement) {
        descTitle.textContent = item.title;
      }

      const descSource: Element | null = newsClone.querySelector('.news__description-source');
      if (descSource instanceof HTMLElement) {
        descSource.textContent = item.source.name;
      }

      const descContent: Element | null = newsClone.querySelector('.news__description-content');
      if (descContent instanceof HTMLElement) {
        descContent.textContent = item.description ?? '';
      }

      const readMoreLink: Element | null = newsClone.querySelector('.news__read-more a');
      if (readMoreLink instanceof HTMLAnchorElement) {
        readMoreLink.setAttribute('href', item.url);
      }

      fragment.append(newsClone);
    });

    newsContainer.innerHTML = '';
    newsContainer.appendChild(fragment);
  }
}

export default News;

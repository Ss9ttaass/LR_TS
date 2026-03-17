import './sources.css';
import type { Source } from '../../../types/sources';

class Sources {
  draw(data: Source[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

    if (sourceItemTemp === null || sourceItemTemp.content === undefined) {
      return;
    }

    const sourcesContainer: HTMLElement | null = document.querySelector('.sources');
    if (sourcesContainer === null) {
      return;
    }

    data.forEach((item: Source): void => {
      const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
      const itemName: Element | null = sourceClone.querySelector('.source__item-name');
      if (itemName instanceof HTMLElement) {
        itemName.textContent = item.name;
      }
      const sourceItem: Element | null = sourceClone.querySelector('.source__item');
      if (sourceItem instanceof HTMLElement) {
        sourceItem.setAttribute('data-source-id', item.id);
      }
      fragment.append(sourceClone);
    });

    sourcesContainer.append(fragment);
  }
}

export default Sources;

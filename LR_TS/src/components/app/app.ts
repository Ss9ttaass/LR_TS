import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private readonly controller: AppController;
  private readonly view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    const sourcesEl: HTMLElement | null = document.querySelector('.sources');
    if (sourcesEl === null) {
      return;
    }
    sourcesEl.addEventListener('click', (e: Event): void => {
      const event = e as MouseEvent;
      this.controller.getNews(event, (data) => this.view.drawNews(data));
    });
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;

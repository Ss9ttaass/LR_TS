import Loader from './loader';
import type { LoaderOptions } from '../../types/api';

class AppLoader extends Loader {
  constructor() {
    const apiUrl: string = process.env.API_URL ?? '';
    const options: LoaderOptions = {
      apiKey: process.env.API_KEY,
    };
    super(apiUrl, options);
  }
}

export default AppLoader;

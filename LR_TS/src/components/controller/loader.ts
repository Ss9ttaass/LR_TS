import type { Callback } from '../../types/common';
import type { HttpMethod, LoaderOptions, RequestEndpoint, RequestParams } from '../../types/api';

class Loader {
  private readonly baseLink: string;
  private readonly options: LoaderOptions;

  constructor(baseLink: string, options: LoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T>(
    { endpoint, options = {} }: RequestParams,
    callback: Callback<T> = (_data: T): void => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load<T>('GET', endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw new Error(res.statusText);
    }
    return res;
  }

  makeUrl(options: Record<string, string | undefined>, endpoint: RequestEndpoint): string {
    const urlOptions: Record<string, string | undefined> = { ...this.options, ...options };
    let url: string = `${this.baseLink}${endpoint}?`;
    (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key: string): void => {
      const value: string | undefined = urlOptions[key];
      if (value !== undefined) {
        url += `${key}=${value}&`;
      }
    });
    return url.slice(0, -1);
  }

  load<T>(
    method: HttpMethod,
    endpoint: RequestEndpoint,
    callback: Callback<T>,
    options: Record<string, string> = {}
  ): void {
    const url: string = this.makeUrl(options, endpoint);
    fetch(url, { method })
      .then((res: Response) => this.errorHandler(res))
      .then((res: Response) => res.json() as Promise<T>)
      .then((data: T) => callback(data))
      .catch((err: unknown): void => {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error(err);
        }
      });
  }
}

export default Loader;

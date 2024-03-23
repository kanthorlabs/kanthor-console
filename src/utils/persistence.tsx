import * as configs from "@console/configs";

const persistence = {
  get<T>(key: string): { data?: T; error?: Error } {
    const s = localStorage.getItem(key);
    if (!s) return { error: new Error(`${key} does not exist`) };

    try {
      const doc: IDocument<T> = JSON.parse(s);

      const expired =
        Number.isFinite(doc.expired_at) && +new Date() - doc.expired_at >= 0;
      if (expired) {
        // consolidate expired time
        localStorage.removeItem(key);
        return { error: new Error(`${key} is expired`) };
      }

      return { data: doc.data };
    } catch (error: any) {
      return { error };
    }
  },

  set(key: string, data: any, ...opts: IOption[]) {
    const options: IOptions = { ttl: configs.console.persistence.ttl };
    for (let opt of opts) {
      opt(options);
    }

    const doc: IDocument<any> = {
      data,
      expired_at: +new Date() + options.ttl * 1000,
    };
    localStorage.setItem(key, JSON.stringify(doc));
  },

  del(key: string) {
    localStorage.removeItem(key);
  },
};

export default persistence;

export interface IOptions {
  ttl: number;
}

export interface IOption {
  (options: IOptions): void;
}

export function withTtl(ttl: number): IOption {
  return function (options: IOptions) {
    options.ttl = ttl;
  };
}

interface IDocument<T> {
  data: T;
  expired_at: number;
}

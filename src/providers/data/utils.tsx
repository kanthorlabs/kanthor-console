import { stringify } from "query-string";
import { CrudFilters, Pagination, MetaQuery } from "@refinedev/core";
import { generateFilter } from "@refinedev/simple-rest";
import { IMap } from "@console/interfaces";

export function base(uri: string, resource: string, meta?: MetaQuery): string {
  const url = new URL(uri);
  url.pathname = `/api/${resource}`;

  const kv = { ...meta };
  url.pathname = `/api/${resource}`.replace(/:([^\/]+)/g, (match, key) => {
    const v = kv[key];
    if (typeof v !== "undefined") {
      return `${v}`;
    }
    return match;
  });

  return url.toString();
}

export function headers(meta?: MetaQuery): IMap {
  return { ...{ ...meta }.headers };
}

export function query(
  meta?: MetaQuery,
  filters?: CrudFilters,
  pagination?: Pagination
): IMap {
  const queries: IMap = { ...generateFilter(filters) };

  if (meta && meta["app_id"]) {
    queries.app_id = meta["app_id"];
  }

  if (pagination) {
    const { mode = "server", current = 1, pageSize = 10 } = { ...pagination };
    if (mode === "server") {
      queries._page = current;
      queries._limit = pageSize;
    }
  }

  return queries;
}

export function url(base: string, queries: IMap): string {
  const url = new URL(base);
  for (let key in queries) {
    const value = queries[key];
    if (Array.isArray(value)) {
      for (let v of value) {
        url.searchParams.append(key, stringify(v));
      }
    }

    url.searchParams.append(key, stringify(queries[key]));
  }
  return url.toString();
}

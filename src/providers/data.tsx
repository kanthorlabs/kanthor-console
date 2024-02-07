import { AxiosInstance } from "axios";
import { stringify } from "query-string";
import { DataProvider } from "@refinedev/core";
import {
  axiosInstance,
  generateSort,
  generateFilter,
} from "@refinedev/simple-rest";
import _ from "lodash";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

interface PortalQuery {
  app_id?: string;
  ep_id?: string;
  msg_id?: string;
}

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const base = `${apiUrl}/${resource}`;
    const url = genUrlRoute(base, meta);

    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};
    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const query: PortalQuery & {
      _page?: number;
      _limit?: number;
      _sort?: string;
      _order?: string;
    } = {
      ...genQueryFromMeta(base, meta),
      ...generateFilter(filters),
    };

    if (mode === "server") {
      query._page = current;
      query._limit = pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query._sort = _sort.join(",");
      query._order = _order.join(",");
    }

    const { data } = await httpClient[requestMethod](genUrl(url, query), {
      headers: headersFromMeta,
    });

    return {
      data: data.data || [],
      total: data.count,
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    const base = `${apiUrl}/${resource}`;
    const url = genUrlRoute(base, meta);

    const query = genQueryFromMeta(base, meta);
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](
      genUrl(url, query, { id: _.uniq(ids) }),
      { headers }
    );

    return {
      data: data.data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const base = `${apiUrl}/${resource}`;
    const url = genUrlRoute(base, meta);

    const query = genQueryFromMeta(base, meta);
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const { data } = await httpClient[requestMethod](
      genUrl(url, query),
      variables,
      {
        headers,
      }
    );

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const base = `${apiUrl}/${resource}/${id}`;
    const url = genUrlRoute(base, meta);

    const query = genQueryFromMeta(base, meta);
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const { data } = await httpClient[requestMethod](
      genUrl(url, query),
      variables,
      {
        headers,
      }
    );

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const base = `${apiUrl}/${resource}/${id}`;
    const url = genUrlRoute(base, meta);

    const query = genQueryFromMeta(base, meta);
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](genUrl(url, query), {
      headers,
    });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const base = `${apiUrl}/${resource}/${id}`;
    const url = genUrlRoute(base, meta);

    const query = genQueryFromMeta(base, meta);
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const { data } = await httpClient[requestMethod](genUrl(url, query), {
      data: variables,
      headers,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
    meta,
  }) => {
    const base = genUrlRoute(url, meta);
    const segments: any[] = [genQueryFromMeta(url, meta)];

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(","),
          _order: _order.join(","),
        };
        segments.push(sortQuery);
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      segments.push(filterQuery);
    }

    if (query) {
      segments.push(query);
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](
          genUrl(base, ...segments),
          payload,
          {
            headers,
          }
        );
        break;
      case "delete":
        axiosResponse = await httpClient.delete(genUrl(base, ...segments), {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(genUrl(base, ...segments), {
          headers,
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});

function genQueryFromMeta(route: string, meta: any): PortalQuery {
  const params = { ...meta };
  const query: PortalQuery = {};

  if (!route.includes(":app_id") && params?.app_id)
    query.app_id = params.app_id;
  if (!route.includes(":ep_id") && params?.ep_id) query.ep_id = params.ep_id;
  if (!route.includes(":msg_id") && params?.msg_id)
    query.msg_id = params.msg_id;

  return query;
}

function genUrlRoute(reoute: string, meta: any): string {
  const params = { ...meta };

  return reoute.replace(/:([^\/]+)/g, (match, key) => {
    const fromParams = params[key];
    if (typeof fromParams !== "undefined") {
      return `${fromParams}`;
    }
    return match;
  });
}

function genUrl(base: string, ...segments: any[]): string {
  let url = `${base}?`;
  for (let segment of segments) {
    if (
      typeof segment === "symbol" ||
      typeof segment === "function" ||
      typeof segment === "undefined"
    ) {
      continue;
    }

    if (typeof segment === "object") {
      if (Object.keys({ ...segment }).length > 0) {
        url += `${stringify(segment)}&`;
      }
      continue;
    }

    url += `${segment}&`;
  }
  return url;
}

import { AxiosInstance } from "axios";
import {
  CreateParams,
  CreateResponse,
  CustomParams,
  CustomResponse,
  DataProvider,
  DeleteOneParams,
  DeleteOneResponse,
  GetOneParams,
  GetOneResponse,
  UpdateParams,
  UpdateResponse,
} from "@refinedev/core";
import {
  BaseRecord,
  GetListParams,
  GetListResponse,
  GetManyParams,
  GetManyResponse,
} from "@refinedev/core";
import uniq from "lodash.uniq";

import * as utils from "./utils";

export type Provider = Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
>;

export function Api(uri: string, client: AxiosInstance): Provider {
  return {
    async getList<TData extends BaseRecord = BaseRecord>({
      resource,
      filters,
      pagination,
      meta,
    }: GetListParams): Promise<GetListResponse<TData>> {
      const base = utils.base(uri, resource);
      const headers = utils.headers(meta);
      const query = utils.query(meta, filters, { ...pagination });

      const {
        data: { data, count: total },
      } = await client.get(utils.url(base, query), { headers });

      return { data, total };
    },
    async getMany<TData extends BaseRecord = BaseRecord>({
      resource,
      ids,
      meta,
    }: GetManyParams): Promise<GetManyResponse<TData>> {
      const base = utils.base(uri, resource);
      const headers = utils.headers(meta);
      const query = utils.query(meta);
      query["_ids"] = uniq(ids);

      const {
        data: { data },
      } = await client.get(utils.url(base, query), { headers });

      return { data };
    },
    async getOne<TData extends BaseRecord = BaseRecord>({
      resource,
      id,
      meta,
    }: GetOneParams): Promise<GetOneResponse<TData>> {
      const base = utils.base(uri, `${resource}/${id}`);
      const headers = utils.headers(meta);
      const query = utils.query(meta);

      const { data } = await client.get(utils.url(base, query), { headers });

      return { data };
    },
    async create<TData extends BaseRecord = BaseRecord, TVariables = {}>({
      resource,
      variables,
      meta,
    }: CreateParams<TVariables>): Promise<CreateResponse<TData>> {
      const base = utils.base(uri, resource);
      const headers = utils.headers(meta);
      const query = utils.query(meta);

      const { data } = await client.post(utils.url(base, query), variables, {
        headers,
      });

      return { data };
    },
    async update<TData extends BaseRecord = BaseRecord, TVariables = {}>({
      resource,
      id,
      variables,
      meta,
    }: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> {
      const base = utils.base(uri, `${resource}/${id}`);
      const headers = utils.headers(meta);
      const query = utils.query(meta);

      const { data } = await client.patch(utils.url(base, query), variables, {
        headers,
      });

      return { data };
    },
    async deleteOne<TData extends BaseRecord = BaseRecord, TVariables = {}>({
      resource,
      id,
      meta,
    }: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> {
      const base = utils.base(uri, `${resource}/${id}`);
      const headers = utils.headers(meta);
      const query = utils.query(meta);

      const { data } = await client.delete(utils.url(base, query), { headers });

      return { data };
    },
    async custom<
      TData extends BaseRecord = BaseRecord,
      TQuery = unknown,
      TPayload = unknown
    >(params: CustomParams<TQuery, TPayload>): Promise<CustomResponse<TData>> {
      const headers = { ...utils.headers(params.meta), ...params.headers };
      const query = {
        ...utils.query(params.meta, params.filters),
        ...params.query,
      };

      const url = utils.url(params.url, query);
      let axiosResponse;

      switch (params.method) {
        case "put":
          axiosResponse = await client.put(url, params.payload, {
            headers,
          });
          break;
        case "post":
          axiosResponse = await client.post(url, params.payload, {
            headers,
          });
          break;
        case "patch":
          axiosResponse = await client.patch(url, params.payload, {
            headers,
          });
          break;
        case "delete":
          axiosResponse = await client.delete(url, { headers: headers });
          break;
        default:
          axiosResponse = await client.get(url, { headers });
          break;
      }

      const { data } = axiosResponse;

      return Promise.resolve({ data });
    },
    getApiUrl(): string {
      return uri;
    },
  };
}

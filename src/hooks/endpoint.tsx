import { useState, useEffect } from "react";
import {
  useDataProvider,
  BaseRecord,
  GetManyParams,
  GetManyResponse,
} from "@refinedev/core";
import { IEndpoint } from "../interfaces";

export function useEp(id?: string) {
  const { getOne } = useDataProvider()("sdk");

  const [isLoading, setIsLoading] = useState(true);
  const [ep, setEp] = useState<IEndpoint>();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    getOne({ resource: "endpoint", id }).then(({ data }) => {
      setIsLoading(false);
      setEp(data as any);
    });
  }, [id]);

  return { isLoading, ep };
}

export function useEps(ids: string[]) {
  const { getMany } = useDataProvider()("sdk");

  const [isLoading, setIsLoading] = useState(true);
  const [eps, setEps] = useState<{ [name: string]: IEndpoint }>({});

  useEffect(() => {
    if (ids.length === 0) {
      setIsLoading(false);
      return;
    }

    (
      getMany as <TData extends BaseRecord = BaseRecord>(
        params: GetManyParams
      ) => Promise<GetManyResponse<TData>>
    )({ resource: "endpoint", ids }).then(({ data }) => {
      setIsLoading(false);
      setEps(
        (data as any[]).reduce((m, v: IEndpoint) => ({ ...m, [v.id]: v }), {})
      );
    });
  }, [ids.sort().join("/")]);

  return { isLoading, eps };
}

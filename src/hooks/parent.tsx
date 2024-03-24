import { useState, useEffect } from "react";
import {
  useDataProvider,
  BaseRecord,
  GetManyParams,
  GetManyResponse,
} from "@refinedev/core";
import { IAuditable } from "@console/interfaces";

export function useParent<T extends IAuditable>(
  provider: string,
  resource: string,
  id?: string
) {
  const { getOne } = useDataProvider()(provider);

  const [isLoading, setIsLoading] = useState(true);
  const [doc, setDoc] = useState<T>();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    getOne({ resource, id }).then(({ data }) => {
      setIsLoading(false);
      setDoc(data as any);
    });
  }, [id]);

  return { isLoading, doc };
}

export function useParents<T extends IAuditable>(
  provider: string,
  resource: string,
  ids: string[]
) {
  const { getMany } = useDataProvider()(provider);

  const [isLoading, setIsLoading] = useState(true);
  const [docs, setDocs] = useState<{ [name: string]: T }>({});

  useEffect(() => {
    if (ids.length === 0) {
      setIsLoading(false);
      return;
    }

    (
      getMany as <TData extends BaseRecord = BaseRecord>(
        params: GetManyParams
      ) => Promise<GetManyResponse<TData>>
    )({ resource, ids }).then(({ data }) => {
      setIsLoading(false);
      setDocs((data as any[]).reduce((m, v: T) => ({ ...m, [v.id]: v }), {}));
    });
  }, [ids.sort().join("/")]);

  return { isLoading, docs };
}

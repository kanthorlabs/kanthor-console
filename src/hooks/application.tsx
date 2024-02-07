import { useState, useEffect } from "react";
import {
  useDataProvider,
  BaseRecord,
  GetManyParams,
  GetManyResponse,
} from "@refinedev/core";
import { IApplication } from "../interfaces";

export function useApp(id?: string) {
  const { getOne } = useDataProvider()("sdk");

  const [isLoading, setIsLoading] = useState(true);
  const [app, setApp] = useState<IApplication>();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    getOne({ resource: "application", id }).then(({ data }) => {
      setIsLoading(false);
      setApp(data as any);
    });
  }, [id]);

  return { isLoading, app };
}

export function useApps(ids: string[]) {
  const { getMany } = useDataProvider()("sdk");

  const [isLoading, setIsLoading] = useState(true);
  const [apps, setApps] = useState<{ [name: string]: IApplication }>({});

  useEffect(() => {
    if (ids.length === 0) {
      setIsLoading(false);
      return;
    }

    (
      getMany as <TData extends BaseRecord = BaseRecord>(
        params: GetManyParams
      ) => Promise<GetManyResponse<TData>>
    )({ resource: "application", ids }).then(({ data }) => {
      setIsLoading(false);
      setApps(
        (data as any[]).reduce(
          (m, v: IApplication) => ({ ...m, [v.id]: v }),
          {}
        )
      );
    });
  }, [ids.sort().join("/")]);

  return { isLoading, apps };
}

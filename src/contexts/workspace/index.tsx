import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useDataProvider, useParsed } from "@refinedev/core";
import { Navigate, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import * as constants from "@console/constants";
import persistence from "@console/utils/persistence";
import { IWorkspace } from "@console/interfaces";
import { KEY_TENANT_ID } from "@console/providers/auth/constants";

type IWorkspaceContext = {
  select: (ws: IWorkspace) => void;
  selected?: IWorkspace;
  available: IWorkspace[];
};

export const Context = createContext<IWorkspaceContext>(
  {} as IWorkspaceContext
);

export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState<IWorkspace[]>([]);
  const [selected, setSelected] = useState<IWorkspace>();
  const { getList } = useDataProvider()(constants.PROVIDER_PORTAL);

  const { params } = useParsed<{ ws_id?: string }>();
  const { data: tenantId } = persistence.get(KEY_TENANT_ID);
  const id = params?.ws_id || tenantId;
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (selected) return;

    getList({ resource: constants.RESOURCE_WS, pagination: { mode: "off" } })
      .then(({ data }) => {
        setAvailable(data as any[]);
        const picked = (data as any[]).find((ws: IWorkspace) => ws.id === id);
        if (!picked) return;

        persistence.set(KEY_TENANT_ID, picked.id);
        setSelected(picked);
        return;
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <Spin fullscreen />;
  if (!available.length) return <Navigate to="/workspace" />;
  if (!selected) return <Navigate to="/workspace" />;

  const select = (picked: IWorkspace) => {
    setSelected(picked);
    persistence.set(KEY_TENANT_ID, picked.id);
    navigate(0);
  };
  return (
    <Context.Provider value={{ select, selected, available }}>
      {children}
    </Context.Provider>
  );
};

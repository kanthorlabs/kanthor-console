import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useDataProvider, useParsed } from "@refinedev/core";
import { Navigate, useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { IWorkspace } from "@console/interfaces";
import persistence from "@console/utils/persistence";
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
  const { getList } = useDataProvider()("portal");

  const { params } = useParsed<{ ws_id?: string }>();
  const id = params?.ws_id || localStorage.getItem("ws_id");
  const [isLoading, setIsLoading] = React.useState(!!id);

  useEffect(() => {
    if (!id) return;

    getList({ resource: "workspace", pagination: { mode: "off" } })
      .then(({ data }) => {
        setAvailable(data as any[]);
        const picked = (data as any[]).find((ws: IWorkspace) => ws.id === id);
        if (!picked) return;

        setSelected(picked);
        return;
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    if (selected) persistence.set(KEY_TENANT_ID, selected.id);
  }, [selected]);

  if (isLoading) {
    return <Spin fullscreen />;
  }
  if (!selected) {
    return <Navigate to="/workspace" />;
  }

  const select = (picked: IWorkspace) => {
    persistence.set(KEY_TENANT_ID, picked.id);
    navigate(0);
  };
  return (
    <Context.Provider value={{ select, selected, available }}>
      {children}
    </Context.Provider>
  );
};

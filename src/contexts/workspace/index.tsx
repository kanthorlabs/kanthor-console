import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useDataProvider, useParsed } from "@refinedev/core";
import { Navigate, useNavigate } from "react-router-dom";
import { Spin } from "antd";

import { IWorkspace } from "../../interfaces";
import httpClient from "../../http-client";

type IWorkspaceContext = {
  select: (ws: IWorkspace) => void;
  selected?: IWorkspace;
  available: IWorkspace[];
};

export const WorkspaceContext = createContext<IWorkspaceContext>(
  {} as IWorkspaceContext
);

export const WorkspaceContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [available, setAvailable] = useState<IWorkspace[]>([]);
  const [selected, setSelected] = useState<IWorkspace>();
  const { getList } = useDataProvider()("portal");

  const { params } = useParsed<{ ws_id?: string }>();
  const id = params?.ws_id || localStorage.getItem("ws_id");
  const [isLoading, setIsLoading] = React.useState(!!id);

  const engine = httpClient.defaults.headers.common["X-Authorization-Engine"];
  useEffect(() => {
    if (!id || !engine) return;

    getList({ resource: "workspace", pagination: { mode: "off" } })
      .then(({ data }) => {
        setAvailable(data as any[]);
        const picked = (data as any[]).find((ws: IWorkspace) => ws.id === id);
        if (!picked) return;

        httpClient.defaults.headers.common = {
          ...httpClient.defaults.headers.common,
          "X-Authorization-Workspace": picked.id,
        };

        localStorage.setItem("ws_id", picked.id);
        setSelected(picked);
        return;
      })
      .finally(() => setIsLoading(false));
  }, [id, engine]);

  const select = (picked: IWorkspace) => {
    httpClient.defaults.headers.common = {
      ...httpClient.defaults.headers.common,
      "X-Authorization-Workspace": picked.id,
    };

    localStorage.setItem("ws_id", picked.id);
    navigate(0);
  };

  if (isLoading) {
    return <Spin fullscreen />;
  }
  if (!selected) {
    return <Navigate to="/workspace" />;
  }

  return (
    <WorkspaceContext.Provider value={{ select, selected, available }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

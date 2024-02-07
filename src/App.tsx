import { Authenticated, Refine, useParsed } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { ErrorComponent, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { useTranslation } from "react-i18next";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import httpClient from "./http-client";
import { dataProvider, useAuthProvider } from "./providers";
import { InnerLayout, OuterLayout } from "./components/layouts";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Dashboard } from "./pages/dashboard";
import { resources } from "./resources";
import { WorkspaceContextProvider } from "./contexts/workspace";
import { Auth } from "./pages/auth";
import {
  WorkspaceCreate,
  WorkspaceEdit,
  WorkspaceList,
  WorkspaceShow,
} from "./pages/workspace";
import {
  WorkspaceCredentialCreate,
  WorkspaceCredentialEdit,
  WorkspaceCredentialList,
} from "./pages/workspace-credentials";
import {
  ApplicationList,
  ApplicationCreate,
  ApplicationEdit,
  ApplicationShow,
} from "./pages/application";
import {
  EndpointList,
  EndpointCreate,
  EndpointEdit,
  EndpointShow,
} from "./pages/endpoint";
import {
  EndpointRuleList,
  EndpointRuleCreate,
  EndpointRuleEdit,
  EndpointRuleShow,
} from "./pages/rule";
import { AccountProfile } from "./pages/account";
import configs from "./configs";

export default function App() {
  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const { authProvider } = useAuthProvider();

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              dataProvider={{
                default: dataProvider(configs.api.sdk.uri, httpClient),
                sdk: dataProvider(configs.api.sdk.uri, httpClient),
                portal: dataProvider(configs.api.portal.uri, httpClient),
              }}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              resources={resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/auth/login" />}
                    >
                      <OuterLayout />
                    </Authenticated>
                  }
                >
                  <Route path="/workspace">
                    <Route index element={<WorkspaceList />} />
                    <Route path="create" element={<WorkspaceCreate />} />
                    <Route path="edit/:id" element={<WorkspaceEdit />} />
                    <Route path="show/:id" element={<WorkspaceShow />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/auth/login" />}
                    >
                      <WorkspaceContextProvider>
                        <InnerLayout />
                      </WorkspaceContextProvider>
                    </Authenticated>
                  }
                >
                  <Route path="/">
                    <Route index element={<Dashboard />} />
                  </Route>

                  <Route path="/account">
                    <Route index element={<AccountProfile />} />
                  </Route>

                  <Route path="/credentials">
                    <Route index element={<WorkspaceCredentialList />} />
                    <Route
                      path="create"
                      element={<WorkspaceCredentialCreate />}
                    />
                    <Route
                      path="edit/:id"
                      element={<WorkspaceCredentialEdit />}
                    />
                  </Route>

                  <Route path="/application">
                    <Route index element={<ApplicationList />} />
                    <Route path="create" element={<ApplicationCreate />} />
                    <Route path="edit/:id" element={<ApplicationEdit />} />
                    <Route path="show/:id" element={<ApplicationShow />} />
                  </Route>

                  <Route path="/endpoint">
                    <Route index element={<EndpointList />} />
                    <Route path="create" element={<EndpointCreate />} />
                    <Route path="edit/:id" element={<EndpointEdit />} />
                    <Route path="show/:id" element={<EndpointShow />} />
                  </Route>

                  <Route path="/rule">
                    <Route index element={<EndpointRuleList />} />
                    <Route path="create" element={<EndpointRuleCreate />} />
                    <Route path="edit/:id" element={<EndpointRuleEdit />} />
                    <Route path="show/:id" element={<EndpointRuleShow />} />
                  </Route>

                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateIfAuthenticated />
                    </Authenticated>
                  }
                >
                  <Route path="/auth/login" element={<Auth />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

const NavigateIfAuthenticated: React.FC = () => {
  const { params } = useParsed<{ to?: string }>();
  return <Navigate to={params?.to || "/"} />;
};

import { Refine, WelcomePage, Authenticated, useParsed } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import * as contexts from "@console/contexts";
import * as configs from "@console/configs";
import httpc from "@console/utils/httpc";
import * as providers from "@console/providers";
import * as layouts from "@console/layouts";
import * as pages from "@console/pages";
import { resources } from "@console/resources";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <contexts.colormode.Provider>
          <AntdApp>
            <Refine
              dataProvider={{
                default: providers.Api(configs.api.portal.uri, httpc),
                portal: providers.Api(configs.api.portal.uri, httpc),
                sdk: providers.Api(configs.api.sdk.uri, httpc),
              }}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={providers.auth}
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
                      <layouts.OuterLayout />
                    </Authenticated>
                  }
                >
                  <Route path="/workspace">
                    <Route index element={<pages.workspace.List />} />
                    <Route path="create" element={<pages.workspace.Create />} />
                    <Route path="edit/:id" element={<pages.workspace.Edit />} />
                    <Route path="show/:id" element={<pages.workspace.Show />} />
                  </Route>
                </Route>

                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/auth/login" />}
                    >
                      <contexts.workspace.Provider>
                        <layouts.InnerLayout />
                      </contexts.workspace.Provider>
                    </Authenticated>
                  }
                >
                  <Route index element={<pages.dashboard.Dashboard />} />
                  <Route path="/account" element={<pages.account.Account />} />
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
                  <Route path="/auth">
                    <Route index element={<pages.auth.Login />} />
                    <Route path="login" element={<pages.auth.Login />} />
                    <Route path="register" element={<pages.auth.Register />} />
                    <Route
                      path="password/forgot"
                      element={<pages.auth.password.Forgot />}
                    />
                  </Route>
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </contexts.colormode.Provider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

const NavigateIfAuthenticated: React.FC = () => {
  const { params } = useParsed<{ to?: string }>();
  return <Navigate to={params?.to || "/"} />;
};

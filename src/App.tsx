import { Refine, WelcomePage, Authenticated, useParsed } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import * as constants from "@console/constants";
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
                [constants.PROVIDER_PORTAL]: providers.Api(
                  configs.api.portal.uri,
                  httpc
                ),
                [constants.PROVIDER_SDK]: providers.Api(
                  configs.api.sdk.uri,
                  httpc
                ),
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

                  <Route path="/credentials">
                    <Route index element={<pages.credentials.List />} />
                    <Route
                      path="create"
                      element={<pages.credentials.Create />}
                    />
                    <Route
                      path="edit/:id"
                      element={<pages.credentials.Edit />}
                    />
                    <Route
                      path="show/:id"
                      element={<pages.credentials.Show />}
                    />
                  </Route>

                  <Route path="/application">
                    <Route index element={<pages.application.List />} />
                    <Route
                      path="create"
                      element={<pages.application.Create />}
                    />
                    <Route
                      path="edit/:id"
                      element={<pages.application.Edit />}
                    />
                    <Route
                      path="show/:id"
                      element={<pages.application.Show />}
                    />
                  </Route>

                  <Route path="/endpoint">
                    <Route index element={<pages.endpoint.List />} />
                    <Route path="create" element={<pages.endpoint.Create />} />
                    <Route path="edit/:id" element={<pages.endpoint.Edit />} />
                    <Route path="show/:id" element={<pages.endpoint.Show />} />
                  </Route>

                  <Route path="/route">
                    <Route index element={<pages.route.List />} />
                    <Route path="create" element={<pages.route.Create />} />
                    <Route path="edit/:id" element={<pages.route.Edit />} />
                    <Route path="show/:id" element={<pages.route.Show />} />
                  </Route>
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

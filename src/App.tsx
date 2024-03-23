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
import { ColorModeContextProvider } from "./contexts/color-mode";
import * as providers from "@console/providers";
import * as layouts from "@console/layouts";
import * as pages from "@console/pages";
import { resources } from "@console/resources";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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
                      <layouts.InnerLayout />
                    </Authenticated>
                  }
                >
                  <Route index element={<WelcomePage />} />
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
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

const NavigateIfAuthenticated: React.FC = () => {
  const { params } = useParsed<{ to?: string }>();
  return <Navigate to={params?.to || "/"} />;
};

import React from "react";
import { ThemedLayoutV2, ThemedTitleV2, ThemedSiderV2 } from "@refinedev/antd";
import { Outlet } from "react-router-dom";

import * as configs from "@console/configs";
import { Header } from "@console/components/header";

export const InnerLayout: React.FC = () => {
  return (
    <ThemedLayoutV2
      Title={({ collapsed }) => (
        <ThemedTitleV2
          // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
          collapsed={collapsed}
          text={configs.project.name}
        />
      )}
      Header={() => <Header />}
      Sider={(props) => <ThemedSiderV2 {...props} fixed />}
    >
      <Outlet />
    </ThemedLayoutV2>
  );
};

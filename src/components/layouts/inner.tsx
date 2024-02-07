import React, { useContext } from "react";
import { ThemedLayoutV2, ThemedTitleV2, ThemedSiderV2 } from "@refinedev/antd";
import { Outlet, Navigate } from "react-router-dom";

import configs from "../../configs";
import { WorkspaceContext } from "../../contexts/workspace";
import { Header } from "../header";

export const InnerLayout: React.FC = () => {
  const { selected, available } = useContext(WorkspaceContext);

  if (!selected && available.length === 0) {
    return <Navigate to="/workspace" />;
  }

  if (selected) {
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
  }

  return null;
};

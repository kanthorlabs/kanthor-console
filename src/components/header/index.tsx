import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { theme, Layout, Space, Flex } from "antd";
import React from "react";
import { LanguageSelector } from "./language";
import { ViewModeSelector } from "./view-mode";
import { Account } from "./account";
import { WorkspaceSelector } from "./workspace";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { token } = theme.useToken();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  return (
    <Layout.Header style={headerStyles}>
      <Flex justify="space-between" align="center">
        <WorkspaceSelector />

        <Space>
          <LanguageSelector />
          <ViewModeSelector />
          <Account />
        </Space>
      </Flex>
    </Layout.Header>
  );
};

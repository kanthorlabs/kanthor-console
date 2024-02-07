import React from "react";
import { Outlet } from "react-router-dom";
import { ThemedTitleV2 } from "@refinedev/antd";
import { Layout, Space } from "antd";

import configs from "../../configs";

export const OuterLayout: React.FC = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Space
        direction="vertical"
        align="center"
        style={{ paddingTop: "5vh", paddingBottom: "5vh" }}
      >
        <ThemedTitleV2
          collapsed={false}
          text={configs.project.name}
          wrapperStyles={{
            fontSize: "22px",
            marginBottom: "36px",
          }}
        />
        <Outlet />
      </Space>
    </Layout>
  );
};

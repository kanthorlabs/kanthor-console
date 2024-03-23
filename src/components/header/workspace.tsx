import React, { useContext } from "react";
import {
  DashboardOutlined,
  DownOutlined,
  CrownOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Space, Button, Dropdown, MenuProps } from "antd";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";

import * as contexts from "@console/contexts";
import { IAccount } from "@console/interfaces";

export const WorkspaceSelector: React.FC<
  RefineThemedLayoutV2HeaderProps
> = () => {
  const { data: identity } = useGetIdentity<IAccount>();
  const { select, selected, available } = useContext(
    contexts.workspace.Context
  );

  const items: MenuProps["items"] = available.map((ws) => ({
    key: ws.id,
    label: ws.name,
    icon:
      ws.owner_id === identity?.username ? (
        <CrownOutlined />
      ) : (
        <UserSwitchOutlined />
      ),
    onClick: () => select(ws),
  }));

  return (
    <Dropdown
      menu={{
        items: items,
        selectedKeys: selected ? [selected.id] : [],
      }}
    >
      <Button type="text">
        <Space>
          <DashboardOutlined />
          {selected?.name}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

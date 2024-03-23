import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetIdentity } from "@refinedev/core";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { Avatar, Space, Button, Dropdown, MenuProps } from "antd";
import { UserOutlined, ApartmentOutlined } from "@ant-design/icons";

import { IAccount } from "@console/interfaces";

export const Account: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity<IAccount>();

  if (!user) return null;

  const items: MenuProps["items"] = [
    {
      key: user.username,
      label: user.name,
      icon: <UserOutlined />,
      onClick: () => navigate("/account"),
    },
    {
      key: "workspaces",
      label: "Workspaces",
      icon: <ApartmentOutlined />,
      onClick: () => navigate("/workspace"),
    },
  ];

  return (
    <Dropdown menu={{ items: items }}>
      <Button type="text">
        <Space>
          {user.metadata?.avatar_url ? (
            <Avatar src={user.metadata.avatar_url} alt={user.name} size={16} />
          ) : (
            <UserOutlined />
          )}
          {user.name}
        </Space>
      </Button>
    </Dropdown>
  );
};

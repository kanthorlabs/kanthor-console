import React from "react";
import { IResourceComponentsProps, useGetIdentity } from "@refinedev/core";
import { Card, Spin, Typography } from "antd";
import { TextField } from "@refinedev/antd";
const { Title } = Typography;

import { IAccount } from "../../interfaces";

export const AccountProfile: React.FC<IResourceComponentsProps> = () => {
  const { data: user, isLoading } = useGetIdentity<IAccount>();

  if (isLoading) return null;

  return (
    <React.Fragment>
      <Card bordered={false}>
        <Title level={5}>{"Account Id"}</Title>
        <TextField value={user?.sub} />

        <Title level={5}>{"Account Name"}</Title>
        <TextField value={user?.name} />
      </Card>
    </React.Fragment>
  );
};

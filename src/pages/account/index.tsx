import React from "react";
import { IResourceComponentsProps, useGetIdentity } from "@refinedev/core";
import { Card, Spin, Typography } from "antd";
import { DateField, TextField } from "@refinedev/antd";
const { Title } = Typography;

import { IAccount } from "../../interfaces";

export const Account: React.FC<IResourceComponentsProps> = () => {
  const { data: user, isLoading } = useGetIdentity<IAccount>();

  if (isLoading) return null;

  return (
    <React.Fragment>
      <Card bordered={false}>
        <Title level={5}>{"Username"}</Title>
        <TextField value={user?.username} />
        <Title level={5}>{"Name"}</Title>
        <TextField value={user?.name} />
        <Title level={5}>{"Registred At"}</Title>
        <DateField value={user?.created_at} format="YYYY-MM-DD HH:mm:ss ZZ" />;
      </Card>
    </React.Fragment>
  );
};

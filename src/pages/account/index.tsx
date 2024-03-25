import React from "react";
import { IResourceComponentsProps, useGetIdentity } from "@refinedev/core";
import { Card, Typography } from "antd";
import { DateField, TextField } from "@refinedev/antd";
import { IAccount } from "@console/interfaces";
import * as configs from "@console/configs";

const { Title } = Typography;

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
        <DateField value={user?.created_at} format={configs.format.datetime} />;
      </Card>
    </React.Fragment>
  );
};

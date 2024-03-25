import React from "react";
import { IResourceComponentsProps, useShow, useGo } from "@refinedev/core";
import {
  Show as CoreShow,
  TextField,
  DateField,
  ListButton,
  RefreshButton,
} from "@refinedev/antd";
import { Typography, Space } from "antd";
import { useLocation } from "react-router-dom";
import * as configs from "@console/configs";
import { ICredentials } from "@console/interfaces";
import { BooleanField } from "@console/components/fields";

const { Title } = Typography;

export const Show: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const { state } = useLocation();

  const record: ICredentials = data?.data as any;
  if (!record) return null;

  const credentials = state.credentials ? (
    <div>{JSON.stringify(state.credentials)}</div>
  ) : null;

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <CoreShow
        isLoading={isLoading}
        headerButtons={({ listButtonProps, refreshButtonProps }) => (
          <React.Fragment>
            {listButtonProps && <ListButton {...listButtonProps} />}
            <RefreshButton {...refreshButtonProps} />
          </React.Fragment>
        )}
      >
        <Title level={5}>{"Id"}</Title>
        <TextField value={record.username} />

        {credentials}

        <Title level={5}>{"Name"}</Title>
        <TextField value={record.name} />

        <Title level={5}>{"Status"}</Title>
        <BooleanField
          value={
            record.deactivated_at === 0 || record.deactivated_at > +new Date()
          }
        />

        <Title level={5}>{"Expired At"}</Title>
        <DateField
          value={record.deactivated_at}
          format={configs.format.datetime}
        />

        <Title level={5}>{"Created At"}</Title>
        <DateField value={record.created_at} format={configs.format.datetime} />

        <Title level={5}>{"Updated At"}</Title>
        <DateField value={record.updated_at} format={configs.format.datetime} />
      </CoreShow>
    </Space>
  );
};

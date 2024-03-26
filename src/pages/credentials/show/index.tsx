import React from "react";
import { IResourceComponentsProps, useShow, useGo } from "@refinedev/core";
import {
  Show as CoreShow,
  TextField,
  DateField,
  ListButton,
  RefreshButton,
} from "@refinedev/antd";
import { Typography, Space, Tabs, Button } from "antd";
import { useLocation } from "react-router-dom";
import * as configs from "@console/configs";
import { ICredentials } from "@console/interfaces";
import { BooleanField } from "@console/components/fields";
import { Code } from "@console/components/code";
import * as cURL from "./curl";
import * as go from "./go";
const { Title } = Typography;

export const Show: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const { state } = useLocation();

  const record: ICredentials = data?.data as any;
  if (!record) return null;

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <CoreShow
        isLoading={isLoading}
        headerButtons={({ listButtonProps }) => (
          <React.Fragment>
            {listButtonProps && <ListButton {...listButtonProps} />}
          </React.Fragment>
        )}
      >
        {!!state?.credentials && (
          <Tabs
            defaultActiveKey={cURL.Key}
            items={[cURL.Tab(state.credentials), go.Tab(state.credentials)]}
          />
        )}
      </CoreShow>
    </Space>
  );
};

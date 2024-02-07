import React from "react";
import { IResourceComponentsProps, useShow, useGo } from "@refinedev/core";
import {
  Show,
  TextField,
  DateField,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/antd";
import { Typography, Button, Space } from "antd";
import { ApiOutlined } from "@ant-design/icons";

import { IApplication } from "../../interfaces";
import { MessageList } from "./message";

const { Title } = Typography;

export const ApplicationShow: React.FC<IResourceComponentsProps> = () => {
  const go = useGo();

  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record: IApplication = data?.data as any;
  if (!record) return null;

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <Show
        isLoading={isLoading}
        headerButtons={({
          deleteButtonProps,
          editButtonProps,
          listButtonProps,
          refreshButtonProps,
        }) => (
          <React.Fragment>
            {listButtonProps && <ListButton {...listButtonProps} />}
            {editButtonProps && (
              <EditButton {...editButtonProps} type="default" />
            )}
            {deleteButtonProps && <DeleteButton {...deleteButtonProps} />}
            <RefreshButton {...refreshButtonProps} />
            <Button
              type="primary"
              onClick={() =>
                go({
                  to: { resource: "endpoint", action: "list" },
                  query: { app_id: record?.id },
                })
              }
              icon={<ApiOutlined />}
            >
              Endpoints
            </Button>
          </React.Fragment>
        )}
      >
        <Title level={5}>{"Id"}</Title>
        <TextField value={record.id} />

        <Title level={5}>{"Name"}</Title>
        <TextField value={record.name} />

        <Title level={5}>{"Created At"}</Title>
        <DateField value={record.created_at} format="YYYY-MM-DD HH:mm:ss ZZ" />

        <Title level={5}>{"Updated At"}</Title>
        <DateField value={record.updated_at} format="YYYY-MM-DD HH:mm:ss ZZ" />
      </Show>

      <MessageList appId={record.id} />
    </Space>
  );
};

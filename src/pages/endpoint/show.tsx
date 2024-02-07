import React, { useContext } from "react";
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
import { BranchesOutlined } from "@ant-design/icons";
import { IEndpoint } from "../../interfaces";
import { useApp } from "../../hooks/application";
import { EndpointMessageList } from "./message";

const { Title } = Typography;

export const EndpointShow: React.FC<IResourceComponentsProps> = () => {
  const go = useGo();
  const { queryResult } = useShow();
  const ep: IEndpoint | undefined = queryResult?.data?.data as any;
  const { isLoading, app } = useApp(ep?.app_id);

  if (!ep) return null;

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
                  to: { resource: "rule", action: "list" },
                  query: { app_id: app?.id, ep_id: ep.id },
                })
              }
              icon={<BranchesOutlined />}
            >
              Rules
            </Button>
          </React.Fragment>
        )}
      >
        <Title level={5}>{"Id"}</Title>
        <TextField value={ep.id} />

        <Title level={5}>{"Application ID"}</Title>
        <TextField value={app?.id} />

        <Title level={5}>{"Application Name"}</Title>
        <TextField value={app?.name} />

        <Title level={5}>{"Name"}</Title>
        <TextField value={ep.name} />

        <Title level={5}>{"Method"}</Title>
        <TextField value={ep.method} />

        <Title level={5}>{"Uri"}</Title>
        <TextField value={ep.uri} />

        <Title level={5}>{"Created At"}</Title>
        <DateField value={ep.created_at} format="YYYY-MM-DD HH:mm:ss ZZ" />

        <Title level={5}>{"Updated At"}</Title>
        <DateField value={ep.updated_at} format="YYYY-MM-DD HH:mm:ss ZZ" />
      </Show>

      <EndpointMessageList epId={ep.id} />
    </Space>
  );
};

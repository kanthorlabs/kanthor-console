import React from "react";
import { IResourceComponentsProps, useShow, useGo } from "@refinedev/core";
import {
  Show as CoreShow,
  TextField,
  DateField,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/antd";
import { Typography, Button, Space } from "antd";
import { BranchesOutlined } from "@ant-design/icons";
import * as constants from "@console/constants";
import * as hooks from "@console/hooks";
import { IApplication, IEndpoint } from "@console/interfaces";

const { Title } = Typography;

export const Show: React.FC<IResourceComponentsProps> = () => {
  const go = useGo();
  const { queryResult } = useShow();
  const ep: IEndpoint | undefined = queryResult?.data?.data as any;
  const { isLoading, doc } = hooks.useParent<IApplication>(
    constants.PROVIDER_SDK,
    constants.RESOURCE_APP,
    ep?.app_id
  );

  if (!ep) return null;

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <CoreShow
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
                  to: { resource: constants.RESOURCE_RT, action: "list" },
                  query: { ep_id: ep.id },
                })
              }
              icon={<BranchesOutlined />}
            >
              Routes
            </Button>
          </React.Fragment>
        )}
      >
        <Title level={5}>{"Id"}</Title>
        <TextField value={ep.id} />

        <Title level={5}>{"Application ID"}</Title>
        <TextField value={doc?.id} />

        <Title level={5}>{"Application Name"}</Title>
        <TextField value={doc?.name} />

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
      </CoreShow>
    </Space>
  );
};

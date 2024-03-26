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
import { Typography, Button, Space, Tooltip } from "antd";
import { BranchesOutlined, EyeOutlined } from "@ant-design/icons";
import * as constants from "@console/constants";
import * as configs from "@console/configs";
import * as hooks from "@console/hooks";
import { IApplication, IEndpoint } from "@console/interfaces";
import { useSecret } from "./secret";

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
  const { toggle, secret, error } = useSecret();

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

        <Title style={{ color: "#f5222d" }} level={5}>
          {"Secret"}
        </Title>
        <TextField value={!!secret ? secret : "*********"} />
        <Tooltip title="Obtain the secret">
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => toggle(ep.id)}
          />
        </Tooltip>

        <Title level={5}>{"Created At"}</Title>
        <DateField value={ep.created_at} format={configs.format.datetime} />

        <Title level={5}>{"Updated At"}</Title>
        <DateField value={ep.updated_at} format={configs.format.datetime} />
      </CoreShow>
    </Space>
  );
};

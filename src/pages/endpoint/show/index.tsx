import React from "react";
import { IResourceComponentsProps, useShow, useGo } from "@refinedev/core";
import {
  Show as CoreShow,
  TextField,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/antd";
import { Typography, Button, Space, Tooltip } from "antd";
import { BranchesOutlined, EyeOutlined } from "@ant-design/icons";
import * as constants from "@console/constants";
import * as configs from "@console/configs";
import { IApplication, IEndpoint } from "@console/interfaces";
import * as fields from "@console/components/fields";
import * as hooks from "@console/hooks";
import { Props } from "@console/components/props";

import { useSecret } from "./secret";

const { Title } = Typography;

export const Show: React.FC<IResourceComponentsProps> = () => {
  const go = useGo();
  const { queryResult } = useShow();
  const record: IEndpoint | undefined = queryResult?.data?.data as any;
  const { isLoading, doc } = hooks.useParent<IApplication>(
    constants.PROVIDER_SDK,
    constants.RESOURCE_APP,
    record?.app_id
  );
  const { toggle, secret, error } = useSecret();

  if (!record) return null;

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
                  query: { ep_id: record.id },
                })
              }
              icon={<BranchesOutlined />}
            >
              Routes
            </Button>
          </React.Fragment>
        )}
      >
        <Props
          items={[
            {
              name: "Application ID",
              value: doc?.id,
            },
            {
              name: "Application Name",
              value: doc?.name,
            },
            {
              name: "ID",
              value: record.id,
            },
            {
              name: "Name",
              value: record.name,
            },
            {
              name: "Method",
              value: record.method,
            },
            {
              name: "Uri",
              value: record.uri,
            },
            {
              name: "Created At",
              value: (
                <fields.Timestamp
                  value={record.created_at}
                  format={configs.format.datetime}
                />
              ),
            },
            {
              name: "Updated At",
              value: (
                <fields.Timestamp
                  value={record.updated_at}
                  format={configs.format.datetime}
                />
              ),
            },
          ]}
        />

        <Title style={{ color: "#f5222d" }} level={5}>
          {"Secret"}
        </Title>
        <TextField value={!!secret ? secret : "*********"} />
        <Tooltip title="Obtain the secret">
          <Button
            shape="circle"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => toggle(record.id)}
          />
        </Tooltip>
      </CoreShow>
    </Space>
  );
};

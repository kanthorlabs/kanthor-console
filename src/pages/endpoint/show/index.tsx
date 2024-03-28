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
import { Button, Space } from "antd";
import { BranchesOutlined } from "@ant-design/icons";
import * as constants from "@console/constants";
import * as configs from "@console/configs";
import { IApplication, IEndpoint } from "@console/interfaces";
import * as fields from "@console/components/fields";
import * as hooks from "@console/hooks";
import { Props } from "@console/components/props";

import { ViewSecretButton } from "./secret";

const Show: React.FC<IResourceComponentsProps> = () => {
  const go = useGo();
  const { queryResult } = useShow();
  const record: IEndpoint | undefined = queryResult?.data?.data as any;
  const { isLoading, doc } = hooks.useParent<IApplication>(
    constants.PROVIDER_SDK,
    constants.RESOURCE_APP,
    record?.app_id
  );
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
            <ViewSecretButton endpoint={record} />
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
      </CoreShow>
    </Space>
  );
};

export default Show;

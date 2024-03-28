import React from "react";
import { IResourceComponentsProps, useShow, useGo } from "@refinedev/core";
import {
  Show as CoreShow,
  ListButton,
  EditButton,
  DeleteButton,
  RefreshButton,
} from "@refinedev/antd";
import { Button, Space } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import * as constants from "@console/constants";
import * as configs from "@console/configs";
import { IApplication } from "@console/interfaces";
import * as fields from "@console/components/fields";
import { Props } from "@console/components/props";

const Show: React.FC<IResourceComponentsProps> = () => {
  const go = useGo();

  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record: IApplication = data?.data as any;
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
                  to: { resource: constants.RESOURCE_EP, action: "list" },
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
        <Props
          items={[
            {
              name: "ID",
              value: record.id,
            },
            {
              name: "Name",
              value: record.name,
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

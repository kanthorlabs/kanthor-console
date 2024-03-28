import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List as CoreList,
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import * as configs from "@console/configs";
import * as fields from "@console/components/fields";
import { ExpireButton } from "./expire";

export const List: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <CoreList>
      <Table {...tableProps} rowKey="username">
        <Table.Column dataIndex="username" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column
          dataIndex="deactivated_at"
          title={"Status"}
          align="center"
          render={(value: number) => (
            <fields.Boolean value={value === 0 || value > +new Date()} />
          )}
        />
        <Table.Column
          dataIndex={["deactivated_at"]}
          title={"Expired At"}
          render={(value: any) =>
            value === 0 ? (
              <span>-</span>
            ) : (
              <fields.Timestamp
                value={value}
                format={configs.format.datetime}
              />
            )
          }
        />
        <Table.Column
          dataIndex={["created_at"]}
          title={"Created At"}
          render={(value: any) => {
            return (
              <fields.Timestamp
                value={value}
                format={configs.format.datetime}
              />
            );
          }}
        />
        <Table.Column
          dataIndex={["created_at"]}
          title={"Created At"}
          render={(value: any) => {
            return (
              <fields.Timestamp
                value={value}
                format={configs.format.datetime}
              />
            );
          }}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton
                hideText
                size="small"
                recordItemId={record.username}
              />
              <ShowButton
                hideText
                size="small"
                recordItemId={record.username}
              />
              <ExpireButton
                hideText
                size="small"
                recordItemId={record.username}
              />
            </Space>
          )}
        />
      </Table>
    </CoreList>
  );
};

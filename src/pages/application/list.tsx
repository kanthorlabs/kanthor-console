import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  DateField,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ApplicationList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column
          dataIndex={["created_at"]}
          title={"Created At"}
          render={(value: any) => {
            return <DateField value={value} format="YYYY-MM-DD HH:mm:ss ZZ" />;
          }}
        />
        <Table.Column
          dataIndex={["updated_at"]}
          title={"Updated At"}
          render={(value: any) => {
            return <DateField value={value} format="YYYY-MM-DD HH:mm:ss ZZ" />;
          }}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import { useTable, List, DateField, EditButton } from "@refinedev/antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { Table, Space } from "antd";

import { BooleanField } from "../../components/fields";
import { ExpireButton } from "./expire";

export const WorkspaceCredentialList: React.FC<
  IResourceComponentsProps
> = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column
          dataIndex="expired_at"
          title={"Status"}
          align="center"
          render={(value: number) => (
            <BooleanField value={value === 0 || value > +new Date()} />
          )}
        />
        <Table.Column
          dataIndex={["expired_at"]}
          title={"Expire At"}
          render={(value: any) =>
            value === 0 ? (
              <span>-</span>
            ) : (
              <DateField value={value} format="YYYY-MM-DD HH:mm:ss ZZ" />
            )
          }
        />
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
          align="center"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ExpireButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};

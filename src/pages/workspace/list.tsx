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

const List: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    pagination: { mode: "client" },
  });

  return (
    <CoreList>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="owner_id" title={"Owner"} />
        <Table.Column dataIndex="tier" title={"Tier"} />
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
          dataIndex={["updated_at"]}
          title={"Updated At"}
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
          align="center"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton
                hideText
                size="small"
                type="primary"
                recordItemId={record.id}
              />
            </Space>
          )}
        />
      </Table>
    </CoreList>
  );
};

export default List;

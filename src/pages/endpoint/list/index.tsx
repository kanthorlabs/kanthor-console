import React from "react";
import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import {
  useTable,
  List as CoreList,
  EditButton,
  DeleteButton,
  ShowButton,
  TextField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import * as constants from "@console/constants";
import * as configs from "@console/configs";
import * as hooks from "@console/hooks";
import { IApplication, IEndpoint } from "@console/interfaces";
import * as fields from "@console/components/fields";
import { Filter } from "./filter";

const List: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed<{ app_id?: string }>();
  const { tableProps, tableQueryResult, searchFormProps } = useTable({
    syncWithLocation: true,
    meta: { app_id: params?.app_id },
    onSearch: (params: any) => [
      {
        field: "app_id",
        operator: "eq",
        value: params?.app_id,
      },
    ],
  });

  const appIds = tableQueryResult.data?.data.map((ep: any) => ep.app_id) ?? [];
  const { isLoading, docs } = hooks.useParents<IApplication>(
    constants.PROVIDER_SDK,
    constants.RESOURCE_APP,
    appIds
  );

  return (
    <CoreList>
      <Filter formProps={searchFormProps} />
      <Table {...tableProps} rowKey="id" loading={isLoading}>
        <Table.Column
          dataIndex="app_id"
          title={"Application"}
          render={(appId: string) => {
            return <TextField value={docs[appId]?.name} />;
          }}
        />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="uri" title={"Uri"} />
        <Table.Column dataIndex="method" title={"Method"} />
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
          render={(_, record: IEndpoint) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </CoreList>
  );
};

export default List;

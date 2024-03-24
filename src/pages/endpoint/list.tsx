import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useParsed,
} from "@refinedev/core";
import {
  useTable,
  List as CoreList,
  DateField,
  EditButton,
  DeleteButton,
  ShowButton,
  TextField,
  useSelect,
} from "@refinedev/antd";
import { Table, Space, Form, Select, FormProps } from "antd";
import * as constants from "@console/constants";
import * as hooks from "@console/hooks";
import { IApplication, IEndpoint } from "@console/interfaces";

export const List: React.FC<IResourceComponentsProps> = () => {
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

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const { params } = useParsed<{ app_id?: string }>();

  const { selectProps } = useSelect({
    resource: constants.RESOURCE_APP,
    defaultValue: params?.app_id,
    pagination: {
      mode: "server",
      current: 0,
      pageSize: 10,
    },
    optionLabel: "name",
    optionValue: "id",
    onSearch: (value) => [
      {
        field: "_q",
        operator: "eq",
        value,
      },
    ],
  });
  const selected = selectProps.options?.find((o) => o.value === params?.app_id);

  return (
    <Form layout="vertical" {...formProps}>
      <Form.Item name="app_id">
        {selected ? (
          <Select
            key="with-default"
            allowClear
            {...selectProps}
            defaultValue={selected as any}
            onChange={formProps.form?.submit}
            placeholder="Type to search then select application to filter"
          />
        ) : (
          <Select
            key="no-default"
            allowClear
            {...selectProps}
            onChange={formProps.form?.submit}
            placeholder="Type to search then select application to filter"
          />
        )}
      </Form.Item>
    </Form>
  );
};

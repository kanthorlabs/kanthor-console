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
import { Table, Space, Form, FormProps, Select } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import * as constants from "@console/constants";
import * as configs from "@console/configs";
import * as hooks from "@console/hooks";
import { IEndpoint, IRoute } from "@console/interfaces";

export const List: React.FC<IResourceComponentsProps> = () => {
  const { params } = useParsed<{ ep_id?: string }>();
  const { tableProps, tableQueryResult, searchFormProps } = useTable({
    syncWithLocation: true,
    meta: { ep_id: params?.ep_id },
    onSearch: (params: any) => [
      {
        field: "ep_id",
        operator: "eq",
        value: params?.ep_id,
      },
    ],
  });

  const epIds = tableQueryResult.data?.data.map((ep: any) => ep.ep_id) ?? [];
  const { isLoading, docs } = hooks.useParents<IEndpoint>(
    constants.PROVIDER_SDK,
    constants.RESOURCE_EP,
    epIds
  );

  return (
    <CoreList>
      <Filter formProps={searchFormProps} />
      <Table {...tableProps} rowKey="id" loading={isLoading}>
        <Table.Column
          dataIndex="ep_id"
          title={"Endpoint"}
          render={(epId: string) => {
            return <TextField value={docs[epId]?.name} />;
          }}
        />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column
          dataIndex="condition_source"
          title={"Condition"}
          render={(_, record: IRoute) => {
            const value = `${record.condition_expression}->${record.condition_source}`;
            return <TextField value={value} />;
          }}
        />
        <Table.Column
          dataIndex={["exclusionary"]}
          title={"Exclusionary"}
          render={(value: boolean, r: any) => {
            return value ? (
              <PlusOutlined style={{ color: "#f5222d" }} />
            ) : (
              <MinusOutlined style={{ color: "#52c41a" }} />
            );
          }}
          align="center"
        />
        <Table.Column
          dataIndex={["created_at"]}
          title={"Created At"}
          render={(value: any) => {
            return <DateField value={value} format={configs.format.datetime} />;
          }}
        />
        <Table.Column
          dataIndex={["updated_at"]}
          title={"Updated At"}
          render={(value: any) => {
            return <DateField value={value} format={configs.format.datetime} />;
          }}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          align="center"
          render={(_, record: BaseRecord) => (
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
    resource: "endpoint",
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
      <Form.Item name="ep_id">
        {selected ? (
          <Select
            key="with-default"
            allowClear
            {...selectProps}
            defaultValue={selected as any}
            onChange={formProps.form?.submit}
            placeholder="Type to search then select endpoint to filter"
          />
        ) : (
          <Select
            key="no-default"
            allowClear
            {...selectProps}
            onChange={formProps.form?.submit}
            placeholder="Type to search then select endpoint to filter"
          />
        )}
      </Form.Item>
    </Form>
  );
};

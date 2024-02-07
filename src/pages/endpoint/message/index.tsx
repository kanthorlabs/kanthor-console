import React from "react";
import { IResourceComponentsProps, useInvalidate } from "@refinedev/core";
import {
  DateField,
  useTable,
  PageHeader,
  NumberField,
  TextField,
} from "@refinedev/antd";
import { Table, Space, Form, Input, Button, FormProps } from "antd";
import { RedoOutlined } from "@ant-design/icons";

import { BooleanField, TimestampField } from "../../../components/fields";
import { ViewButton } from "./view";
import { IEndpointMessage } from "../../../interfaces";

export const EndpointMessageList: React.FC<
  IResourceComponentsProps & { epId: string }
> = ({ epId }) => {
  const { searchFormProps, tableProps } = useTable({
    syncWithLocation: false,
    resource: "endpoint/:ep_id/message",
    meta: { ep_id: epId },
    pagination: { mode: "server" },
    filters: {
      initial: [
        {
          field: "_limit",
          operator: "eq",
          value: 10,
        },
        {
          field: "_start",
          operator: "eq",
          value: +new Date() - 1 * 60 * 60 * 1000,
        },
      ],
    },
    onSearch: (params: any) => {
      const { keyword = "" } = { ...params };
      return [
        {
          field: "_q",
          operator: "eq",
          value: keyword,
        },
      ];
    },
  });
  const invalidate = useInvalidate();

  return (
    <PageHeader
      ghost={false}
      title="Messages"
      extra={
        <Space wrap>
          <Button
            onClick={() =>
              invalidate({
                resource: "endpoint/:ep_id/message",
                invalidates: ["list"],
              })
            }
            icon={<RedoOutlined />}
          >
            Refresh
          </Button>
        </Space>
      }
    >
      <Filter formProps={searchFormProps} />

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          dataIndex="success_id"
          title={"Status"}
          align="center"
          render={(value: string) => <BooleanField value={!!value} />}
        />
        <Table.Column
          dataIndex="request_count"
          title={"Request Count"}
          render={(value: number) => <NumberField value={value} />}
        />
        <Table.Column
          dataIndex={["request_latest_ts"]}
          title={"Request Timestamp"}
          render={(value: number) => <TimestampField value={value} />}
        />
        <Table.Column
          dataIndex="response_count"
          title={"Response Count"}
          render={(value: number) => <NumberField value={value} />}
        />
        <Table.Column
          dataIndex={["response_latest_ts"]}
          title={"Response Timestamp"}
          render={(value: number) => <TimestampField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          align="center"
          render={(_, record: IEndpointMessage) => (
            <Space>
              <ViewButton
                hideText
                size="small"
                epId={epId}
                msgId={record.id}
                id={record.id}
              />
            </Space>
          )}
        />
      </Table>
    </PageHeader>
  );
};

const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  return (
    <Form {...formProps}>
      <Form.Item name="keyword">
        <Input
          placeholder="Search by message id"
          onChange={formProps.form?.submit}
        />
      </Form.Item>
    </Form>
  );
};

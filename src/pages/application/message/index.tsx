import React from "react";
import { IResourceComponentsProps, useInvalidate } from "@refinedev/core";
import { DateField, useTable, PageHeader, useModal } from "@refinedev/antd";
import { Table, Space, Form, Input, Button, Modal, FormProps } from "antd";
import { CloudUploadOutlined, RedoOutlined } from "@ant-design/icons";

import { ViewButton } from "./view";
import { MessageCreate } from "./create";
import { IMessage } from "../../../interfaces";
import { TimestampField } from "../../../components/fields";

export const MessageList: React.FC<
  IResourceComponentsProps & { appId: string }
> = ({ appId }) => {
  const { searchFormProps, tableProps } = useTable({
    syncWithLocation: false,
    resource: "application/:app_id/message",
    meta: { app_id: appId },
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
  const { show, close, modalProps } = useModal();
  const invalidate = useInvalidate();

  const onDone = () => {
    invalidate({
      resource: "application/:app_id/message",
      invalidates: ["list"],
    });
    close();
  };

  return (
    <PageHeader
      ghost={false}
      title="Messages"
      extra={
        <Space wrap>
          <Button
            onClick={() =>
              invalidate({
                resource: "application/:app_id/message",
                invalidates: ["list"],
              })
            }
            icon={<RedoOutlined />}
          >
            Refresh
          </Button>
          <Button type="primary" onClick={show} icon={<CloudUploadOutlined />}>
            Test API
          </Button>
        </Space>
      }
    >
      <Modal {...modalProps} width="50%" footer={false}>
        <MessageCreate appId={appId} title="Test API" onDone={onDone} />
      </Modal>

      <Filter formProps={searchFormProps} />

      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="type" title={"Type"} />
        <Table.Column
          dataIndex={["timestamp"]}
          title={"Timestamp"}
          render={(value: number) => <TimestampField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          align="center"
          render={(_, record: IMessage) => (
            <Space>
              <ViewButton
                hideText
                size="small"
                appId={record.app_id}
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

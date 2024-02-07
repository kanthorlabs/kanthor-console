import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

export const WorkspaceCredentialEdit: React.FC<
  IResourceComponentsProps
> = () => {
  const { formProps, saveButtonProps, onFinish } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        onFinish={(values: any) => {
          onFinish({
            ...values,
            expired_at: Number((values.expired_at as dayjs.Dayjs).toDate()),
          });
        }}
        layout="vertical"
      >
        <Form.Item
          label={"Name"}
          name={"name"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Expire At"}
          name="expired_at"
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => {
            return {
              value: value ? dayjs(value) : undefined,
            };
          }}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss ZZ"
            disabledDate={(d) => d.isBefore(new Date())}
            disabledTime={() => {
              return {
                disabledHours: () => range(0, new Date().getHours() + 1),
                disabledMinutes: () => [],
                disabledSeconds: () => [],
              };
            }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};

function range(start: number, end: number) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

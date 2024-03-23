import React from "react";
import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import { Create as CoreCreate, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { IWorkspace } from "@console/interfaces";

export const Create: React.FC<IResourceComponentsProps> = ({}) => {
  const { params } = useParsed<{ name?: string }>();
  const { formProps, saveButtonProps } = useForm();

  return (
    <CoreCreate
      saveButtonProps={saveButtonProps}
      breadcrumb={null}
      wrapperProps={{ style: { minWidth: "360px" } }}
    >
      <Form
        {...formProps}
        layout="vertical"
        initialValues={
          {
            name: params?.name ?? `Created at ${new Date().toLocaleString()}`,
          } as Partial<IWorkspace>
        }
      >
        <Form.Item label={"Name"} name={"name"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </CoreCreate>
  );
};

import React from "react";
import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { IWorkspace } from "../../interfaces";

export const WorkspaceCreate: React.FC<IResourceComponentsProps> = ({}) => {
  const { params } = useParsed<{ ws_name?: string }>();
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps} breadcrumb={null}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={
          {
            name: params?.ws_name ?? "main",
          } as Partial<IWorkspace>
        }
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
      </Form>
    </Create>
  );
};

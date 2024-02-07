import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const WorkspaceEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps} breadcrumb={null}>
      <Form {...formProps} layout="vertical">
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
    </Edit>
  );
};

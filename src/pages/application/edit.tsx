import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit as CoreEdit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const Edit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <CoreEdit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label={"Name"} name={"name"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </CoreEdit>
  );
};

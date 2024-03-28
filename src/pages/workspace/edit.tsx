import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit as CoreEdit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

const Edit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <CoreEdit
      saveButtonProps={saveButtonProps}
      breadcrumb={null}
      wrapperProps={{ style: { minWidth: "360px" } }}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item label={"Name"} name={"name"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </CoreEdit>
  );
};

export default Edit;

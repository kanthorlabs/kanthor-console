import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create as CoreCreate, useForm } from "@refinedev/antd";
import { Form, Input, Alert } from "antd";
import { useLocation } from "react-router-dom";
import { IApplication } from "@console/interfaces";

export const Create: React.FC<IResourceComponentsProps> = ({}) => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <React.Fragment>
      <CoreCreate saveButtonProps={saveButtonProps}>
        <Form
          {...formProps}
          layout="vertical"
          initialValues={
            {
              name: `Created at ${new Date().toLocaleString()}`,
            } as Partial<IApplication>
          }
        >
          <Form.Item label={"Name"} name={"name"} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </CoreCreate>
    </React.Fragment>
  );
};

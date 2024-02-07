import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Alert } from "antd";
import { useLocation } from "react-router-dom";

export const ApplicationCreate: React.FC<IResourceComponentsProps> = ({}) => {
  const { formProps, saveButtonProps } = useForm();
  const { state } = useLocation();

  const alert = state?.notification && (
    <Alert message={state?.notification} type="warning" showIcon />
  );

  return (
    <React.Fragment>
      <Create saveButtonProps={saveButtonProps}>
        {alert}
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
      </Create>
    </React.Fragment>
  );
};

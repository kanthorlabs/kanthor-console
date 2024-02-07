import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { HttpMethod, IEndpoint } from "../../interfaces";
import { useApp } from "../../hooks/application";

export const EndpointEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const ep: IEndpoint | undefined = queryResult?.data?.data as any;
  const { isLoading, app } = useApp(ep?.app_id);

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={isLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item label={"Application"}>
          <Input disabled value={app?.name} />
        </Form.Item>

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
          label={"Uri"}
          name={"uri"}
          rules={[
            {
              required: true,
              type: "url",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Method"}
          name={"method"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={Object.values(HttpMethod).map((method) => ({
              label: method,
              value: method,
            }))}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};

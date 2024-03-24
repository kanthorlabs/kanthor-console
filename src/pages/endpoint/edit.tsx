import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit as CoreEdit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import * as constants from "@console/constants";
import * as hooks from "@console/hooks";
import { HttpMethod, IApplication, IEndpoint } from "@console/interfaces";

export const Edit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const ep: IEndpoint | undefined = queryResult?.data?.data as any;
  const { isLoading, doc } = hooks.useParent<IApplication>(
    constants.PROVIDER_SDK,
    constants.RESOURCE_APP,
    ep?.app_id
  );

  return (
    <CoreEdit saveButtonProps={saveButtonProps} isLoading={isLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item label={"Application"}>
          <Input disabled value={doc?.name} />
        </Form.Item>

        <Form.Item label={"Name"} name={"name"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={"Uri"}
          name={"uri"}
          rules={[{ required: true, type: "url" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Method"}
          name={"method"}
          rules={[{ required: true }]}
        >
          <Select
            options={Object.values(HttpMethod).map((method) => ({
              label: method,
              value: method,
            }))}
          />
        </Form.Item>
      </Form>
    </CoreEdit>
  );
};

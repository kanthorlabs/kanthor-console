import React from "react";
import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import { Create as CoreCreate, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import * as constants from "@console/constants";
import { HttpMethod, IEndpoint } from "@console/interfaces";

export const Create: React.FC<IResourceComponentsProps> = ({}) => {
  const { formProps, saveButtonProps } = useForm();

  const { params } = useParsed<{ app_id?: string }>();
  const { selectProps } = useSelect({
    resource: constants.RESOURCE_APP,
    defaultValue: params?.app_id,
    pagination: {
      mode: "server",
      current: 0,
      pageSize: 10,
    },
    optionLabel: "name",
    optionValue: "id",
    onSearch: (value) => [
      {
        field: "_q",
        operator: "eq",
        value,
      },
    ],
  });
  const selected = selectProps.options?.find((o) => o.value === params?.app_id);

  return (
    <CoreCreate saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={
          {
            app_id: selected?.value,
            method: HttpMethod.POST,
          } as Partial<IEndpoint>
        }
      >
        <Form.Item
          label={"Application"}
          name={"app_id"}
          rules={[{ required: true }]}
        >
          {selected ? (
            <Select
              key="with-default"
              {...selectProps}
              defaultValue={selected as any}
            />
          ) : (
            <Select key="no-default" {...selectProps} />
          )}
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
    </CoreCreate>
  );
};

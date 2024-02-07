import React from "react";
import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Checkbox } from "antd";
import { ConditionSource, IEndpoint } from "../../interfaces";

export const EndpointRuleCreate: React.FC<IResourceComponentsProps> = ({}) => {
  const { formProps, saveButtonProps } = useForm();
  const { params } = useParsed<{ ep_id?: string }>();

  const { selectProps } = useSelect({
    resource: "endpoint",
    defaultValue: params?.ep_id,
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
  const selected = selectProps.options?.find((o) => o.value === params?.ep_id);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={
          {
            ep_id: params?.ep_id,
            priority: 1,
            exclusionary: false,
            condition_source: ConditionSource.TYPE,
            condition_expression: "any::",
          } as Partial<IEndpoint>
        }
      >
        <Form.Item
          label={"Endpoint"}
          name={"ep_id"}
          rules={[
            {
              required: true,
            },
          ]}
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
          label={"Priority"}
          name={"priority"}
          rules={[
            {
              required: true,
              type: "integer",
              min: 1,
              max: 256,
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name={"exclusionary"}
          valuePropName="checked"
          rules={[
            {
              required: true,
              type: "boolean",
            },
          ]}
        >
          <Checkbox>Exclusionary</Checkbox>
        </Form.Item>
        <Form.Item
          label={"Condition Source"}
          name={"condition_source"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={Object.values(ConditionSource).map((src) => ({
              label: src,
              value: src,
            }))}
          />
        </Form.Item>
        <Form.Item
          label={"Condition Expression"}
          name={"condition_expression"}
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

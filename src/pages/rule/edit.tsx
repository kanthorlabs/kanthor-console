import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Checkbox } from "antd";
import { ConditionSource, IEndpointRule } from "../../interfaces";
import { useEp } from "../../hooks/endpoint";

export const EndpointRuleEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const epr: IEndpointRule | undefined = queryResult?.data?.data as any;
  const { isLoading, ep } = useEp(epr?.ep_id);

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={isLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item label={"Endpoint"}>
          <Input disabled value={ep?.name} />
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
          label={"Exclusionary"}
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
    </Edit>
  );
};

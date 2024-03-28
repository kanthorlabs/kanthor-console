import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit as CoreEdit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Checkbox } from "antd";
import { ConditionSource, IEndpoint, IRoute } from "@console/interfaces";
import * as constants from "@console/constants";
import * as hooks from "@console/hooks";

const Edit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const rt: IRoute | undefined = queryResult?.data?.data as any;
  const { isLoading, doc } = hooks.useParent<IEndpoint>(
    constants.PROVIDER_SDK,
    constants.RESOURCE_EP,
    rt?.ep_id
  );

  return (
    <CoreEdit saveButtonProps={saveButtonProps} isLoading={isLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item label={"Endpoint"}>
          <Input disabled value={doc?.name} />
        </Form.Item>

        <Form.Item label={"Name"} name={"name"} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={"Priority"}
          name={"priority"}
          rules={[{ required: true, type: "integer", min: 1, max: 256 }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label={"Exclusionary"}
          name={"exclusionary"}
          valuePropName="checked"
          rules={[{ required: true, type: "boolean" }]}
        >
          <Checkbox>Exclusionary</Checkbox>
        </Form.Item>
        <Form.Item
          label={"Condition Source"}
          name={"condition_source"}
          rules={[{ required: true }]}
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
    </CoreEdit>
  );
};

export default Edit;

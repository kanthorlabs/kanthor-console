import React from "react";
import { useParsed } from "@refinedev/core";
import { useSelect } from "@refinedev/antd";
import { Form, Select, FormProps } from "antd";
import * as constants from "@console/constants";

export const Filter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
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
    <Form layout="vertical" {...formProps}>
      <Form.Item name="app_id">
        {selected ? (
          <Select
            key="with-default"
            allowClear
            {...selectProps}
            defaultValue={selected as any}
            onChange={formProps.form?.submit}
            placeholder="Type to search then select application to filter"
          />
        ) : (
          <Select
            key="no-default"
            allowClear
            {...selectProps}
            onChange={formProps.form?.submit}
            placeholder="Type to search then select application to filter"
          />
        )}
      </Form.Item>
    </Form>
  );
};

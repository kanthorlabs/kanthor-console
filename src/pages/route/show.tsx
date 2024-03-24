import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show as CoreShow,
  TextField,
  DateField,
  NumberField,
} from "@refinedev/antd";
import { Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { IRoute } from "@console/interfaces";

const { Title } = Typography;

export const Show: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record: IRoute = data?.data as any;
  if (!record) return null;

  return (
    <CoreShow isLoading={isLoading}>
      <Title level={5}>{"Id"}</Title>
      <TextField value={record.id} />

      <Title level={5}>{"Name"}</Title>
      <TextField value={record.name} />

      <Title level={5}>{"Priority"}</Title>
      <NumberField value={record.priority} />

      <Title level={5}>{"Exclusionary"}</Title>
      {record.exclusionary ? (
        <PlusOutlined style={{ color: "#f5222d" }} />
      ) : (
        <MinusOutlined style={{ color: "#52c41a" }} />
      )}

      <Title level={5}>{"Condition Source"}</Title>
      <TextField value={record.condition_source} />

      <Title level={5}>{"Condition Expression"}</Title>
      <TextField value={record.condition_expression} />

      <Title level={5}>{"Created At"}</Title>
      <DateField value={record.created_at} format="YYYY-MM-DD HH:mm:ss ZZ" />

      <Title level={5}>{"Updated At"}</Title>
      <DateField value={record.updated_at} format="YYYY-MM-DD HH:mm:ss ZZ" />
    </CoreShow>
  );
};

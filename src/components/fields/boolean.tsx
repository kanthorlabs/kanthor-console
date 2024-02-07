import React from "react";
import { BooleanFieldProps } from "@refinedev/antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const BooleanField: React.FC<BooleanFieldProps> = ({
  value,
  trueIcon = <CheckCircleOutlined style={{ color: "#52c41a" }} />,
  falseIcon = <CloseCircleOutlined style={{ color: "#f5222d" }} />,
}) => {
  return value ? <span>{trueIcon}</span> : <span>{falseIcon}</span>;
};

import React from "react";
import _ from "lodash";
import { DateField, DateFieldProps, TextField } from "@refinedev/antd";

export const Timestamp: React.FC<{ none?: string } & DateFieldProps> = ({
  none = "-",
  value,
  ...rest
}) => {
  if (_.isNumber(value) && value <= 0) return <TextField value={none} />;
  return (
    <DateField value={value} {...rest} format="YYYY-MM-DD HH:mm:ss.SSS ZZ" />
  );
};

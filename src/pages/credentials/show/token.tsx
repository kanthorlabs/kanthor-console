import React from "react";
import { Typography, Alert } from "antd";
import { ICredentials } from "@console/interfaces";

export const Token: React.FC<{ credentials?: ICredentials }> = ({
  credentials,
}) => {
  if (!credentials) return null;

  const description = (
    <Typography.Paragraph code copyable>
      {credentials.schemes.basic}
    </Typography.Paragraph>
  );
  return (
    <Alert
      showIcon
      type="warning"
      message="You will not be able to reveal this key again, so please make sure to take note of it now."
      description={description}
    />
  );
};

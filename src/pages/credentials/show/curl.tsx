import React from "react";
import { CodeOutlined } from "@ant-design/icons";
import { Code, Language } from "@console/components/code";
import { ICredentials } from "@console/interfaces";
import * as configs from "@console/configs";

export const Key = "cURL";

export const Tab = (credentials: ICredentials) => ({
  key: Key,
  label: Key,
  children: <Content credentials={credentials} />,
  icon: <CodeOutlined />,
});

export const Content: React.FC<{ credentials: ICredentials }> = ({
  credentials,
}) => {
  const code = `curl ${configs.api.sdk.uri}/api/account \\
  -H "Authorization: Basic ${credentials.schemes.basic}"`;
  return <Code language={Language.Bash}>{code}</Code>;
};

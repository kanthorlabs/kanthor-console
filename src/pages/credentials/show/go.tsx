import React from "react";
import GoOriginal from "devicons-react/lib/icons/GoOriginal";
import { Code, Language } from "@console/components/code";
import { ICredentials } from "@console/interfaces";
import * as configs from "@console/configs";

export const Key = Language.Go;
export const Icon = <GoOriginal />;

export const Content: React.FC<{ credentials: ICredentials }> = ({
  credentials,
}) => {
  const code = `import (
    kanthor "github.com/kanthorlabs/kanthor-sdk-go"
)

token := "${credentials.schemes.basic}"
client := kanthor.New(token, kanthor.WithServerUrl("${configs.api.sdk.uri}"))
account, err := client.Account.Get(ctx)`;
  return <Code language={Language.Go}>{code}</Code>;
};

import React from "react";
import { ThemedTitleV2 } from "@refinedev/antd";
import { AuthPage } from "@refinedev/antd";
import { useParsed } from "@refinedev/core";

import configs from "../../configs";
import { AskAuthProvider, providers } from "../../providers";

export const Auth: React.FC = () => {
  const { params } = useParsed<{ auth_engine?: string }>();
  const isAsk = (params?.auth_engine || configs.api.auth.engine) === AskAuthProvider.engine;

  return (
    <AuthPage
      type="login"
      title={<ThemedTitleV2 collapsed={false} text={configs.project.name} />}
      providers={!isAsk ? providers : []}
      rememberMe={false}
      registerLink={false}
      forgotPasswordLink={false}
      hideForm={!isAsk}
      formProps={
        isAsk
          ? {
              initialValues: {
                email: configs.api.auth.ask.email,
                password: configs.api.auth.ask.password,
              },
            }
          : {}
      }
    />
  );
};

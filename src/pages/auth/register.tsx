import React from "react";
import { useLink, useGo } from "@refinedev/core";
import { AuthPage } from "@refinedev/antd";
import { Typography, theme } from "antd";

import * as configs from "@console/configs";
import { External } from "@console/providers/auth/external";

export const Register = () => {
  const Link = useLink();
  const { token } = theme.useToken();

  const go = useGo();
  // hardcode
  React.useEffect(() => {
    const isexternal = configs.passport.strategy === External.name;
    if (!isexternal) go({ to: "/auth/login" });
  }, []);

  return (
    <AuthPage
      type="register"
      loginLink={
        <Typography.Text
          style={{
            fontSize: 12,
            marginLeft: "auto",
          }}
        >
          Have an account?{" "}
          <Link
            style={{
              fontWeight: "bold",
              color: token.colorPrimaryTextHover,
            }}
            to="/auth/login"
          >
            Sign in
          </Link>
        </Typography.Text>
      }
    />
  );
};

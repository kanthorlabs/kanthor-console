import { useLink } from "@refinedev/core";
import { AuthPage, AuthProps } from "@refinedev/antd";
import { Typography, theme } from "antd";

import * as configs from "@console/configs";
import { External } from "@console/providers/auth/external";

export const Login = () => {
  const Link = useLink();
  const { token } = theme.useToken();

  const props: AuthProps = { registerLink: false, forgotPasswordLink: false };

  // hardcode
  const isexternal = configs.passport.engine === External.engine;
  if (isexternal) {
    props.registerLink = (
      <div style={{ marginTop: 8 }}>
        <Typography.Text style={{ fontSize: 12 }}>
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            style={{
              fontWeight: "bold",
              color: token.colorPrimaryTextHover,
            }}
          >
            Sign up
          </Link>
        </Typography.Text>
      </div>
    );

    props.forgotPasswordLink = (
      <Link
        style={{
          color: token.colorPrimaryTextHover,
          fontSize: "12px",
          marginLeft: "auto",
        }}
        to="/auth/password/forgot"
      >
        Forgot password?
      </Link>
    );
  }

  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: {
          email: configs.passport.username,
          password: configs.passport.password,
          remember: true,
        },
      }}
      {...props}
    />
  );
};

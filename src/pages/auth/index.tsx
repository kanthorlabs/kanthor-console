import React from "react";

export const Login = React.lazy(() => import("./login"));
export const Register = React.lazy(() => import("./register"));

export * as password from "./password";

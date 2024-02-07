import {
  DashboardOutlined,
  LockOutlined,
  AppstoreOutlined,
  ApiOutlined,
  BranchesOutlined,
} from "@ant-design/icons";

const portal = [
  {
    name: "analytics",
    list: "/",
    meta: {
      dataProviderName: "portal",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "credentials",
    list: "/credentials",
    create: "/credentials/create",
    edit: "/credentials/edit/:id",
    meta: {
      dataProviderName: "portal",
      label: "Credentials",
      icon: <LockOutlined />,
    },
  },
  {
    name: "account",
    list: "/account",
    meta: {
      dataProviderName: "portal",
      hide: true,
    },
  },
  {
    name: "workspace",
    list: "/workspace",
    create: "/workspace/create",
    edit: "/workspace/edit/:id",
    show: "/workspace/show/:id",
    meta: {
      dataProviderName: "portal",
      hide: true,
    },
  },
  {
    name: "application/:app_id/message",
    list: "/application/:app_id/message",
    get: "/application/:app_id/message/:msg_id",
    meta: {
      dataProviderName: "portal",
      hide: true,
    },
  },
  {
    name: "endpoint/:ep_id/message",
    list: "/endpoint/:ep_id/message",
    get: "/endpoint/:ep_id/message/:msg_id",
    meta: {
      dataProviderName: "portal",
      hide: true,
    },
  },
];

const sdk = [
  {
    name: "application",
    list: "/application",
    create: "/application/create",
    edit: "/application/edit/:id",
    show: "/application/show/:id",
    meta: {
      dataProviderName: "sdk",
      label: "Applications",
      icon: <AppstoreOutlined />,
    },
  },
  {
    name: "endpoint",
    list: "/endpoint",
    create: "/endpoint/create",
    edit: "/endpoint/edit/:id",
    show: "/endpoint/show/:id",
    meta: {
      dataProviderName: "sdk",
      label: "Endpoint",
      icon: <ApiOutlined />,
    },
  },
  {
    name: "rule",
    list: "/rule",
    create: "/rule/create",
    edit: "/rule/edit/:id",
    show: "/rule/show/:id",
    meta: {
      dataProviderName: "sdk",
      label: "Endpoint Rule",
      icon: <BranchesOutlined />,
    },
  },
];
export const resources = [...portal, ...sdk];

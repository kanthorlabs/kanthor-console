import { DashboardOutlined, AppstoreOutlined } from "@ant-design/icons";

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
];
export const resources = [...portal, ...sdk];

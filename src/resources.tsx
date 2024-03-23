import { DashboardOutlined } from "@ant-design/icons";

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

export const resources = [...portal];

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
];

export const resources = [...portal];

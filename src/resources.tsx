import {
  DashboardOutlined,
  AppstoreOutlined,
  ApiOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import * as constants from "@console/constants";

const portal = [
  {
    name: "analytics",
    list: "/",
    meta: {
      dataProviderName: constants.PROVIDER_PORTAL,
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    ...resource(constants.RESOURCE_WS),
    meta: {
      dataProviderName: constants.PROVIDER_PORTAL,
      hide: true,
    },
  },
  {
    ...resource(constants.RESOURCE_CREDS),
    meta: {
      dataProviderName: constants.PROVIDER_PORTAL,
    },
  },
];

const sdk = [
  {
    ...resource(constants.RESOURCE_APP),
    meta: {
      dataProviderName: constants.PROVIDER_SDK,
      label: "Application",
      icon: <AppstoreOutlined />,
    },
  },
  {
    ...resource(constants.RESOURCE_EP),
    meta: {
      dataProviderName: constants.PROVIDER_SDK,
      label: "Endpoint",
      icon: <ApiOutlined />,
    },
  },
  {
    ...resource(constants.RESOURCE_RT),
    meta: {
      dataProviderName: constants.PROVIDER_SDK,
      label: "Route",
      icon: <BranchesOutlined />,
    },
  },
];

export const resources = [...portal, ...sdk];

function resource(name: string) {
  return {
    name: `${name}`,
    list: `/${name}`,
    create: `/${name}/create`,
    edit: `/${name}/edit/:id`,
    show: `/${name}/show/:id`,
  };
}

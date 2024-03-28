import React from "react";
import { Typography, Space, Card } from "antd";
import { ICredentials } from "@console/interfaces";

import * as cURL from "./curl";
import * as go from "./go";

interface Tab {
  Content: React.FC<{ credentials: ICredentials }>;
  Icon: React.ReactNode;
}
const tabs: {
  [name: string]: Tab;
} = {
  [cURL.Key]: {
    Content: cURL.Content,
    Icon: cURL.Icon,
  },
  [go.Key]: {
    Content: go.Content,
    Icon: go.Icon,
  },
};

export const Examples: React.FC<{ credentials?: ICredentials }> = ({
  credentials,
}) => {
  const [active, setActive] = React.useState<string>(cURL.Key);
  if (!credentials) return null;

  const Content = tabs[active].Content;
  const tabList = Object.keys(tabs).map((name) => ({
    key: name,
    tab: name,
    label: tabs[name].Icon,
  }));

  return (
    <Card
      style={{ width: "100%" }}
      title="Examples"
      tabList={tabList}
      activeTabKey={active}
      onTabChange={(key) => setActive(key)}
    >
      <Content credentials={credentials} />
    </Card>
  );
};

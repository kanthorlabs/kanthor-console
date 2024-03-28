import React from "react";
import { Typography, List } from "antd";
import { IItem } from "@console/interfaces";

export const Props: React.FC<{ items: IItem[] }> = ({ items }) => {
  return (
    <List
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text strong>{item.name}:</Typography.Text> {item.value}
        </List.Item>
      )}
    />
  );
};

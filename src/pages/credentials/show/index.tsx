import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show as CoreShow, ListButton } from "@refinedev/antd";
import { Space } from "antd";
import { useLocation } from "react-router-dom";
import * as configs from "@console/configs";
import { ICredentials } from "@console/interfaces";
import { Props } from "@console/components/props";
import * as fields from "@console/components/fields";
import { Examples } from "./examples";
import { Token } from "./token";

export const Show: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const { state } = useLocation();

  const record: ICredentials = data?.data as any;
  if (!record) return null;

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <CoreShow
        isLoading={isLoading}
        headerButtons={({ listButtonProps }) => (
          <React.Fragment>
            {listButtonProps && <ListButton {...listButtonProps} />}
          </React.Fragment>
        )}
      >
        <Props
          items={[
            {
              name: "Name",
              value: record.name,
            },
            {
              name: "Status",
              value: (
                <fields.Boolean
                  value={
                    record.deactivated_at === 0 ||
                    record.deactivated_at > +new Date()
                  }
                />
              ),
            },
            {
              name: "Expired At",
              value: (
                <fields.Timestamp
                  none="Never"
                  value={record.deactivated_at}
                  format={configs.format.datetime}
                />
              ),
            },
          ]}
        />
      </CoreShow>

      <Token credentials={state?.credentials} />
      <Examples credentials={state?.credentials} />
    </Space>
  );
};

import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show as CoreShow } from "@refinedev/antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import * as constants from "@console/constants";
import * as configs from "@console/configs";
import { IEndpoint, IRoute } from "@console/interfaces";
import * as fields from "@console/components/fields";
import * as hooks from "@console/hooks";
import { Props } from "@console/components/props";

const Show: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();

  const record: IRoute = queryResult.data?.data as any;
  const { isLoading, doc } = hooks.useParent<IEndpoint>(
    constants.PROVIDER_SDK,
    constants.RESOURCE_EP,
    record?.ep_id
  );
  if (!record) return null;

  return (
    <CoreShow isLoading={isLoading}>
      <Props
        items={[
          {
            name: "Endpoint ID",
            value: doc?.id,
          },
          {
            name: "Endpoint Name",
            value: doc?.name,
          },
          {
            name: "ID",
            value: record.id,
          },
          {
            name: "Name",
            value: record.name,
          },
          {
            name: "Priority",
            value: record.name,
          },
          {
            name: "Name",
            value: record.priority,
          },
          {
            name: "Exclusionary",
            value: record.exclusionary ? (
              <PlusOutlined style={{ color: "#f5222d" }} />
            ) : (
              <MinusOutlined style={{ color: "#52c41a" }} />
            ),
          },
          {
            name: "Condition Source",
            value: record.condition_source,
          },
          {
            name: "Condition Expression",
            value: record.condition_expression,
          },
          {
            name: "Created At",
            value: (
              <fields.Timestamp
                value={record.created_at}
                format={configs.format.datetime}
              />
            ),
          },
          {
            name: "Updated At",
            value: (
              <fields.Timestamp
                value={record.updated_at}
                format={configs.format.datetime}
              />
            ),
          },
        ]}
      />
    </CoreShow>
  );
};

export default Show;

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useDataProvider } from "@refinedev/core";
import { Card, Col, Divider, Row, Statistic } from "antd";
import { LockOutlined, AppstoreOutlined, ApiOutlined } from "@ant-design/icons";
// import { Line } from "@ant-design/plots";
import { IAnalyticsOverview } from "../../interfaces";

export const Analytics: React.FC<{ reloadId: string }> = ({ reloadId }) => {
  return (
    <React.Fragment>
      <Overview reloadId={reloadId} />

      <Divider />

      {/* <Row gutter={16}>
        <Col span={24}>
          <Line
            xField={"year"}
            yField={"value"}
            sizeField={"value"}
            shapeField={"trail"}
            colorField={"category"}
            legend={{ size: false }}
            style={{ lineWidth: 2 }}
            viewStyle={{ width: "100%" }}
            data={{
              type: "fetch",
              value:
                "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json",
            }}
          />
        </Col>
      </Row> */}
    </React.Fragment>
  );
};

const formatter = (value: number | string) => (
  <CountUp end={Number(value)} separator="," />
);

const Overview: React.FC<{ reloadId: string }> = ({ reloadId }) => {
  const [overview, setOverview] = useState<IAnalyticsOverview>({
    credentials_count: 0,
    application_count: 0,
    endpoint_count: 0,
    rule_count: 0,
  });
  const { getOne } = useDataProvider()("portal");

  useEffect(() => {
    getOne({ resource: "analytics", id: "overview" }).then(({ data }) => {
      setOverview({ ...(data as any) });
    });
  }, [reloadId]);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Credentials"
            value={overview.credentials_count}
            formatter={formatter}
            prefix={<LockOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Applications"
            value={overview.application_count}
            formatter={formatter}
            prefix={<AppstoreOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Endpoints"
            value={overview.endpoint_count}
            formatter={formatter}
            prefix={<ApiOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false}>
          <Statistic
            title="Rules"
            value={overview.rule_count}
            formatter={formatter}
            prefix={<ApiOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};

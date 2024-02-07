import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Divider, Flex, Space } from "antd";

import { Analytics } from "./analytics";
import { Import, Export } from "./transfer";

export const Dashboard: React.FC = () => {
  const [reloadId, setReloadId] = useState(uuidv4());
  return (
    <React.Fragment>
      <Flex align="center" justify="flex-end">
        <Space>
          <Import reload={() => setReloadId(uuidv4())} />
          <Export />
        </Space>
      </Flex>

      <Divider />

      <Analytics reloadId={reloadId} />
    </React.Fragment>
  );
};

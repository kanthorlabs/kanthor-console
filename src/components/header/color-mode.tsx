import React, { useContext } from "react";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { Switch } from "antd";

import * as contexts from "@console/contexts";

export const ColorModeSelector: React.FC<
  RefineThemedLayoutV2HeaderProps
> = () => {
  const { mode, setMode } = useContext(contexts.colormode.Context);

  return (
    <React.Fragment>
      <Switch
        checkedChildren="🌛"
        unCheckedChildren="🔆"
        onChange={() => setMode(mode === "light" ? "dark" : "light")}
        defaultChecked={mode === "dark"}
      />
    </React.Fragment>
  );
};

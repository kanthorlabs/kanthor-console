import React, { useContext } from "react";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { Switch } from "antd";
import { ColorModeContext } from "../../contexts/color-mode";

export const ViewModeSelector: React.FC<
  RefineThemedLayoutV2HeaderProps
> = () => {
  const { mode, setMode } = useContext(ColorModeContext);

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

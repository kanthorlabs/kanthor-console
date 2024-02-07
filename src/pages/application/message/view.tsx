import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, Button, ButtonProps } from "antd";
import { useModal } from "@refinedev/antd";
import {
  RefineButtonTestIds,
  RefineButtonClassNames,
  RefineButtonCommonProps,
} from "@refinedev/ui-types";
import { useDataProvider } from "@refinedev/core";
import { IMessage } from "../../../interfaces";
import { Code, CodeLanguage } from "../../../components/code";

export interface ViewButton extends ButtonProps, RefineButtonCommonProps {
  appId: string;
  id: string;
}

export const ViewButton: React.FC<ViewButton> = ({
  appId,
  id,
  hideText = false,
  ...rest
}) => {
  const { show, close, modalProps } = useModal();
  const [message, setMessage] = useState<IMessage>();
  const { getOne } = useDataProvider()("portal");

  const onClick = () => {
    getOne({
      resource: "application/:app_id/message",
      id,
      meta: { app_id: appId },
    }).then(({ data }) => {
      setMessage(data as any);
      show();
    });
  };

  return (
    <React.Fragment>
      <Button
        icon={<EyeOutlined />}
        title="View"
        onClick={onClick}
        data-testid={RefineButtonTestIds.EditButton}
        className={RefineButtonClassNames.EditButton}
        {...rest}
      />
      <Modal
        {...modalProps}
        width="50%"
        footer={[
          <Button key="back" onClick={close}>
            Close
          </Button>,
        ]}
      >
        {<Code language={CodeLanguage.JSON} code={parse(message)} />}
      </Modal>
    </React.Fragment>
  );
};

function parse(message?: IMessage): string {
  if (!message) return "{}";

  try {
    const obj = { ...message };
    if (obj.headers) obj.headers = JSON.parse(obj.headers);
    if (obj.metadata) obj.metadata = JSON.parse(obj.metadata);
    if (obj.body) obj.body = JSON.parse(obj.body);

    return JSON.stringify(obj, null, 2);
  } catch {
    return JSON.stringify(message, null, 2);
  }
}

import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Modal, Button, ButtonProps, Spin } from "antd";
import { useModal } from "@refinedev/antd";
import {
  RefineButtonTestIds,
  RefineButtonClassNames,
  RefineButtonCommonProps,
} from "@refinedev/ui-types";
import { useDataProvider } from "@refinedev/core";
import { IEndpointMessage } from "../../../interfaces";
import { Code, CodeLanguage } from "../../../components/code";

export interface ViewButton extends ButtonProps, RefineButtonCommonProps {
  epId: string;
  msgId: string;
  id: string;
}

export const ViewButton: React.FC<ViewButton> = ({
  epId,
  msgId,
  id,
  hideText = false,
  ...rest
}) => {
  const { show, close, modalProps } = useModal();
  const [message, setmessage] = useState<IEndpointMessage>();
  const { getOne } = useDataProvider()("portal");

  const onClick = () => {
    getOne({
      resource: "endpoint/:ep_id/message",
      id,
      meta: { ep_id: epId, msg_id: msgId },
    }).then(({ data }) => {
      setmessage(data as any);
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

function parse(message?: IEndpointMessage): string {
  if (!message) return "{}";

  try {
    const obj = { ...message };
    if (obj.headers) obj.headers = JSON.parse(obj.headers);
    if (obj.metadata) obj.metadata = JSON.parse(obj.metadata);
    if (obj.body) obj.body = JSON.parse(obj.body);

    if (Array.isArray(obj.requests)) {
      const requests: any[] = [];
      for (let request of obj.requests) {
        if (request.headers) request.headers = JSON.parse(request.headers);
        if (request.metadata) request.metadata = JSON.parse(request.metadata);
        if (request.body) request.body = JSON.parse(request.body);
        requests.push(request);
      }
      obj.requests = requests;
    }

    if (Array.isArray(obj.responses)) {
      const responses: any[] = [];
      for (let response of obj.responses) {
        if (response.headers) response.headers = JSON.parse(response.headers);
        if (response.metadata)
          response.metadata = JSON.parse(response.metadata);
        if (response.body) response.body = JSON.parse(response.body);
        responses.push(response);
      }
      obj.responses = responses;
    }

    return JSON.stringify(obj, null, 2);
  } catch {
    return JSON.stringify(message, null, 2);
  }
}

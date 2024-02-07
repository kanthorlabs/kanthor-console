import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  UploadOutlined,
  InboxOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDataProvider, useNotification } from "@refinedev/core";
import { useModal } from "@refinedev/antd";
import { Button, Modal, Upload } from "antd";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { WorkspaceContext } from "../../../contexts/workspace";
import configs from "../../../configs";

const { Dragger } = Upload;

export const Import: React.FC<{ reload?: () => void }> = ({ reload }) => {
  const { selected } = useContext(WorkspaceContext);
  const [isLoading, setIsloading] = useState(false);
  const [id, setId] = useState("");
  const { show, close, modalProps } = useModal();
  const { custom, getApiUrl } = useDataProvider()("portal");
  const { open } = useNotification();

  const onClick = () => {
    setIsloading(false);
    setId(uuidv4());
    show();
  };

  const onAbortOrError = (event: ProgressEvent<FileReader>) => {
    open?.({
      type: "error",
      description: "Parse error",
      message:
        "The import file is not in correct format or is malform. Please check it before retry the import process",
      undoableTimeout: 3000,
    });
  };

  const onSuccess =
    (
      onSuccess?: (body: Object) => void,
      onError?: (event: Error, body?: Object) => void,
      onProgress?: (event: { percent: number }) => void
    ) =>
    (event: ProgressEvent<FileReader>) => {
      const url = new URL(getApiUrl());
      url.pathname += `/workspace/${selected?.id}/transfer`;

      if (!event.target?.result || !custom) return onAbortOrError(event);

      if (onProgress) onProgress({ percent: 30 });
      custom({
        url: url.toString(),
        method: "post",
        payload: { snapshot: JSON.parse(String(event.target.result)) },
      })
        .then((r) => {
          if (onProgress) onProgress({ percent: 60 });

          return new Promise<any>((resolve) =>
            setTimeout(() => resolve(r), 5000)
          );
        })
        .then(
          ({
            data,
          }: {
            data: { app_id: string[]; ep_id: string[]; epr_id: string[] };
          }) => {
            if (onProgress) onProgress({ percent: 90 });
            if (onSuccess) onSuccess(data);

            open?.({
              type: "success",
              description: "Import Successfully",
              message: `Imported ${data.app_id.length} applications, ${data.ep_id.length} endpoints, ${data.epr_id.length} endpoint rules.`,
              undoableTimeout: 3000,
            });
            if (reload) reload();
            close();
          }
        )
        .catch((err) => {
          if (onError) onError(err);
          if (onProgress) onProgress({ percent: 100 });
        })
        .finally(() => setIsloading(false));
    };

  const request = (option: UploadRequestOption) => {
    setIsloading(true);

    const reader = new FileReader();
    reader.onabort = onAbortOrError;
    reader.onerror = onAbortOrError;
    reader.onload = onSuccess(
      option.onSuccess,
      option.onError,
      option.onProgress
    );
    reader.readAsText(option.file as any);
  };

  if (!selected?.id || !custom) return <Button disabled>Import</Button>;
  return (
    <React.Fragment>
      <Button icon={<UploadOutlined />} onClick={onClick}>
        Import
      </Button>

      <Modal
        {...modalProps}
        title={"Import"}
        footer={false}
        closeIcon={<CloseOutlined />}
        maskClosable={false}
      >
        <Dragger
          key={id}
          name="snapshot"
          multiple={false}
          disabled={isLoading}
          showUploadList={{
            showRemoveIcon: false,
            showPreviewIcon: false,
            showDownloadIcon: false,
          }}
          customRequest={request}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag json file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Onpy support for a single json file. The data format must be
            followed by {configs.project.name} snapshot
          </p>
        </Dragger>
      </Modal>
    </React.Fragment>
  );
};

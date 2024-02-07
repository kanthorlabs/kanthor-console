import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { useDataProvider } from "@refinedev/core";
import { useModal } from "@refinedev/antd";
import { Button, Modal, Spin, Flex } from "antd";

import { WorkspaceContext } from "../../../contexts/workspace";

export const Export: React.FC = () => {
  const { selected } = useContext(WorkspaceContext);
  const [isLoading, setIsloading] = useState(false);
  const { show, close, modalProps } = useModal();
  const [snapshot, setSnaptshot] = useState<object>();
  const { custom, getApiUrl } = useDataProvider()("portal");
  const [id, setId] = useState("");

  useEffect(() => {
    if (!id) return;
    if (!selected?.id) return;
    if (!custom) return;

    const url = new URL(getApiUrl());
    url.pathname += `/workspace/${selected.id}/transfer`;

    custom({ url: url.toString(), method: "get" })
      .then(
        (r) => new Promise<any>((resolve) => setTimeout(() => resolve(r), 5000))
      )
      .then(({ data }) => setSnaptshot(data))
      .finally(() => setIsloading(false));
  }, [id, selected?.id]);

  const onClick = () => {
    setIsloading(true);
    setId(uuidv4());
    show();
  };

  if (!selected?.id || !custom) return <Button disabled>Export</Button>;
  return (
    <React.Fragment>
      <Button loading={isLoading} icon={<DownloadOutlined />} onClick={onClick}>
        Export
      </Button>

      <Modal
        {...modalProps}
        title={"Downloading"}
        footer={false}
        closeIcon={<CloseOutlined />}
        maskClosable={false}
      >
        <Flex align="center" justify="center">
          <Downloader
            isLoading={isLoading}
            name={`${selected.id}.json`}
            data={snapshot}
            close={close}
          />
        </Flex>
      </Modal>
    </React.Fragment>
  );
};

const Downloader: React.FC<{
  isLoading: boolean;
  name: string;
  data?: object;
  close?: () => void;
}> = ({ isLoading, name, data, close }) => {
  if (isLoading) return <Spin />;
  return (
    <a
      href={window.URL.createObjectURL(
        new Blob([JSON.stringify(data, null, 2)])
      )}
      download={name}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => {
        if (close) close();
      }}
    >
      <Button icon={<DownloadOutlined />}>Download</Button>
    </a>
  );
};

import React from "react";
import { UnlockOutlined } from "@ant-design/icons";
import * as constants from "@console/constants";
import { useApiUrl } from "@refinedev/core";
import httpc from "@console/utils/httpc";
import { Button, Modal, Typography } from "antd";
import { IEndpoint } from "@console/interfaces";

export const ViewSecretButton: React.FC<{ endpoint?: IEndpoint }> = ({
  endpoint,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [secret, setSecret] = React.useState("");
  const [error, setError] = React.useState<Error | undefined>();

  const apiUrl = useApiUrl(constants.PROVIDER_SDK);
  React.useEffect(() => {
    if (!endpoint?.id) return;

    httpc
      .get(`${apiUrl}/api/endpoint/${endpoint?.id}/secret`)
      .then((r) => {
        setSecret(r.data.secret_key);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
        setOpen(true);
      });
  }, [loading, endpoint?.id]);

  if (!endpoint) return null;

  return (
    <React.Fragment>
      <Button
        danger
        icon={<UnlockOutlined />}
        loading={loading}
        onClick={() => setLoading(true)}
      >
        View Secret
      </Button>
      <Modal
        title="Endpoint Secret"
        open={open}
        footer={false}
        onCancel={() => setOpen(false)}
      >
        {!!error && (
          <Typography.Text>Cannot obtain the secret key</Typography.Text>
        )}
        {!!secret && (
          <Typography.Paragraph code copyable>
            {secret}
          </Typography.Paragraph>
        )}
      </Modal>
    </React.Fragment>
  );
};

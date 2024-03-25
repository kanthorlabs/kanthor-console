import React, { Fragment, useContext, useState } from "react";
import { Button, Modal, Select, ButtonProps, Typography } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
import {
  useTranslate,
  useCan,
  useResource,
  AccessControlContext,
  useApiUrl,
  useCustomMutation,
  useInvalidate,
  useNotification,
} from "@refinedev/core";
import {
  RefineButtonClassNames,
  RefineButtonTestIds,
  RefineButtonCommonProps,
  RefineButtonResourceProps,
  RefineButtonSingleProps,
} from "@refinedev/ui-types";

const { Paragraph, Text, Title } = Typography;

export interface ExpireButton
  extends ButtonProps,
    RefineButtonCommonProps,
    RefineButtonResourceProps,
    RefineButtonSingleProps {
  children?: any;
}

export const ExpireButton: React.FC<ExpireButton> = ({
  resource: resourceNameFromProps,
  children,
  hideText = false,
  accessControl,
  recordItemId,
  ...rest
}) => {
  const [opened, setOpened] = useState(false);
  const [duration, setDuration] = useState(options()[0].value);

  const { resource } = useResource(resourceNameFromProps);

  const accessControlContext = useContext(AccessControlContext);

  const accessControlEnabled =
    accessControl?.enabled ??
    accessControlContext.options.buttons.enableAccessControl;

  const hideIfUnauthorized =
    accessControl?.hideIfUnauthorized ??
    accessControlContext.options.buttons.hideIfUnauthorized;

  const translate = useTranslate();

  const { data } = useCan({
    resource: resource?.name,
    action: "expire",
    params: { id: recordItemId, resource },
    queryOptions: {
      enabled: accessControlEnabled,
    },
  });

  const disabledTitle = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access"
      );
  };

  const apiUrl = useApiUrl();
  const invalidate = useInvalidate();
  const { mutate, isLoading } = useCustomMutation<{
    id: string;
    expired_at: number;
  }>();
  const { open } = useNotification();

  async function expire() {
    mutate(
      {
        url: `${apiUrl}/credentials/${recordItemId}/expiration`,
        method: "put",
        values: {
          duration: duration,
        },
      },
      {
        onSuccess() {
          invalidate({
            resource: resource?.name,
            invalidates: ["list"],
          });

          open?.({
            type: "success",
            description: "Expire a crendetials succesfully",
            message: `The credentials ${recordItemId} will be expired ${
              options().find((o) => o.value === duration)?.label
            }`,
            undoableTimeout: 3000,
          });

          setOpened(false);
        },
      }
    );
  }

  if (accessControlEnabled && hideIfUnauthorized && !data?.can) {
    return null;
  }

  return (
    <Fragment>
      <Button
        danger
        icon={<FieldTimeOutlined />}
        title={disabledTitle()}
        disabled={data?.can === false}
        data-testid={RefineButtonTestIds.EditButton}
        className={RefineButtonClassNames.EditButton}
        onClick={() => setOpened(true)}
        {...rest}
      >
        {!hideText && (children ?? translate("buttons.expire", "Expire"))}
      </Button>
      <Modal
        title="Expire Token?"
        open={opened}
        onOk={expire}
        confirmLoading={isLoading}
        onCancel={() => setOpened(false)}
      >
        <Typography>
          <Text strong>Are you sure you would like to expire this token?</Text>

          <Paragraph>
            Click{" "}
            <Text strong type="danger">
              Expire
            </Text>{" "}
            will invalidate the token at the requested expiration time. After
            the expiration time, every client using the old token will stop
            working.
          </Paragraph>
        </Typography>

        <Title level={5}>Expiration</Title>
        <Select
          style={{ width: "100%" }}
          title="Expiration"
          defaultValue={duration}
          onChange={(value) => setDuration(value)}
          options={options()}
        />
      </Modal>
    </Fragment>
  );
};

function options(): Array<{ label: string; value: number }> {
  return [
    {
      label: "in 30 minutes",
      value: 0.5 * 3600 * 1000,
    },
    {
      label: "in 1 hour",
      value: 1 * 3600 * 1000,
    },
    {
      label: "in 6 hours",
      value: 6 * 3600 * 1000,
    },
    {
      label: "in 12 hours",
      value: 12 * 3600 * 1000,
    },
    {
      label: "in 24 hours",
      value: 24 * 3600 * 1000,
    },
  ];
}

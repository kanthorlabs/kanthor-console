import React from "react";
import {
  IResourceComponentsProps,
  useNavigation,
  useResource,
} from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Modal, Typography, Alert } from "antd";
import dayjs from "dayjs";

const { Paragraph } = Typography;

export const WorkspaceCredentialCreate: React.FC<
  IResourceComponentsProps
> = ({}) => {
  const navigate = useNavigation();
  const { resource } = useResource();
  const [credentials, setCrendetials] = React.useState<any>(null);

  const { formProps, saveButtonProps, onFinish } = useForm({
    redirect: false,
    successNotification: false,
    onMutationSuccess: (data) => {
      setCrendetials(data.data);
    },
  });

  if (!!credentials) {
    const token = `${credentials.user}:${credentials.password}`;
    return (
      <Modal
        title="Credentials"
        open={!!credentials}
        onOk={() => navigate.list(resource as any)}
        cancelText={null}
      >
        <Typography>
          <Alert
            message="You will not be able to reveal this key again, so please make sure to take note of it now."
            type="warning"
            showIcon
          />

          <pre>
            <Paragraph code copyable={{ text: token }}>
              {token}
            </Paragraph>
          </pre>
        </Typography>
      </Modal>
    );
  }

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        onFinish={(values: any) => {
          onFinish({
            ...values,
            expired_at: Number((values.expired_at as dayjs.Dayjs).toDate()),
          });
        }}
        layout="vertical"
        initialValues={{
          expired_at: dayjs().add(1, "year"),
        }}
      >
        <Form.Item
          label={"Name"}
          name={"name"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Expire At"}
          name="expired_at"
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => {
            return {
              value: value ? dayjs(value) : undefined,
            };
          }}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss ZZ"
            disabledDate={(d) => d.isBefore(new Date())}
            disabledTime={() => {
              return {
                disabledHours: () => range(0, new Date().getHours() + 1),
                disabledMinutes: () => [],
                disabledSeconds: () => [],
              };
            }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};

function range(start: number, end: number) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

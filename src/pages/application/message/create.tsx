import React from "react";
import { IResourceComponentsProps, useGetIdentity } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { IAccount, IMessage } from "../../../interfaces";
import { useApp } from "../../../hooks/application";

type MessageCreateProps = {
  appId: string;
  title: string;
  onDone: () => void;
};

export const MessageCreate: React.FC<
  IResourceComponentsProps & MessageCreateProps
> = ({ appId, title, onDone }) => {
  const { formProps, saveButtonProps, onFinish } = useForm({
    resource: "message",
    dataProviderName: "sdk",
    redirect: false,
  });
  const { isLoading, app } = useApp(appId);
  const { data: user } = useGetIdentity<IAccount>();

  return (
    <Create
      saveButtonProps={{
        ...saveButtonProps,
        children: "Test",
        icon: <CloudUploadOutlined />,
      }}
      isLoading={isLoading}
      breadcrumb={false}
      goBack={false}
      title={title}
    >
      <Form
        {...formProps}
        onFinish={async (values: any) => {
          await onFinish({
            ...values,
            app_id: app?.id,
            metadata: JSON.parse(values.metadata),
            headers: JSON.parse(values.headers),
            body: JSON.parse(values.body),
          });

          onDone();
        }}
        layout="vertical"
        initialValues={
          {
            type: "console.testing",
            metadata: JSON.stringify({ "x-user-id": user?.sub }),
            headers: JSON.stringify({
              "x-kanthor-source": "console",
              "x-request-id": uuidv4(),
            }),
            body: JSON.stringify({ source: "console" }),
          } as Partial<IMessage>
        }
      >
        <Form.Item label={"Application"}>
          <Input disabled value={app?.name} />
        </Form.Item>

        <Form.Item
          label={"Type"}
          name={"type"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Metadata"}
          name={"metadata"}
          rules={[
            {
              required: true,
            },
            {
              validator(_, value) {
                try {
                  return Promise.resolve(JSON.parse(value));
                } catch (err: any) {
                  return Promise.reject(
                    new Error(`Malformed json object - error:${err.message}`)
                  );
                }
              },
            },
          ]}
        >
          <Input.TextArea showCount rows={3} />
        </Form.Item>
        <Form.Item
          label={"Headers"}
          name={"headers"}
          rules={[
            {
              required: true,
            },
            {
              validator(_, value) {
                try {
                  return Promise.resolve(JSON.parse(value));
                } catch (err: any) {
                  return Promise.reject(
                    new Error(`Malformed json object - error:${err.message}`)
                  );
                }
              },
            },
          ]}
        >
          <Input.TextArea showCount rows={3} />
        </Form.Item>
        <Form.Item
          label={"Body"}
          name={"body"}
          rules={[
            {
              required: true,
            },
            {
              validator(_, value) {
                try {
                  return Promise.resolve(JSON.parse(value));
                } catch (err: any) {
                  return Promise.reject(
                    new Error(`Malformed json object - error:${err.message}`)
                  );
                }
              },
            },
          ]}
        >
          <Input.TextArea showCount rows={3} />
        </Form.Item>
      </Form>
    </Create>
  );
};

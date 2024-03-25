import React from "react";
import { IResourceComponentsProps, useNavigation } from "@refinedev/core";
import { Create as CoreCreate, useForm } from "@refinedev/antd";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import * as constants from "@console/constants";
import { ICredentials } from "@console/interfaces";

export const Create: React.FC<IResourceComponentsProps> = ({}) => {
  const { showUrl } = useNavigation();
  const navigate = useNavigate();

  const { formProps, saveButtonProps } = useForm({
    redirect: false,
    onMutationSuccess(data) {
      const url = showUrl(constants.RESOURCE_CREDS, data.data.username);
      navigate(url, { state: { credentials: data.data } });
    },
  });

  return (
    <React.Fragment>
      <CoreCreate saveButtonProps={saveButtonProps}>
        <Form
          {...formProps}
          layout="vertical"
          initialValues={
            {
              name: `Created at ${new Date().toLocaleString()}`,
            } as Partial<ICredentials>
          }
        >
          <Form.Item label={"Name"} name={"name"} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </CoreCreate>
    </React.Fragment>
  );
};

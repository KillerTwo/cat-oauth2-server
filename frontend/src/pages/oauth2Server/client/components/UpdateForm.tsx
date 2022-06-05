import React from 'react';
import { ProFormText, ModalForm, ProFormTextArea, ProFormCheckbox } from '@ant-design/pro-form';

export type FormValueType = Partial<oauth2Server.Oauth2RegisteredClient>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<oauth2Server.Oauth2RegisteredClient>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm
      modalProps={{ destroyOnClose: true }}
      title={'修改客户端'}
      width="70%"
      visible={props.updateModalVisible}
      onVisibleChange={props.onCancel}
      onFinish={props.onSubmit}
    >
      <ProFormText
        initialValue={props.values.clientId}
        width="md"
        name="clientId"
        label="客户端ID"
      />
      <ProFormText
        initialValue={props.values.clientSecret}
        width="md"
        name="clientSecret"
        label="客户端秘钥"
      />
      <ProFormText
        initialValue={props.values.clientName}
        width="md"
        name="clientName"
        label="客户端名称"
      />
      <ProFormCheckbox.Group
        initialValue={props.values.authorizationGrantTypes}
        width="md"
        name="authorizationGrantTypes"
        layout="vertical"
        label="客户端授权类型"
        options={['authorization_code', 'refresh_token', 'client_credentials']}
      />
      <ProFormTextArea
        initialValue={props.values.redirectUris}
        width="md"
        name="redirectUris"
        label="重定向地址"
        placeholder="请输入重定向地址"
      />
      <ProFormCheckbox.Group
        initialValue={props.values.scopes}
        width="md"
        name="scopes"
        layout="vertical"
        label="授权范围"
        options={['read', 'wirter']}
      />
    </ModalForm>
  );
};

export default UpdateForm;

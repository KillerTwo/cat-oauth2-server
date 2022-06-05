import React, { useState, useEffect } from 'react';
import { message, Table, Drawer, Space, Popconfirm, Form, Input, Button, Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {
  listClient,
  getClient,
  addClient,
  updateClient,
  removeClient,
} from '@/services/oauth2Server/Oauth2RegisteredClient';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';

/**
 * @zh-CN 查看详情
 */
const handleDetail = async (id: any) => {
  try {
    const resData = await getClient(id);
    return resData.data;
  } catch (error) {
    message.error('Adding failed, please try again!');
    return null;
  }
};

/**
 * @zh-CN 添加
 */
const handleAdd = async (fields: oauth2Server.Oauth2RegisteredClient) => {
  const hide = message.loading('正在添加');
  try {
    await addClient({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @zh-CN 更新
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('更新中');
  try {
    await updateClient({
      ...fields,
    });
    hide();

    message.success('更新成功！');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败，请稍后重试!');
    return false;
  }
};

/**
 * @zh-CN 删除
 */
const handleRemove = async (ids: any[]) => {
  const hide = message.loading('正在删除');
  if (!ids) return true;
  try {
    await removeClient(ids);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败, 请稍后重试');
    return false;
  }
};

const Oauth2RegisteredClientList: React.FC = () => {
  /**
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState<oauth2Server.Oauth2RegisteredClient>();
  const [data, setData] = useState<oauth2Server.Oauth2RegisteredClient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRequestListClient = (params?: oauth2Server.Oauth2RegisteredClient | {}) => {
    setLoading(true);
    listClient({ ...params }).then((res: oauth2Server.ResponseResult) => {
      setLoading(false);
      setData(res.data);
    });
  };

  const columns: ColumnsType<oauth2Server.Oauth2RegisteredClient> = [
    {
      title: '客户端ID',
      dataIndex: 'clientId',
      key: 'clientId',
      width: '200',
      ellipsis: true,
    },
    {
      title: '客户端秘钥',
      dataIndex: 'clientSecret',
      key: 'clientSecret',
      width: '200',
      ellipsis: { showTitle: true },
    },
    {
      title: '客户端名称',
      dataIndex: 'clientName',
      key: 'clientName',
      ellipsis: true,
    },
    {
      title: '客户端授权类型',
      dataIndex: 'authorizationGrantTypes',
      key: 'authorizationGrantTypes',
      ellipsis: true,
      render: (text, record, index) => {
        return record.authorizationGrantTypes?.join(',');
      },
    },
    {
      title: '重定向地址',
      dataIndex: 'redirectUris',
      key: 'redirectUris',
      ellipsis: true,
    },
    {
      title: 'scopes',
      dataIndex: 'scopes',
      key: 'scopes',
      ellipsis: true,
      render: (text, record, index) => {
        return record.scopes?.join(',');
      },
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (text: any, record: oauth2Server.Oauth2RegisteredClient) => (
        <Space size="middle">
          <a
            onClick={() => {
              setCurrentRow(record);
              handleUpdateModalVisible(true);
            }}
          >
            <EditOutlined />
            修改
          </a>
          {/* <a
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined />
            新增
          </a> */}
          <Popconfirm
            title="确定要删除Client?"
            onConfirm={async () => {
              const result = await handleRemove([record]);
              if (result) {
                handleRequestListClient({});
              }
            }}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <a>
              <DeleteOutlined />
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleRequestListClient({});
  }, []);

  const [form] = Form.useForm();

  return (
    <PageContainer>
      <>
        <Card bordered={false} style={{ width: '100%', marginBottom: 20 }}>
          <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={(values: any) => {
              handleRequestListClient({ ...values });
            }}
          >
            <Form.Item name="clientId" label="客户端ID">
              <Input placeholder="客户端ID" />
            </Form.Item>
            <Form.Item name="clientSecret" label="客户端秘钥">
              <Input placeholder="客户端秘钥" />
            </Form.Item>
            <Form.Item name="clientName" label="客户端名称">
              <Input placeholder="客户端名称" />
            </Form.Item>
            <Form.Item shouldUpdate>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Form.Item>
            <Form.Item shouldUpdate>
              <Button
                type="primary"
                htmlType="button"
                onClick={() => {
                  form.resetFields();
                  handleRequestListClient({});
                }}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Button
          type="primary"
          htmlType="button"
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          <PlusOutlined />
          新增
        </Button>
        <Table
          rowKey="clientId"
          columns={columns}
          dataSource={data}
          pagination={false}
          loading={loading}
          tableLayout={'fixed'}
        />

        <ModalForm
          modalProps={{ destroyOnClose: true }}
          title="添加客户端"
          width="70%"
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (value) => {
            const success = await handleAdd({ ...value } as oauth2Server.Oauth2RegisteredClient);
            if (success) {
              handleModalVisible(false);
              handleRequestListClient({});
            }
          }}
        >
          <ProFormText width="md" name="clientId" label="客户端ID" />
          <ProFormText width="md" name="clientSecret" label="客户端秘钥" />
          <ProFormText width="md" name="clientName" label="客户端名称" />
          <ProFormCheckbox.Group
            width="md"
            name="authorizationGrantTypes"
            layout="vertical"
            label="客户端授权类型"
            options={['authorization_code', 'refresh_token', 'client_credentials']}
          />
          <ProFormText
            width="md"
            name="redirectUris"
            label="重定向地址"
            placeholder="请输入重定向地址"
          />
          <ProFormCheckbox.Group
            width="md"
            name="scopes"
            layout="vertical"
            label="授权范围"
            options={['read', 'wirter']}
          />
        </ModalForm>
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate({ ...currentRow, ...value });
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              handleRequestListClient({});
            }
          }}
          onCancel={(value: boolean | undefined) => {
            if (!value) {
              handleUpdateModalVisible(false);
              if (!showDetail) {
                setCurrentRow(undefined);
              }
            }
          }}
          updateModalVisible={updateModalVisible}
          values={currentRow || {}}
        />

        <Drawer
          width={600}
          visible={showDetail}
          onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
          }}
          closable={false}
        >
          {currentRow?.clientId && (
            <ProDescriptions<oauth2Server.Oauth2RegisteredClient>
              column={2}
              title={currentRow?.id}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.id,
              }}
              columns={columns as ProDescriptionsItemProps<oauth2Server.Oauth2RegisteredClient>[]}
            />
          )}
        </Drawer>
      </>
    </PageContainer>
  );
};

export default Oauth2RegisteredClientList;

import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, Select, Upload, message, Avatar } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { addNotificationAccount, getNotificationAccounts, deleteNotificationAccount, updateNotificationAccount } from '@/services/ant-design-pro/api';
import { uploadGenericFile } from '@/utils/fileUpload';

const { Option } = Select;

interface NotificationAccount {
  id: string;
  userID: string;
  nickName: string;
  faceURL: string;
  appMangerLevel: number;
  createTime?: string;
  updateTime?: string;
}

const AccountList: React.FC = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [editingRecord, setEditingRecord] = useState<NotificationAccount | null>(null);
  const actionRef = useRef<ActionType>(null);

  // 表格列配置
  const columns: ProColumns<NotificationAccount>[] = [
    {
      title: '用户头像',
      dataIndex: 'faceURL',
      hideInSearch: true,
      width: 100,
      render: (_, record) => (
        <Avatar
          size={40}
          src={record.faceURL}
          icon={!record.faceURL && <span>头像</span>}
        />
      ),
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '用户ID',
      dataIndex: 'userID',
      hideInSearch: true,
      copyable: true,
      ellipsis: true,
    },
    {
      title: '用户类型',
      dataIndex: 'appMangerLevel',
      hideInSearch: true,
      width: 120,
      render: (_, record) => {
        const typeMap = {
          3: { text: '系统账号', color: 'blue' },
          4: { text: '机器人', color: 'green' },
        };
        const type = typeMap[record.appMangerLevel as keyof typeof typeMap];
        return (
          <span style={{ color: type?.color || '#666' }}>
            {type?.text || '未知'}
          </span>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      width: 180,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          size="small"
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Button
          key="delete"
          type="link"
          size="small"
          danger
          onClick={() => handleDelete(record.id)}
        >
          删除
        </Button>,
      ],
    },
  ];

  // 获取通知账号列表
  const fetchNotificationAccounts = async (params: any) => {
    try {
      const response = await getNotificationAccounts({
        pagination: {
          pageNumber: params.current || 1,
          showNumber: params.pageSize || 10,
        },
      });
      
      return {
        data: response.data?.accounts || [],
        success: true,
        total: response.data?.total || 0,
      };
    } catch (error) {
      console.error('获取通知账号列表失败:', error);
      return {
        data: [],
        success: false,
        total: 0,
      };
    }
  };

  // 处理新增
  const handleAdd = () => {
    form.resetFields();
    setAvatarUrl('');
    setEditingRecord(null);
    setModalVisible(true);
  };

  // 处理编辑
  const handleEdit = (record: NotificationAccount) => {
    form.setFieldsValue({
      userID: record.userID,
      nickName: record.nickName,
      appMangerLevel: record.appMangerLevel,
    });
    setAvatarUrl(record.faceURL);
    setEditingRecord(record);
    setModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个通知账号吗？',
      onOk: async () => {
        try {
          await deleteNotificationAccount({ id });
          message.success('删除成功');
          actionRef.current?.reload();
        } catch (error) {
          console.error('删除失败:', error);
          message.error('删除失败');
        }
      },
    });
  };

  // 处理头像上传
  const handleAvatarUpload = async (file: File) => {
    try {
      console.log('开始上传头像:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        message.error('只能上传图片文件');
        return false;
      }
      
      // 验证文件大小 (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        message.error('图片大小不能超过5MB');
        return false;
      }
      
      setLoading(true);
      // 使用通用文件上传，不更新账户信息
      const result = await uploadGenericFile(file, `notification/${file.name}`);
      console.log('上传结果:', result);
      
      if (result.success) {
        setAvatarUrl(result.url);
        message.success('头像上传成功');
      } else {
        throw new Error(result.error || '上传失败');
      }
      
      return false; // 阻止默认上传行为
    } catch (error) {
      console.error('头像上传失败:', error);
      message.error(`头像上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (!avatarUrl) {
        message.error('请上传用户头像');
        return;
      }

      setLoading(true);
      
      const requestData = {
        userID: values.userID,
        nickName: values.nickName,
        faceURL: avatarUrl,
        appMangerLevel: values.appMangerLevel,
      };

      if (editingRecord) {
        // 编辑模式
        await updateNotificationAccount({
          id: editingRecord.id,
          ...requestData,
        });
        message.success('更新成功');
      } else {
        // 新增模式
        await addNotificationAccount(requestData);
        message.success('添加成功');
      }
      
      setModalVisible(false);
      actionRef.current?.reload();
    } catch (error) {
      console.error('提交失败:', error);
      message.error('操作失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer
      header={{
        title: '通知账号',
        breadcrumb: {
          items: [
            { title: 'IM 系统' },
            { title: '通知管理' },
            { title: '通知账号' },
          ],
        },
      }}
    >
      <ProTable<NotificationAccount>
        headerTitle="通知账号列表"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={fetchNotificationAccounts}
        columns={columns}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingRecord ? '编辑通知账号' : '新增通知账号'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
        confirmLoading={loading}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            appMangerLevel: 3,
          }}
        >
          <Form.Item label="用户头像" required>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Avatar
                size={80}
                src={avatarUrl}
                icon={!avatarUrl && <span>头像</span>}
              />
              <Upload
                beforeUpload={handleAvatarUpload}
                showUploadList={false}
                accept="image/*"
                multiple={false}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />} loading={loading}>
                  上传头像
                </Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item
            name="userID"
            label="用户ID"
            rules={[
              { required: true, message: '请输入用户ID' },
              { min: 1, max: 50, message: '用户ID长度为1-50个字符' },
            ]}
          >
            <Input placeholder="请输入用户ID" />
          </Form.Item>

          <Form.Item
            name="nickName"
            label="用户昵称"
            rules={[
              { required: true, message: '请输入用户昵称' },
              { min: 1, max: 50, message: '用户昵称长度为1-50个字符' },
            ]}
          >
            <Input placeholder="请输入用户昵称" />
          </Form.Item>

          <Form.Item
            name="appMangerLevel"
            label="用户类型"
            rules={[{ required: true, message: '请选择用户类型' }]}
          >
            <Select placeholder="请选择用户类型">
              <Option value={3}>系统账号</Option>
              <Option value={4}>机器人</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default AccountList;

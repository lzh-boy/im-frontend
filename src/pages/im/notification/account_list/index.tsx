import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const AccountList: React.FC = () => {
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
      <div>通知账号页面</div>
    </PageContainer>
  );
};

export default AccountList;

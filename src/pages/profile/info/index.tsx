import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const ProfileInfo: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: '个人信息',
        breadcrumb: {
          items: [
            { title: '账号设置' },
            { title: '个人信息' },
          ],
        },
      }}
    >
      <div>个人信息页面</div>
    </PageContainer>
  );
};

export default ProfileInfo;

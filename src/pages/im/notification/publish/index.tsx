import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const Publish: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: '发送通知',
        breadcrumb: {
          items: [
            { title: 'IM 系统' },
            { title: '通知管理' },
            { title: '发送通知' },
          ],
        },
      }}
    >
      <div>发送通知页面</div>
    </PageContainer>
  );
};

export default Publish;

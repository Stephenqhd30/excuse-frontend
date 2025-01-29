import React from 'react';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { listMyPictureVoByPageUsingPost } from '@/services/excuse-backend/pictureController';
import { PictureCard } from '@/components';
import { ACCOUNT_TITLE } from '@/constants';

/**
 * 团队空间页面
 * @constructor
 */
const TeamSpacePage: React.FC = () => {
  return (
    <PageContainer title={ACCOUNT_TITLE} breadcrumb={undefined}>
      <ProList
        pagination={{
          defaultPageSize: 12,
          responsive: true,
        }}
        rowKey={'id'}
        grid={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        request={async (params, sort, filter) => {
          const sortField = 'updateTime';
          const sortOrder = 'descend';
          const { data, code } = await listMyPictureVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.PictureQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        renderItem={(item) => <PictureCard key={item.id} picture={item} />}
      />
    </PageContainer>
  );
};

export default TeamSpacePage;

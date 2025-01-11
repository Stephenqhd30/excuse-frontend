import { ProList } from '@ant-design/pro-components';
import React from 'react';
import { listPictureVoByPageUsingPost } from '@/services/excuse-backend/pictureController';
import { PictureCard } from '@/components';


/**
 * 主页
 *
 * @constructor
 */
const Welcome: React.FC = () => {
  return (
    <>
      <ProList
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
          responsive: true,
        }}
        rowKey={'id'}
        grid={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 4,
        }}
        request={async (params, sort, filter) => {
          const sortField = 'updateTime';
          const sortOrder = 'descend';
          const { data, code } = await listPictureVoByPageUsingPost({
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
    </>
  );
};

export default Welcome;

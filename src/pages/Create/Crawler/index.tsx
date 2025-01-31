import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import Search from 'antd/es/input/Search';
import { uploadPictureByBatchUsingPost } from '@/services/excuse-backend/pictureController';
import { message } from 'antd';

/**
 * 爬取图片
 * @constructor
 */
const CrawlerPicturePage: React.FC = () => {
  // 搜索参数状态
  const [searchParams, setSearchParams] = useState<API.PictureUploadByBatchRequest>({
    searchText: '',
    count: 10,
  });

  /**
   * 爬取图片
   */
  const doSearch = async () => {
    const hide = message.loading('爬取中...');
    try {
      const res = await uploadPictureByBatchUsingPost({
        ...searchParams,
      });
      if (res.code === 0 && res.data) {
        message.success('爬取成功');
      } else {
        message.error('爬取失败');
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      hide();
    }
  };

  return (
    <PageContainer title={false} breadcrumb={undefined}>
      <Search
        size={'large'}
        defaultValue={searchParams.searchText}
        style={{ marginBottom: 16 }}
        placeholder="请输入关键词"
        onSearch={async (value) => {
          setSearchParams({ ...searchParams, searchText: value });
          await doSearch();
        }}
        enterButton
      />
    </PageContainer>
  );
};

export default CrawlerPicturePage;

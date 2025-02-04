import { ActionType, PageContainer, ProList } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { history, useLocation } from '@umijs/max';
import Search from 'antd/es/input/Search';
import { listPictureVoByPageUsingPost } from '@/services/excuse-backend/pictureController';
import {PictureCard} from '@/components';

/**
 * 搜索结果页
 * @constructor
 */
const SearchPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useState<API.PictureQueryRequest>({
    searchText: params.get('searchText') || '',
    current: 1,
    pageSize: 10,
  });

  // 通用更新搜索参数的函数，同时同步到 URL
  const handleSearchParamsChange = (newParams: Partial<API.PictureQueryRequest>) => {
    // 更新状态
    const updatedParams = { ...searchParams, ...newParams };
    setSearchParams(updatedParams);
    // 构建完整的查询参数字符串
    const queryString = new URLSearchParams({
      searchText: updatedParams.searchText || '',
      current: updatedParams.current?.toString() || '1',
      pageSize: updatedParams.pageSize?.toString() || '10',
    }).toString();
    // 更新 URL
    history.push(`/search?${queryString}`);
    // 触发列表刷新
    actionRef.current?.reload();
  };
  // 当 URL 参数变化时，刷新状态
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchParams({
      searchText: params.get('searchText') || '',
      current: Number(params.get('current')) || 1,
      pageSize: Number(params.get('pageSize')) || 10,
    });
  }, [location.search || undefined]);

  return (
    <PageContainer breadcrumb={undefined} title={false}>
      <div
        style={{
          margin: '0 auto',
          maxWidth: '800px',
        }}
      >
        <Search
          size={'large'}
          defaultValue={searchParams.searchText}
          style={{ marginBottom: 16 }}
          placeholder="请输入关键词"
          onSearch={(searchText) => handleSearchParamsChange({ searchText, current: 1 })}
          enterButton
        />
      </div>
      <ProList
        onChange={() => {
          actionRef.current?.reload();
        }}
        pagination={{
          pageSize: 10,
          responsive: true,
          current: searchParams.current,
          onChange: (page) => setSearchParams((prev) => ({ ...prev, current: page })),
        }}
        actionRef={actionRef}
        itemLayout="vertical"
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
          const sortOrder = sort?.[sortField] ?? 'descend';
          const { data, code } = await listPictureVoByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
            ...searchParams,
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

export default SearchPage;

import React, { useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Select, Space, Tag, Typography } from 'antd';
import { listPictureByPageUsingPost } from '@/services/excuse-backend/pictureController';
import { ReviewStatus, reviewStatusEnum } from '@/enums/ReviewStatusEnum';
import { BatchReviewModal, ReviewModal } from '@/pages/Review/Picture/components';
import { TAG_EMPTY } from '@/constants';
import { PictureModal } from '@/components';

/**
 * 图片审核页面
 * @constructor
 */
const PictureReviewPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // 图片信息 Modal 框
  const [pictureModal, setPictureModal] = useState<boolean>(false);
  // 审核信息 Modal 框
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  // 批量审核信息 Modal 框
  const [batchReviewModal, setBatchReviewModal] = useState<boolean>(false);
  // 当前行数据
  const [currentRow, setCurrentRow] = useState<API.Picture>({});
  // 选中行数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  /**
   * 表格列数据
   */
  const columns: ProColumns<API.Picture>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '图片',
      dataIndex: 'url',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: '图片名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '图片分类',
      dataIndex: 'category',
      valueType: 'text',
    },
    {
      title: '图片介绍',
      dataIndex: 'introduction',
      valueType: 'textarea',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      valueType: 'text',
      render: (_, record) => {
        if (record.tags) {
          const tagList = JSON.parse(record.tags as string);
          return tagList.map((tag) => (
            <Tag key={tag} color={'blue'}>
              {tag}
            </Tag>
          ));
        }
        return <Tag>{TAG_EMPTY}</Tag>;
      },
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueType: 'select',
      valueEnum: reviewStatusEnum,
      renderFormItem: () => {
        return (
          <Select>
            <Select.Option value={ReviewStatus.REVIEWING}>
              {reviewStatusEnum[ReviewStatus.REVIEWING].text}
            </Select.Option>
            <Select.Option value={ReviewStatus.PASS}>
              {reviewStatusEnum[ReviewStatus.PASS].text}
            </Select.Option>
            <Select.Option value={ReviewStatus.REJECT}>
              {reviewStatusEnum[ReviewStatus.REJECT].text}
            </Select.Option>
          </Select>
        );
      },
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      valueType: 'textarea',
    },
    {
      title: '审核时间',
      dataIndex: 'reviewTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key={'picture'}
            onClick={async () => {
              setPictureModal(true);
              setCurrentRow(record);
            }}
          >
            查看图片信息
          </Typography.Link>
          <Typography.Link
            key={'review'}
            onClick={async () => {
              setReviewModal(true);
              setCurrentRow(record);
            }}
          >
            审核信息
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.Picture, API.PageParams>
        headerTitle={'图片审核'}
        rowKey={'id'}
        actionRef={actionRef}
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listPictureByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
            notId: ReviewStatus.PASS
          } as API.PictureQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        tableAlertOptionRender={() => {
          return (
            <Space>
              <Button
                type="primary"
                onClick={async () => {
                  setBatchReviewModal(true);
                  actionRef.current?.reload();
                }}
              >
                批量审核
              </Button>
            </Space>
          );
        }}
      />
      {/*图片信息*/}
      {pictureModal && (
        <PictureModal
          visible={pictureModal}
          onCancel={() => setPictureModal(false)}
          onSubmit={() => {
            setPictureModal(false);
            actionRef.current?.reload();
          }}
          picture={currentRow ?? {}}
        />
      )}
      {/*审核*/}
      {reviewModal && (
        <ReviewModal
          visible={reviewModal}
          onCancel={() => setReviewModal(false)}
          picture={currentRow ?? {}}
          onSubmit={async () => {
            setReviewModal(false);
            actionRef.current?.reload();
          }}
        />
      )}
      {/*批量审核*/}
      {batchReviewModal && (
        <BatchReviewModal
          visible={batchReviewModal}
          onCancel={() => setBatchReviewModal(false)}
          selectedRowKeys={selectedRowKeys ?? []}
          columns={columns}
          onSubmit={async () => {
            setReviewModal(false);
            setSelectedRowKeys([]);
            actionRef.current?.reload();
          }}
        />
      )}
    </>
  );
};

export default PictureReviewPage;

import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {
  deleteSpaceUsingPost,
  listSpaceByPageUsingPost,
} from '@/services/excuse-backend/spaceController';
import { CreateSpaceModal, UpdateSpaceModal } from '@/pages/Admin/SpaceList/components';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    const res = await deleteSpaceUsingPost({
      id: row.id,
    });
    if (res.code === 0 && res.data) {
      message.success('删除成功');
    } else {
      message.error(`删除失败${res.message}, 请重试!`);
    }
  } catch (error: any) {
    message.error(`删除失败${error.message}, 请重试!`);
  } finally {
    hide();
  }
};

/**
 * 空间管理列表
 *
 * @constructor
 */
const SpaceList: React.FC = () => {
  // 新建窗口的Modal框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 更新窗口的Modal框
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前标签的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.Space>();

  /**
   * 表格列数据
   */
  const columns: ProColumns<API.Space>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '空间名称',
      dataIndex: 'spaceName',
      valueType: 'text',
    },

    {
      title: '空间等级',
      dataIndex: 'spaceLevel',
      valueType: 'text',
    },
    {
      title: '总数',
      dataIndex: 'totalCount',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '总大小',
      dataIndex: 'totalSize',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '总数',
      dataIndex: 'totalCount',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '最大数',
      dataIndex: 'maxCount',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '最大大小',
      dataIndex: 'maxSize',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '创建人id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '编辑时间',
      sorter: true,
      dataIndex: 'editTime',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key="update"
            onClick={() => {
              setUpdateModalVisible(true);
              setCurrentRow(record);
              actionRef.current?.reload();
            }}
          >
            修改
          </Typography.Link>
          {/*删除表单标签的PopConfirm框*/}
          <Popconfirm
            title="确定删除？"
            description="删除后将无法恢复?"
            okText="确定"
            cancelText="取消"
            onConfirm={async () => {
              await handleDelete(record);
              actionRef.current?.reload();
            }}
          >
            <Typography.Link
              key={'delete'}
              type={'danger'}
              onClick={() => {
                setCurrentRow(record);
              }}
            >
              删除
            </Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.SpaceVO, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCreateModalVisible(true);
            }}
            icon={<PlusOutlined />}
          >
            新建
          </Button>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
          const { data, code } = await listSpaceByPageUsingPost({
            ...params,
            ...filter,
            sortField,
            sortOrder,
          } as API.SpaceQueryRequest);

          return {
            success: code === 0,
            data: data?.records || [],
            total: data?.total || 0,
          };
        }}
        columns={columns}
      />

      {/*新建表单的Modal框*/}
      {createModalVisible && (
        <CreateSpaceModal
          onCancel={() => {
            setCreateModalVisible(false);
          }}
          onSubmit={async () => {
            setCreateModalVisible(false);
            actionRef.current?.reload();
          }}
          visible={createModalVisible}
          columns={columns}
        />
      )}
      {/*更新表单的Modal框*/}
      {updateModalVisible && (
        <UpdateSpaceModal
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
          onSubmit={async () => {
            setUpdateModalVisible(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }}
          visible={updateModalVisible}
          columns={columns}
          oldData={currentRow}
        />
      )}
    </>
  );
};
export default SpaceList;

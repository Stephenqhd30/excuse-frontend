import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';
import {
  deletePictureUsingPost,
  listPictureVoByPageUsingPost,
} from '@/services/excuse-backend/pictureController';
import { CreatePictureModal, UpdatePictureModal } from '@/pages/Admin/PictureList/components';
import { TAG_EMPTY } from '@/constants';

/**
 * 删除节点
 *
 * @param row
 */
const handleDelete = async (row: API.DeleteRequest) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    const res = await deletePictureUsingPost({
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
 * 图片管理列表
 * @constructor
 */
const PictureList: React.FC = () => {
  // 新建窗口的Modal框
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 更新窗口的Modal框
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前图片的所点击的数据
  const [currentRow, setCurrentRow] = useState<API.Picture>();

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
      title: '用户标签',
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
      title: '图片格式',
      dataIndex: "picFormat",
      valueType: 'text',
    },
    {
      title: '图片宽度',
      dataIndex: "picWidth",
      valueType: 'text',
    },
    {
      title: '图片高度',
      dataIndex: "picHeight",
      valueType: 'text',
    },
    {
      title: '图片宽高比',
      dataIndex: "picScale",
      valueType: 'text',
    },
    {
      title: '大小',
      dataIndex: "picSize",
      valueType: 'text',
      render: (_, record) => {
        return (
          <div>
           {/*@ts-ignore*/}
            {(record?.picSize / 1024).toFixed(2)}KB
          </div>
        )
      }
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      valueType: 'text',
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
          {/*删除表单图片的PopConfirm框*/}
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
      <ProTable<API.Picture, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey={'id'}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Space key={'space'} wrap>
            <Button
              key="create"
              icon={<PlusOutlined />}
              type={'primary'}
              onClick={() => {
                setCreateModalVisible(true);
              }}
            >
              新建
            </Button>
          </Space>,
        ]}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;
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
        columns={columns}
      />

      {/*新建表单的Modal框*/}
      {createModalVisible && (
        <CreatePictureModal
          onCancel={() => {
            setCreateModalVisible(false);
          }}
          onSubmit={async () => {
            setCreateModalVisible(false);
            actionRef.current?.reload();
          }}
          visible={createModalVisible}
        />
      )}
      {/*更新表单的Modal框*/}
      {updateModalVisible && (
        <UpdatePictureModal
          onCancel={() => {
            setUpdateModalVisible(false);
          }}
          onSubmit={async () => {
            setUpdateModalVisible(false);
            setCurrentRow(undefined);
            actionRef.current?.reload();
          }}
          visible={updateModalVisible}
          oldData={currentRow}
        />
      )}
    </>
  );
};
export default PictureList;

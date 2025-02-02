import { Tag } from 'antd';
import { TAG_EMPTY } from '@/constants';
import { ProCard, ProDescriptions, ProDescriptionsActionType } from '@ant-design/pro-components';
import React, { useRef } from 'react';

interface Props {
  picture: API.PictureVO;
}
/**
 * 图片详情卡片
 * @constructor
 */
const PictureDetailsCard: React.FC<Props> = (props) => {
  const { picture } = props;
  const actionRef = useRef<ProDescriptionsActionType>();

  return (
    <ProCard title={"图片信息"} headerBordered bordered={false}>
      <ProDescriptions<API.PictureVO>
        column={1}
        actionRef={actionRef}
        dataSource={picture}
        title={picture?.name}
        emptyText={'该用户比较懒 还没有设置'}
        columns={[
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
            dataIndex: 'picFormat',
            valueType: 'text',
          },
          {
            title: '图片宽度',
            dataIndex: 'picWidth',
            valueType: 'text',
          },
          {
            title: '图片高度',
            dataIndex: 'picHeight',
            valueType: 'text',
          },
          {
            title: '图片宽高比',
            dataIndex: 'picScale',
            valueType: 'text',
          },
          {
            title: '大小',
            dataIndex: 'picSize',
            valueType: 'text',
            render: (_, record) => {
              return (
                <div>
                  {/*@ts-ignore*/}
                  {(record?.picSize / 1024).toFixed(2)}KB
                </div>
              );
            },
          },
          {
            title: '创建用户',
            dataIndex: 'userId',
            valueType: 'text',
            render: () => <div>{picture?.userVO?.userName || picture.userId}</div>,
          },
        ]}
      />
    </ProCard>
  );
};

export default PictureDetailsCard;

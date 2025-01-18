import React, { useEffect, useState } from 'react';
import { Button, Col, Grid, Image, message, Row } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel, useParams } from '@umijs/max';
import {
  deletePictureUsingPost,
  getPictureVoByIdUsingGet,
} from '@/services/excuse-backend/pictureController';
import { PictureDetailsCard } from '@/components';

const { useBreakpoint } = Grid;

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
 * 图片详情卡片
 * @constructor
 */
const PicturePage: React.FC = () => {
  const { id } = useParams();
  const scene = useBreakpoint();
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const isMobile = !scene.md;
  const [picture, setPicture] = useState<API.PictureVO>({});
  // 用于判断是否为当前用户创建的图片
  const [isOwner, setIsOwner] = useState<boolean>(false);


  /**
   * 根据id获取图片信息
   */
  const loadData = async () => {
    try {
      const res = await getPictureVoByIdUsingGet({
        id: id as any,
      });
      if (res.code === 0 && res.data) {
        setPicture(res.data);
      } else {
        setPicture({});
      }
    } catch (error) {
      setPicture({});
    }
  };

  useEffect(() => {
    if (currentUser?.id === picture?.userId) {
      setIsOwner(true);
    }
    loadData();
  }, []);

  return (
    <PageContainer title={false}>
      <ProCard>
        <Row gutter={16}>
          <Col span={isMobile ? 24 : 12}>
            <Image
              preview={false}
              style={{
                width: '100%',
                height: isMobile ? 'auto' : '100%',
                objectFit: 'cover',
              }}
              src={picture?.url}
            />
          </Col>
          <Col span={isMobile ? 24 : 12}>
            <PictureDetailsCard picture={picture} />
          </Col>
        </Row>
      </ProCard>
    </PageContainer>
  );
};

export default PicturePage;

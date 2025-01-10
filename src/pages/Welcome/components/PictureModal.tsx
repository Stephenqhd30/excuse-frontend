import React, { useEffect, useState } from 'react';
import { Col, Grid, Image, Row, Modal } from 'antd';
import { useParams } from '@umijs/max';
import { getPictureVoByIdUsingGet } from '@/services/excuse-backend/pictureController';
import { PictureDetailsCard } from '@/components';

const { useBreakpoint } = Grid;
/**
 * 图片详情卡片
 * @constructor
 */
const PicturePage: React.FC = () => {
  const { id } = useParams();
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  const [picture, setPicture] = useState<API.PictureVO>({});

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
    loadData();
  });

  return (
    <Modal>
      <Row gutter={[16, 16]}>
        <Col span={isMobile ? 24 : 12}>
          <Image src={picture?.url} />
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <PictureDetailsCard picture={picture} />
        </Col>
      </Row>
    </Modal>
  );
};

export default PicturePage;

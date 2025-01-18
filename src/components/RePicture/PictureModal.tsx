import React from 'react';
import { Col, Grid, Image, Modal, Row } from 'antd';
import { PictureDetailsCard } from '@/components';

const { useBreakpoint } = Grid;

interface Props {
  picture: API.PictureVO;
  onCancel: () => void;
  onSubmit: () => void;
}
/**
 * 图片详情卡片
 * @constructor
 */
const PictureModal: React.FC<Props> = (props) => {
  const { picture, onCancel, onSubmit } = props;
  const scene = useBreakpoint();
  const isMobile = !scene.md;

  return (
    <Modal onOk={() => onSubmit?.()} onCancel={() => onCancel?.()}>
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

export default PictureModal;

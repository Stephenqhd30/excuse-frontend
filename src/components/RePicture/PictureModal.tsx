import React from 'react';
import { Col, Grid, Modal, Row } from 'antd';
import { PictureDetailsCard, PicturePreviewCard } from '@/components';

const { useBreakpoint } = Grid;

interface Props {
  visible: boolean;
  picture: API.PictureVO;
  onCancel: () => void;
  onSubmit: () => void;
}
/**
 * 图片详情卡片
 * @constructor
 */
const PictureModal: React.FC<Props> = (props) => {
  const { visible, picture, onCancel, onSubmit } = props;
  const scene = useBreakpoint();
  const isMobile = !scene.md;

  return (
    <Modal open={visible} onOk={() => onSubmit?.()} onCancel={() => onCancel?.()}>
      <Row gutter={[16, 16]}>
        <Col span={isMobile ? 24 : 12}>
          <PicturePreviewCard picture={picture} />
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <PictureDetailsCard picture={picture} />
        </Col>
      </Row>
    </Modal>
  );
};

export default PictureModal;

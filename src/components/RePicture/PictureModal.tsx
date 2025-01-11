import React from 'react';
import { Col, Image, Modal, Row } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PictureDetailsCard } from '@/components';
import { ProCard } from '@ant-design/pro-components';

// 使用 relativeTime 插件
dayjs.extend(relativeTime);

interface Props {
  picture: API.Picture;
  onCancel: () => void;
  onSubmit: () => void;
  visible: boolean;
}

/**
 * 图片详情模态框
 * @constructor
 */
const PictureModal: React.FC<Props> = (props) => {
  const { picture, onCancel, onSubmit, visible } = props;
  return (
    <Modal
      onOk={() => onSubmit?.()}
      destroyOnClose
      title={'图片信息'}
      onCancel={() => onCancel?.()}
      open={visible}
    >
      <ProCard>
        <Row gutter={[16, 16]}>
          <Col>
            <Image src={picture?.url} />
          </Col>
          <Col>
            <PictureDetailsCard picture={picture} />
          </Col>
        </Row>
      </ProCard>
    </Modal>
  );
};

export default PictureModal;

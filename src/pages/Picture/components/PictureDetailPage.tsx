import React from 'react';
import { Col, Grid, Image, Row } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import { PictureDetailsCard } from '@/components';

const { useBreakpoint } = Grid;

interface Props {
  picture: API.PictureVO;
}
/**
 * 图片详情卡片
 * @constructor
 */
const PicturePage: React.FC<Props> = (props) => {
  const { picture } = props;
  const scene = useBreakpoint();
  const isMobile = !scene.md;
  return (
    <ProCard>
      <Row gutter={[16, 16]}>
        <Col span={isMobile ? 24 : 12}>
          <Image src={picture?.url} />
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <PictureDetailsCard picture={picture} />
        </Col>
      </Row>
    </ProCard>
  );
};

export default PicturePage;

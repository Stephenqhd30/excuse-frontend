import React from 'react';
import {Row, Col, Image} from 'antd';
import {ProDescriptions} from '@ant-design/pro-components';

interface Props {
  picture: API.PictureVO
}

/**
 * 图片详情卡片
 * @constructor
 */
const PictureDetailsCard:React.FC<Props> = (props) => {
  const { picture } = props;
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
          <Image src={picture?.url}/>
      </Col>
      <Col span={12}>
        <ProDescriptions>
          
        </ProDescriptions>
      </Col>
    </Row>
  )

}

export default PictureDetailsCard;

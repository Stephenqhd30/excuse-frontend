import React from 'react';
import { Image } from 'antd';
import { ProCard } from '@ant-design/pro-components';

interface Props {
  picture: API.PictureVO;
}

/**
 * 图片预览卡片
 * @constructor
 */
const PicturePreviewCard: React.FC<Props> = (props) => {
  const { picture } = props;

  return (
    <ProCard layout={'center'} headerBordered title="图片预览">
      <Image
        preview={false}
        style={{
          width: '100%',
          objectFit: 'cover',
        }}
        src={picture?.url}
      />
    </ProCard>
  );
};

export default PicturePreviewCard;

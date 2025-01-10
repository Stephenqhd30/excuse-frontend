import React from 'react';
import { Card, Row, Col, Image, Typography, Avatar } from 'antd';
import useStyles from './style.style';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// 使用 relativeTime 插件
dayjs.extend(relativeTime);

interface Props {
  picture: API.PictureVO;
}

/**
 * 图片详情卡片
 * @constructor
 */
const PictureCard: React.FC<Props> = (props) => {
  const { picture } = props;
  const { styles } = useStyles();
  return (
    <Card
      bordered={false}
      className={styles.card}
      hoverable
      cover={
        <Image
          style={{
            height: '220px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
          alt={picture.name}
          src={picture.url}
        />
      }
    >
      <div onClick={() => window.open(`/picture/${picture?.id}`, '_blank')}>
        <Card.Meta
          title={<a>{picture?.name}</a>}
          description={
            <Typography.Paragraph
              ellipsis={{
                rows: 2,
              }}
            >
              {picture.introduction}
            </Typography.Paragraph>
          }
        />
      </div>
      <Row>
        <Col span={22}>
          <Typography.Text type="secondary">
            {dayjs(picture?.updateTime).fromNow()}
          </Typography.Text>
        </Col>
        <Col span={2}>
          <Avatar src={picture?.userVO?.userAvatar} />
        </Col>
      </Row>
    </Card>
  );
};

export default PictureCard;

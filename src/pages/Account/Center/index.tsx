import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ACCOUNT_TITLE } from '@/constants';
import { Col, Grid, Row } from 'antd';
import { useModel } from '@@/exports';
import { UserCard } from '@/components';

const { useBreakpoint } = Grid;


/**
 * 个人中心
 * @constructor
 */
const AccountCenter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const scene = useBreakpoint();
  const isMobile = !scene.md;

  return (
    <PageContainer
      title={ACCOUNT_TITLE}
      breadcrumb={undefined}
    >
      <Row gutter={[16, 16]}>
        <Col span={isMobile ? 24 : 6}>
          <UserCard user={currentUser ?? {}} />
        </Col>
        <Col span={isMobile ? 24 : 18}></Col>
      </Row>
    </PageContainer>
  );
};

export default AccountCenter;

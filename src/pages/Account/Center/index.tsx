import React from 'react';
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
   <>
     <Row gutter={[16, 16]}>
       <Col span={isMobile ? 24 : 6}>
       </Col>
       <Col span={isMobile ? 24 : 18}>
         <UserCard user={currentUser ?? {}} />
       </Col>
     </Row>
   </>


  );
};

export default AccountCenter;

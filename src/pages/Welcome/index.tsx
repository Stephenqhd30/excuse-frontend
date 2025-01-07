import { Grid } from 'antd';
import React, { useRef } from 'react';
import { ActionType, PageContainer } from '@ant-design/pro-components';
import { WELCOME_TITLE } from '@/constants';


// 响应式组件
const { useBreakpoint } = Grid;

/**
 * 主页
 * @constructor
 */
const Welcome: React.FC = () => {
  // 响应式
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer title={WELCOME_TITLE}>

    </PageContainer>
  );
};

export default Welcome;

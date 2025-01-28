import React, { useState } from 'react';
import { Avatar, Card, Col, Grid, List, Row, Tabs } from 'antd';
import { useModel } from '@@/exports';
import { PictureCard, UserCard } from '@/components';
import { PageContainer, ProCard, ProList } from '@ant-design/pro-components';
import { ACCOUNT_TITLE } from '@/constants';
import { listMyPictureVoByPageUsingPost } from '@/services/excuse-backend/pictureController';

const { useBreakpoint } = Grid;
const { TabPane } = Tabs;

/**
 * 个人空间和团队空间
 * @constructor
 */
const AccountCenter: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const scene = useBreakpoint();
  const isMobile = !scene.md;

  // 模拟团队成员和动态数据
  const teamData = [
    { name: '团队A', description: '这是团队A的描述', members: 10, activity: '新增项目：项目A' },
    { name: '团队B', description: '这是团队B的描述', members: 8, activity: '讨论：项目B进展' },
  ];

  const [activeTab, setActiveTab] = useState<string>('personal');

  return (
    <PageContainer title={ACCOUNT_TITLE} breadcrumb={undefined}>
      <Row gutter={[16, 16]}>
        <Col span={isMobile ? 24 : 6}>
          <UserCard user={currentUser ?? {}} />
        </Col>
        <Col span={isMobile ? 24 : 18}>
          <ProCard>
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              tabPosition={'top'}
              style={{ height: '100%' }}
            >
              {/* 个人空间 Tab */}
              <TabPane tab="个人空间" key="personal">
                <ProCard>
                  <ProList
                    pagination={{
                      defaultPageSize: 12,
                      responsive: true,
                    }}
                    rowKey={'id'}
                    grid={{
                      xs: 1,
                      sm: 2,
                      md: 2,
                      lg: 2,
                      xl: 2,
                      xxl: 2,
                    }}
                    request={async (params, sort, filter) => {
                      const sortField = 'updateTime';
                      const sortOrder = 'descend';
                      const { data, code } = await listMyPictureVoByPageUsingPost({
                        ...params,
                        ...filter,
                        sortField,
                        sortOrder,
                      } as API.PictureQueryRequest);

                      return {
                        success: code === 0,
                        data: data?.records || [],
                        total: data?.total || 0,
                      };
                    }}
                    renderItem={(item) => <PictureCard key={item.id} picture={item} />}
                  />
                </ProCard>
              </TabPane>

              {/* 团队空间 Tab */}
              <TabPane tab="团队空间" key="team">
                {teamData.map((team, index) => (
                  <Card
                    key={index}
                    title={team.name}
                    bordered={false}
                    style={{ marginBottom: '16px' }}
                  >
                    <p>{team.description}</p>
                    <p>团队成员数: {team.members}</p>
                    <p>最近动态: {team.activity}</p>
                    <List
                      itemLayout="horizontal"
                      dataSource={['成员A', '成员B', '成员C']}
                      renderItem={(member) => (
                        <List.Item>
                          <List.Item.Meta avatar={<Avatar>{member[0]}</Avatar>} title={member} />
                        </List.Item>
                      )}
                    />
                  </Card>
                ))}
              </TabPane>
            </Tabs>
          </ProCard>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default AccountCenter;

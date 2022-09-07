import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import { Avatar, Card, Col, List, Row, Statistic } from 'antd';
import React from 'react';

const data = [
  {
    title: 'Miko',
  },
  {
    title: 'Luke',
  },
  {
    title: 'Paul',
  },
  {
    title: 'Krishna',
  },
];

export default function Dashboard() {
  return (
    <div className='m-12 max-h-full overflow-auto bg-white'>
      <div className='p-2'>
        <div className='site-statistic-demo-card'>
          <Row className='my-4 px-2' gutter={16}>
            <Col span={6}>
              <Card>
                <Statistic
                  title='Users'
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix='%'
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title='Booking'
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix='%'
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title='Cars'
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix='%'
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title='Revenue'
                  value={9000}
                  valueStyle={{ color: 'green' }}
                  prefix={<ArrowUpOutlined />}
                  suffix='USD'
                />
              </Card>
            </Col>
          </Row>
          <Row className='my-8 px-2' gutter={24}>
            <Col span={14}>
              <div>
                <List
                  header='Latest users'
                  bordered
                  itemLayout='horizontal'
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src='https://joeschmoe.io/api/v1/random' />
                        }
                        title={<a href='#'>{item.title}</a>}
                        description='Has just created account'
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col span={10}>
              <div>
                <List
                  header='Latest booking'
                  bordered
                  itemLayout='horizontal'
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item actions={[<a key='list-loadmore-edit'>view</a>]}>
                      <List.Item.Meta
                        avatar={
                          <Avatar src='https://joeschmoe.io/api/v1/random' />
                        }
                        title={<a href='#'>{item.title}</a>}
                        description='Has just created a booking'
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

import {
  AntDesignOutlined,
  MessageFilled,
  PhoneFilled,
} from '@ant-design/icons';
import {
  Carousel,
  Row,
  Col,
  Typography,
  Rate,
  Skeleton,
  Avatar,
  Button,
  Space,
} from 'antd';
import React from 'react';
import InfoCard from '../../components/InfoCard';

export default function CarDetails(props: any) {
  return (
    <InfoCard>
      <Carousel autoplay dotPosition='right'>
        {Array.from(Array(3).keys()).map((value, index) => (
          <div
            key={index}
            className='flex w-full items-center justify-center overflow-hidden bg-red-500'
          >
            <div style={{ height: 500 }}>
              <img
                src='/demo-car.png'
                alt='demo car'
                className='mx-auto h-full w-full items-center justify-center bg-slate-300 object-contain'
              />
            </div>
          </div>
        ))}
      </Carousel>
      <Row>
        <Col md={16} className='p-4'>
          <InfoCard loading={props.isLoading}>
            <Typography className='mb-4 text-3xl'>Spark </Typography>
            <Rate disabled defaultValue={2} />
            <Typography className='mt-8 text-2xl'>Description</Typography>
          </InfoCard>
        </Col>
        <Col md={8} className='p-4'>
          <InfoCard>
            <Space direction='vertical' size='middle'>
              <Typography className='text-3xl'>Owner</Typography>
              <Skeleton loading={props.isLoading} avatar active>
                <Row gutter={16}>
                  <Col>
                    <Avatar size={64} icon={<AntDesignOutlined />} />
                  </Col>
                  <Col>
                    <div className='text-3xl'>John Doe</div>
                  </Col>
                  <Col>
                    <Space>
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<PhoneFilled />}
                      />
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<MessageFilled />}
                      />
                    </Space>
                  </Col>
                </Row>
              </Skeleton>
            </Space>
          </InfoCard>
        </Col>
      </Row>
    </InfoCard>
  );
}

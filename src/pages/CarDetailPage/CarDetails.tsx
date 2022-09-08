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
import React, { useEffect, useState } from 'react';
import { getCarDetails } from '../../apis';
import InfoCard from '../../components/InfoCard';

export default function CarDetails(props: any) {
  const [details, setDetails] = useState<[string, unknown][]>();
  useEffect(() => {
    (async () => {
      const d = await getCarDetails(props.car.id);
      setDetails(Object.entries(d));
      console.log(d);
    })();
  }, []);
  return (
    <InfoCard>
      {props.isLoading ? (
        <></>
      ) : (
        <Carousel autoplay dotPosition='right'>
          {props.car.images ? (
            props.car.images.map((image: string, index: any) => (
              <div
                key={index}
                className=' flex w-full items-center justify-center overflow-hidden'
              >
                <div className='h-[200px]'>
                  <img
                    src={image}
                    alt={`${props.car.name} ${index + 1}`}
                    className='mx-auto h-full w-full items-center justify-center object-contain'
                  />
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </Carousel>
      )}
      <Row>
        <Col md={16} className='p-4'>
          <InfoCard loading={props.isLoading}>
            {props.isLoading ? (
              <></>
            ) : (
              <>
                <Typography className='mb-4 text-3xl'>
                  {props.car.name}
                </Typography>
                <Rate disabled defaultValue={5} />
                <Typography className='mt-8 text-3xl'>Description</Typography>
                {details?.map(([key, value], index) => {
                  return (
                    <Typography
                      key={index}
                      className='text-2xl'
                    >{`${key}: ${value}`}</Typography>
                  );
                })}
              </>
            )}
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

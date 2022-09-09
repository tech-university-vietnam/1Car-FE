import { Typography, Divider, Row, Col, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../../redux/reducer/car';

import { formatCurrency, calculateDatesBetween } from '../../utils/utils';

interface bookingProps {
  car: Car;
  startDate: string;
  endDate: string;
  buttonLoading: boolean;
  setButtonLoading: (loading: boolean) => void;
  createBooking: (id: string) => void;
}
export default function BookingConfirmation({
  car,
  startDate,
  endDate,
  buttonLoading,
  setButtonLoading,
  createBooking,
}: bookingProps) {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col space-y-8'>
      <Typography.Title level={2} className='m-auto'>
        Your current booking
      </Typography.Title>

      <Divider />
      <Row gutter={8}>
        <Col md={8}>
          {car.images ? (
            <img
              src={car.images[0]}
              alt='your car'
              className='mb-4 h-32 w-32'
            />
          ) : (
            <></>
          )}
          <Typography.Title level={3}>{car.name}</Typography.Title>
        </Col>
        <Col>
          <Row gutter={32}>
            <Col span={18}>
              <Typography.Title level={3}>Receive on</Typography.Title>
              <Typography>{startDate}</Typography>
            </Col>
            <Col>
              <Typography.Title level={3}>At</Typography.Title>
              <Typography>Location</Typography>
            </Col>
          </Row>
          <Row gutter={32} className='mt-16'>
            <Col span={18}>
              <Typography.Title level={3}>Return on</Typography.Title>
              <Typography>{endDate}</Typography>
            </Col>
            <Col>
              <Typography.Title level={3}>At</Typography.Title>
              <Typography>Location</Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
      <Typography.Title level={3}>Leave order note</Typography.Title>
      <TextArea rows={5} placeholder='Optional' maxLength={200} showCount />
      <Divider />
      <div className='flex w-full  text-3xl'>
        <div>Total</div>
        <div className='ml-auto'>
          {formatCurrency(
            calculateDatesBetween(startDate, endDate) * car.pricePerDate
          )}
        </div>
      </div>
      <div className='ml-auto space-x-4'>
        <Button onClick={() => navigate(-1)}>Go back</Button>
        <Button
          loading={buttonLoading}
          onClick={() => {
            setButtonLoading(true);
            createBooking(car.id ?? '');
          }}
          type='primary'
        >
          Next
        </Button>
      </div>
    </div>
  );
}

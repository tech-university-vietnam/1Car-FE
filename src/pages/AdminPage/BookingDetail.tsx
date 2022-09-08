import { Row, Col, Avatar, Descriptions, Divider } from 'antd';
import moment from 'moment';
import React from 'react';
import { BookingData } from '../../redux/reducer/booking';

export default function BookingDetail({
  booking,
}: {
  booking: BookingData | null;
}) {
  if (!booking) return null;
  return (
    <div>
      <Row>
        <Col span={8}>
          <div className='flex items-center justify-center'>
            <Avatar src='https://joeschmoe.io/api/v1/random' size={150}>
              {booking.user.name}
            </Avatar>
          </div>
        </Col>
        <Col span={16}>
          <Descriptions title='User Info' layout='vertical'>
            <Descriptions.Item label='Name'>
              {booking.user.name}
            </Descriptions.Item>
            <Descriptions.Item label='Telephone'>
              {booking.user.phoneNumber || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label='Email'>
              {booking.user.email || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label='Address' span={2}>
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider className='mx-8' />
      <Row>
        <Col span={24}>
          <Descriptions bordered title='Booking information'>
            <Descriptions.Item label='Car name'>
              {booking.car.name}
            </Descriptions.Item>
            <Descriptions.Item label='Billing'>Credit Card</Descriptions.Item>
            <Descriptions.Item label='Create at'>
              {new Date(booking.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label='Amount'>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(booking.totalPrice)}
            </Descriptions.Item>
            <Descriptions.Item label='Discount'>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(0)}
            </Descriptions.Item>
            <Descriptions.Item label='Official'>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(booking.totalPrice)}
            </Descriptions.Item>
            <Descriptions.Item label='Detail info'>
              Pickup date: {new Date(booking.receivedDateTime).toLocaleString()}
              <br />
              Return date: {new Date(booking.receivedDateTime).toLocaleString()}
              <br />
              Payment status: {booking.bookingStatus}
              <br />
              Pickup status: {booking.pickUpStatus}
              <br />
              Location: {booking.pickUpLocationId || 'N/A'}
              <br />
              Description: {booking.description || 'N/A'}
              <br />
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  );
}

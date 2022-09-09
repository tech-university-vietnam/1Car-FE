import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const SuccessfulPayment = () => {
  return (
    <Result
      className='text-lg'
      status='success'
      title='Payment successful!'
      icon={<CheckCircleFilled style={{ fontSize: '90px' }} />}
      subTitle='Thank you for your booking and please navigate back to your information page to check on booking details'
      extra={[
        <Link to='/user'>
          <Button type='primary' key='console'>
            User dashboard
          </Button>
        </Link>,
        <Link to='/'>
          <Button key='buy'>Homepage</Button>
        </Link>,
      ]}
    />
  );
};

export default SuccessfulPayment;

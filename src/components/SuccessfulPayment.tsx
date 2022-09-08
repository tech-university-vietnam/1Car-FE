import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
const SuccessfulPayment = () => {
  return (
    <Result
      className='mt-40 text-lg'
      status='success'
      title='Payment successful!'
      icon={<CheckCircleFilled style={{ fontSize: '90px' }} />}
      subTitle='Please navigate back to your information page to check on booking details'
      extra={[
        <Button type='primary' key='console'>
          Go Console
        </Button>,
        <Button key='buy'>Buy Again</Button>,
      ]}
    />
  );
};

export default SuccessfulPayment;

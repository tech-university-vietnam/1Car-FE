import { WarningFilled } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
const FailedPayment = () => {
  return (
    <Result
      className='mt-40 text-lg'
      status='warning'
      title='There are some problems with your payment. Please check again later'
      extra={
        <Button type='primary' key='console'>
          Go Console
        </Button>
      }
      icon={<WarningFilled style={{ fontSize: '90px' }} />}
    />
  );
};

export default FailedPayment;

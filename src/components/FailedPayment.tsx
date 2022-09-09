import { WarningFilled } from '@ant-design/icons';
import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const FailedPayment = () => {
  return (
    <Result
      className='text-lg'
      status='error'
      title='Payment error'
      subTitle='There are some problems with your payment. Please check again later.'
      extra={
        <Link to='/user'>
          <Button type='primary' key='console'>
            Go Console
          </Button>
        </Link>
      }
      icon={<WarningFilled style={{ fontSize: '90px' }} />}
    />
  );
};

export default FailedPayment;

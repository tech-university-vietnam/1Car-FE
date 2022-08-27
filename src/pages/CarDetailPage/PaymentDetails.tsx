import { Divider, Skeleton, Typography, Button } from 'antd';
import React from 'react';
import InfoCard from '../../components/InfoCard';

export default function PaymentDetails(props: any) {
  return (
    <InfoCard>
      <div className='flex place-content-center text-3xl'>Payment</div>
      <Divider />
      <Skeleton loading={props.isLoading} active>
        <Typography className='text-3xl'>Pick up location</Typography>
        <Typography className='text-3xl'>Pick up date</Typography>
        <Typography className='text-3xl'>Price per day</Typography>
        <Typography className='text-3xl'>Number of days</Typography>
      </Skeleton>
      <Divider />
      <div>
        <Button className='mt-4 w-full' shape='round' type='primary'>
          Rent now
        </Button>
      </div>
    </InfoCard>
  );
}

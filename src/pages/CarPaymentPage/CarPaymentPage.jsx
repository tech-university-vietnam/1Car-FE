import { Button, Typography } from 'antd';
import React from 'react';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
export default function CarPaymentPage() {
  return (
    <>
      <Header />
      <div className=' m-auto mt-24 w-3/6 p-8'>
        <InfoCard>
          <div className='flex flex-col items-center justify-center space-y-8'>
            <Typography className='text-3xl'>Payment</Typography>
            <Typography>Car</Typography>
            <Typography>From</Typography>
            <Typography>To</Typography>
            <div className='flex w-full text-3xl'>
              <div>Total</div>
              <div className='ml-auto'>$100</div>
            </div>
            <div className='ml-auto space-x-4'>
              <Button>Go back</Button>
              <Button type='primary'>Next</Button>
            </div>
          </div>
        </InfoCard>
      </div>
    </>
  );
}

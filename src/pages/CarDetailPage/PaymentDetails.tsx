import { Divider, Skeleton, Typography, Button, DatePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import InfoCard from '../../components/InfoCard';
import { RangePickerProps } from 'antd/lib/date-picker';

export default function PaymentDetails(props: any) {
  const [startDate, setStartDate] = useState<string | undefined>('');
  const [endDate, setEndDate] = useState<string | undefined>('');

  const disabledStartDate: RangePickerProps['disabledDate'] = (
    current: any
  ) => {
    return current && current < moment().startOf('day');
  };

  const disabledEndDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current < moment(startDate || Date.now()).startOf('day');
  };
  return (
    <InfoCard>
      <div className='flex place-content-center text-3xl'>Payment</div>
      <Divider />
      <Skeleton loading={props.isLoading} active>
        <Typography className='text-3xl'>Pick up location</Typography>
        <Typography className='text-3xl'>Start date:</Typography>
        <DatePicker
          placeholder='From'
          size='large'
          style={{ width: '100%' }}
          disabledDate={disabledStartDate}
          onChange={(data) => {
            setEndDate('');
            setStartDate(data?.toLocaleString());
          }}
        ></DatePicker>
        <Typography className='text-3xl'>End date:</Typography>
        <DatePicker
          placeholder='To'
          size='large'
          style={{ width: '100%' }}
          disabledDate={disabledEndDate}
          onChange={(data) => setEndDate(data?.toLocaleString())}
        ></DatePicker>
        <Typography className='text-3xl'>Price per day</Typography>
        <Typography className='text-3xl'>Number of days</Typography>
      </Skeleton>
      <Divider />
      <div>
        <Button
          className='mt-4 w-full'
          shape='round'
          type='primary'
          onClick={() => navigate(props.to)}
        >
          Rent now
        </Button>
      </div>
    </InfoCard>
  );
}

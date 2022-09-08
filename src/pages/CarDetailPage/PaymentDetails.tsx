import { Divider, Skeleton, Typography, Button, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import InfoCard from '../../components/InfoCard';
import { RangePickerProps } from 'antd/lib/date-picker';
import { useNavigate } from 'react-router-dom';
import { calculateDatesBetween, formatCurrency } from '../../utils/utils';

export default function PaymentDetails(props: any) {
  const [startDate, setStartDate] = useState<string | undefined>('');
  const [endDate, setEndDate] = useState<string | undefined>('');
  const [datesBetween, setDatesBetween] = useState(0);

  const navigate = useNavigate();
  const disabledStartDate: RangePickerProps['disabledDate'] = (
    current: any
  ) => {
    return current && current < moment().startOf('day');
  };

  const disabledEndDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current < moment(startDate || Date.now()).startOf('day');
  };
  useEffect(() => {
    if (startDate && endDate) {
      setDatesBetween(calculateDatesBetween(startDate, endDate));
    }
  }, [startDate, endDate]);

  return (
    <InfoCard>
      <Typography.Title className='flex place-content-center'>
        Booking
      </Typography.Title>
      <Divider />
      <Skeleton loading={props.isLoading} active>
        <Typography className='text-xl font-bold'>Pick up location</Typography>
        <Typography className='mt-4 text-xl font-bold'>Start date:</Typography>
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
        <Typography className='mt-4 text-xl font-bold'>End date:</Typography>
        <DatePicker
          placeholder='To'
          size='large'
          style={{ width: '100%' }}
          disabledDate={disabledEndDate}
          onChange={(data) => setEndDate(data?.toLocaleString())}
        ></DatePicker>
        {props.isLoading ? (
          <></>
        ) : (
          <div className='mt-4 flex'>
            <Typography className=' text-xl '>Price per day</Typography>
            <Typography className='ml-auto text-xl font-bold'>
              {formatCurrency(props.car.pricePerDate)}
            </Typography>
          </div>
        )}
        <div className='mt-4 flex'>
          <Typography className='text-xl '>x No. days</Typography>
          <Typography className='ml-auto text-xl font-bold'>
            {datesBetween}
          </Typography>
        </div>
        {props.isLoading ? (
          <></>
        ) : (
          <div className='mt-4 flex'>
            <Typography className='text-xl '>= Total price</Typography>
            <Typography className='ml-auto text-xl font-bold'>
              {formatCurrency(props.car.pricePerDate * datesBetween)}
            </Typography>
          </div>
        )}
        <Divider />
        <div>
          <Button
            className='mt-4 w-full'
            shape='round'
            type='primary'
            disabled={!(startDate && endDate)}
            onClick={() =>
              navigate(`${props.to}?start=${startDate}&end=${endDate}`)
            }
          >
            Rent now
          </Button>
        </div>
      </Skeleton>
    </InfoCard>
  );
}

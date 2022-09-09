import { Divider, Skeleton, Typography, Button, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import InfoCard from '../../components/InfoCard';
import { RangePickerProps } from 'antd/lib/date-picker';
import { useNavigate } from 'react-router-dom';
import { calculateDatesBetween, formatCurrency } from '../../utils/utils';
import { Car } from '../../redux/reducer/car';
import { checkCarAvailability } from '../../apis';

interface PaymentDetailsProp {
  isLoading: boolean;
  car: Car;
  to: string;
}
export default function PaymentDetails({
  isLoading,
  car,
  to,
}: PaymentDetailsProp) {
  const [startDate, setStartDate] = useState<string | undefined>('');
  const [endDate, setEndDate] = useState<string | undefined>('');
  const [datesBetween, setDatesBetween] = useState(0);
  const [carIsAvailable, setCarIsAvailable] = useState(true);
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
      (async () => {
        const response = await checkCarAvailability(
          car.id,
          new Date(startDate).toISOString(),
          new Date(endDate).toISOString()
        );
        setCarIsAvailable(response.isAvailable);
      })();
    }
  }, [startDate, endDate, car.id]);

  return (
    <InfoCard>
      <Typography.Title className='flex place-content-center'>
        Create booking
      </Typography.Title>
      <Divider />
      <Skeleton loading={isLoading} active>
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
          status={carIsAvailable ? '' : 'error'}
        />
        <Typography className='mt-4 text-xl font-bold'>End date:</Typography>
        <DatePicker
          placeholder='To'
          size='large'
          style={{ width: '100%' }}
          disabledDate={disabledEndDate}
          onChange={(data) => setEndDate(data?.toLocaleString())}
          status={carIsAvailable ? '' : 'error'}
        />
        {carIsAvailable ? (
          <></>
        ) : (
          <div className='text-red-200'>
            The car is not available for those days
          </div>
        )}
        {isLoading ? (
          <></>
        ) : (
          <div className='mt-4 flex'>
            <Typography className=' text-xl '>Price per day</Typography>
            <Typography className='ml-auto text-xl font-bold'>
              {formatCurrency(car.pricePerDate)}
            </Typography>
          </div>
        )}
        <div className='mt-4 flex'>
          <Typography className='text-xl '>x No. days</Typography>
          <Typography className='ml-auto text-xl font-bold'>
            {datesBetween}
          </Typography>
        </div>
        {isLoading ? (
          <></>
        ) : (
          <div className='mt-4 flex'>
            <Typography className='text-xl '>= Total price</Typography>
            <Typography className='ml-auto text-xl font-bold'>
              {formatCurrency(car.pricePerDate * datesBetween)}
            </Typography>
          </div>
        )}
        <Divider />
        <Button
          className='mt-4 w-full'
          shape='round'
          type='primary'
          disabled={!(startDate && endDate && carIsAvailable)}
          onClick={() => {
            navigate(`${to}?start=${startDate}&end=${endDate}`);
          }}
        >
          Rent now
        </Button>
      </Skeleton>
    </InfoCard>
  );
}

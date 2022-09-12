import { Divider, Skeleton, Typography, Button, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import InfoCard from '../../components/InfoCard';
import { RangePickerProps } from 'antd/lib/date-picker';
import { useNavigate } from 'react-router-dom';
import { calculateDatesBetween, formatCurrency } from '../../utils/utils';
import { Car } from '../../redux/reducer/car';
import { checkCarAvailability } from '../../apis';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import GoogleMapReact from 'google-map-react';

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
  const [location, setLocation] = useState<any>('');
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
    <>
      <InfoCard>
        <Typography.Title level={3} className='flex place-content-center'>
          Create booking
        </Typography.Title>
        <Divider />
        <Skeleton loading={isLoading} active>
          <Typography.Title level={5} className='text-xl font-semibold'>
            Pick up location:
          </Typography.Title>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GG_API_KEY!}
            selectProps={{
              value: location,
              onChange: (value: any) => {
                setLocation(value);
              },
            }}
          />
          <Typography.Title level={5} className='mt-4 text-xl font-semibold'>
            Start date:
          </Typography.Title>
          <DatePicker
            placeholder='From'
            size='large'
            style={{ width: '100%' }}
            disabledDate={disabledStartDate}
            onChange={(data) => {
              setEndDate('');
              setStartDate(data?.toISOString());
            }}
            status={carIsAvailable ? '' : 'error'}
          />

          <Typography.Title level={5} className='mt-4 text-xl font-semibold'>
            End date:
          </Typography.Title>
          <DatePicker
            placeholder='To'
            size='large'
            style={{ width: '100%' }}
            disabledDate={disabledEndDate}
            onChange={(data) => setEndDate(data?.toISOString())}
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
            <div className='mt-2 flex items-center'>
              <Typography.Title level={5} className=''>
                Price per day
              </Typography.Title>
              <Typography.Title level={5} className='ml-auto font-bold'>
                {formatCurrency(car.pricePerDate)}
              </Typography.Title>
            </div>
          )}
          <div className='flex items-center'>
            <Typography.Title level={5} className=''>
              Number of days
            </Typography.Title>
            <Typography.Title level={5} className='ml-auto font-bold'>
              {datesBetween}
            </Typography.Title>
          </div>
          {isLoading ? (
            <></>
          ) : (
            <div className='mt-4 flex items-center'>
              <Typography.Title level={4} className=''>
                Total price
              </Typography.Title>
              <Typography.Title level={4} className='ml-auto font-bold'>
                {formatCurrency(car.pricePerDate * datesBetween)}
              </Typography.Title>
            </div>
          )}
          <Divider />
          <Button
            className='mt-4 w-full'
            size='large'
            type='primary'
            disabled={!(startDate && endDate && carIsAvailable)}
            onClick={() => {
              navigate(
                `${to}?start=${startDate}&end=${endDate}&location=${
                  location?.value.place_id || ''
                }`
              );
            }}
          >
            Rent now
          </Button>
        </Skeleton>
      </InfoCard>
      <InfoCard>
        <Typography.Title level={5} className='ml-auto font-bold'>
          Recommend cars
        </Typography.Title>
        <img src='/bg-search.jpg' alt='image' />
      </InfoCard>
    </>
  );
}

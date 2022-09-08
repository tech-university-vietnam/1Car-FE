import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import { getCar, postBooking } from '../../apis';
import { calculateDatesBetween, formatCurrency } from '../../utils/utils';
import car from '../../redux/reducer/car';
export default function CarPaymentPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [car, setCar] = useState();

  const { carId } = useParams();
  const [searchParams] = useSearchParams();
  const receivedDateTime = new Date(searchParams.get('start')).toISOString();
  const returnDateTime = new Date(searchParams.get('end')).toISOString();
  const navigate = useNavigate();

  const createBooking = async (carId) => {
    const requestData = {
      carId,
      returnDateTime,
      receivedDateTime,
      pickUpLocationId: '47964507-b206-4afd-b874-e9ba1bf6a944',
    };
    try {
      const response = await postBooking(requestData);
      window.location.href = response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const c = await getCar(carId);
      setCar(c);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Header />
      <div className=' m-auto mt-24 w-3/6 p-8'>
        <InfoCard loading={isLoading}>
          {isLoading ? (
            <></>
          ) : (
            <div className='flex flex-col items-center justify-center space-y-8'>
              <Typography className='text-3xl'>Payment</Typography>
              <Typography className='font-bold'>Car</Typography>
              <Typography>{car.name}</Typography>
              <Typography className='font-bold'>From</Typography>
              <Typography>{searchParams.get('start')}</Typography>
              <Typography className='font-bold'>To</Typography>
              <Typography>{searchParams.get('end')}</Typography>
              <div className='flex w-full text-3xl'>
                <div>Total</div>
                <div className='ml-auto'>
                  {formatCurrency(
                    calculateDatesBetween(receivedDateTime, returnDateTime) *
                      car.pricePerDate
                  )}
                </div>
              </div>
              <div className='ml-auto space-x-4'>
                <Button onClick={() => navigate(-1)}>Go back</Button>
                <Button onClick={() => createBooking(carId)} type='primary'>
                  Next
                </Button>
              </div>
            </div>
          )}
        </InfoCard>
      </div>
    </>
  );
}

import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import { postBooking } from '../../apis';
export default function CarPaymentPage() {
  const [redirect, setRedirect] = useState();
  const { carId } = useParams();
  const navigate = useNavigate();
  const createBooking = async (carId) => {
    const requestData = {
      carId,
      returnDateTime: '2014-01-28 20:00:00',
      receivedDateTime: '2014-01-20 20:00:00',
      pickUpLocationId: '47964507-b206-4afd-b874-e9ba1bf6a944',
    };
    const response = await postBooking(requestData);
    // console.log(response);
    setRedirect(response);
  };
  useEffect(() => {
    if (redirect) {
      window.location.href = redirect;
    }
  }, [redirect]);

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
              <Button onClick={() => navigate(-1)}>Go back</Button>
              <Button onClick={() => createBooking(carId)} type='primary'>
                Next
              </Button>
            </div>
          </div>
        </InfoCard>
      </div>
    </>
  );
}

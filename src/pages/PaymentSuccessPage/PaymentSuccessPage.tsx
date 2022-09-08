import { CheckCircleFilled, WarningFilled } from '@ant-design/icons';
import { Button, Col, Divider, Result, Row, Skeleton, Space, Spin } from 'antd';
import { Typography } from 'antd';
import { debounce, throttle } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../apis';
import FailedPayment from '../../components/FailedPayment';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import SuccessfulPayment from '../../components/SuccessfulPayment';

export default function PaymentSuccessPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessfulFetch, setIsSuccessfulFetch] = useState(true);
  const MAX_FETCH_TIMES = 6;
  useEffect(() => {
    setIsLoading(true);
    const fetchBookingWithDelay = async (fetchedId: string) => {
      let fetchedBooking = await getBooking(fetchedId);
      let count = 0;
      while (
        fetchedBooking.bookingStatus === 'PENDING' &&
        count < MAX_FETCH_TIMES
      ) {
        await new Promise((resolve) => setTimeout(resolve, 4000));
        fetchedBooking = await getBooking(fetchedId);
        count++;
      }
      setBooking(fetchedBooking);
      if (count >= MAX_FETCH_TIMES) {
        setIsSuccessfulFetch(false);
      }
      setIsLoading(false);
    };
    fetchBookingWithDelay(id || '0');
  }, [id, isSuccessfulFetch]);

  return (
    <>
      <Header />
      {!isSuccessfulFetch ? (
        <FailedPayment />
      ) : isLoading ? (
        <div className='mt-40 text-center'>
          <Spin size='large' />
        </div>
      ) : (
        <SuccessfulPayment />
      )}
    </>
  );
}

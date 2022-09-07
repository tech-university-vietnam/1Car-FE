import { Button, Col, Divider, Row, Skeleton, Space } from 'antd';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getCar } from '../../apis';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import CarDetails from './CarDetails';
import PaymentDetails from './PaymentDetails';
export default function CarDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [car, setCar] = useState();
  const paymentId = 'hello';
  useEffect(() => {
    (async () => {
      const c = await getCar(id);
      setCar(c);
      setIsLoading(false);
      console.log(c);
    })();
  }, []);

  return (
    <div className='min-h-screen'>
      <Header />
      <>
        {id ? (
          <Row gutter={8} className='p-8'>
            <Col md={18}>
              <CarDetails isLoading={isLoading} car={car} />
            </Col>
            <Col md={6} style={{ width: '100%' }}>
              <PaymentDetails
                isLoading={isLoading}
                to={'../payments/' + paymentId}
                car={car}
              />
            </Col>
          </Row>
        ) : (
          <Typography>Car not found</Typography>
        )}
      </>
    </div>
  );
}

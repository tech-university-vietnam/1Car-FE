import { Button, Col, Divider, Row, Skeleton, Space } from 'antd';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import CarDetails from './CarDetails';
import PaymentDetails from './PaymentDetails';

export default function CarDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('id');
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    return () => {};
  }, []);

  return (
    <div className='min-h-screen'>
      <Header />
      <>
        {query ? (
          <Row gutter={8} className='p-8'>
            <Col md={18}>
              <CarDetails isLoading={isLoading} />
            </Col>
            <Col md={6} style={{ width: '100%' }}>
              <PaymentDetails isLoading={isLoading} />
              <InfoCard style={{ marginTop: '8px' }}>Recommended Cars</InfoCard>
            </Col>
          </Row>
        ) : (
          <Typography>Car not found</Typography>
        )}
      </>
    </div>
  );
}

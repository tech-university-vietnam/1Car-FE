import { Button, Col, Divider, Row, Skeleton } from 'antd';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import CarDetails from './CarDetails';
import PaymentDetails from './PaymentDetails';

export default function CarDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    return () => {};
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Row gutter={16} className="p-8">
        <Col md={18}>
          <CarDetails isLoading={isLoading} />
        </Col>

        <Col span={6}>
          <PaymentDetails isLoading={isLoading} />
          <InfoCard className="shadow-xl">Recommended Cars</InfoCard>
        </Col>
      </Row>
    </div>
  );
}

import { Col, Row } from 'antd';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCar } from '../../apis';
import Header from '../../components/Header';
import CarDetails from './CarDetails';
import PaymentDetails from './PaymentDetails';
export default function CarDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [car, setCar] = useState();
  useEffect(() => {
    (async () => {
      const c = await getCar(id ? id : '');
      setCar(c);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className='min-h-screen'>
      <Header />
      <>
        {car ? (
          <Row gutter={8} className='p-8'>
            <Col md={18}>
              <CarDetails isLoading={isLoading} car={car} />
            </Col>
            <Col md={6} style={{ width: '100%' }}>
              <PaymentDetails
                isLoading={isLoading}
                to={`../payments/${id}`}
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

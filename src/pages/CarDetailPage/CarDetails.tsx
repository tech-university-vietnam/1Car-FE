import { Carousel, Row, Col, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { getCarDetails } from '../../apis';
import InfoCard from '../../components/InfoCard';
import { Car } from '../../redux/reducer/car';

interface CarDetailsProps {
  car: Car;
  isLoading: boolean;
}
export default function CarDetails({ car, isLoading }: CarDetailsProps) {
  const [details, setDetails] = useState<[string, unknown][]>();
  const [description, setDescription] = useState('');
  useEffect(() => {
    (async () => {
      const { description, ...rest } = await getCarDetails(car.id);
      setDetails(Object.entries(rest.specs));
      setDescription(description);
    })();
  }, []);
  return (
    <InfoCard>
      {isLoading ? (
        <></>
      ) : (
        <Carousel autoplay dotPosition='right'>
          {car.images ? (
            car.images.map((image: string, index: any) => (
              <div
                key={index}
                className=' flex w-full items-center justify-center overflow-hidden'
              >
                <div className='h-[400px]'>
                  <img
                    src={image}
                    alt={`${car.name} ${index + 1}`}
                    className='mx-auto h-full w-full items-center justify-center bg-slate-200 object-contain'
                  />
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </Carousel>
      )}
      <Row>
        <Col span={24} className='py-4'>
          <InfoCard loading={isLoading}>
            {isLoading ? (
              <></>
            ) : (
              <>
                <Row>
                  <Typography.Title className='mb-4 '>
                    {car.name}
                  </Typography.Title>
                </Row>
                <Row gutter={[0, 24]}>
                  <Col lg={8}>
                    <Typography.Title level={3}>
                      Specifications
                    </Typography.Title>
                  </Col>
                  <Col lg={16}>
                    <Row>
                      {details?.map(([key, val], index) => (
                        <Col span={12}>
                          <Typography key={index} className='text-lg'>
                            <span className='font-bold '>{`${key}: `}</span>
                            {`${val}`}
                          </Typography>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
                <Row gutter={[0, 24]}>
                  <Col lg={8}>
                    <Typography.Title level={3}>Description</Typography.Title>
                  </Col>
                  <Col>
                    <div className='text-lg'>
                      {description ? description : 'No descriptions provided'}
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </InfoCard>
        </Col>
      </Row>
    </InfoCard>
  );
}

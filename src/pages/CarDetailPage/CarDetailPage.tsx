import { Button, Carousel, Col, Divider, Rate, Row, Skeleton } from 'antd';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';

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
          <InfoCard>
            <div className="flex h-screen max-w-full shrink-0 basis-2/3 flex-col ">
              <div
                className="relative w-full bg-blue-500"
                style={{ height: 500 }}
              >
                <Carousel
                  autoplay
                  style={{ height: '100%' }}
                  adaptiveHeight={false}
                >
                  {Array.from(Array(3).keys()).map((value, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center justify-center overflow-hidden bg-red-500"
                    >
                      <div style={{ height: 500 }}>
                        <img
                          src="/demo-car.png"
                          alt="demo car"
                          className="mx-auto h-full w-full items-center justify-center bg-slate-300 object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
              <Row>
                <Col md={16} className="p-4">
                  <InfoCard loading={isLoading}>
                    <Typography className="mb-4 text-3xl">Spark</Typography>
                    <Rate disabled defaultValue={2} />
                    <Typography className="mt-8 text-2xl">
                      Description
                    </Typography>
                  </InfoCard>
                </Col>
                <Col md={8} className="p-4">
                  <InfoCard className="">
                    <Typography className="text-3xl">Owner info</Typography>
                    <Skeleton loading={isLoading} avatar active></Skeleton>
                  </InfoCard>
                </Col>
              </Row>
            </div>
          </InfoCard>
        </Col>

        <Col span={6}>
          <InfoCard className="shadow-xl">
            <div className="flex place-content-center text-3xl">Payment</div>
            <Divider />
            <Skeleton loading={isLoading} active>
              <Typography className="text-3xl">Pick up location</Typography>
              <Typography className="text-3xl">Pick up date</Typography>
              <Typography className="text-3xl">Price per day</Typography>
              <Typography className="text-3xl">Number of days</Typography>
            </Skeleton>
            <Divider />
            <div>
              <Button className="mt-4 w-full" shape="round" type="primary">
                Rent now
              </Button>
            </div>
          </InfoCard>
          <InfoCard className="shadow-xl">Recommended Cars</InfoCard>
        </Col>
      </Row>
      <div className="flex h-full max-w-full flex-col gap-4 md:m-4 md:flex-row"></div>
    </div>
  );
}

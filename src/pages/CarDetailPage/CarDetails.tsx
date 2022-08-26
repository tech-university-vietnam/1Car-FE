import { Carousel, Row, Col, Typography, Rate, Skeleton } from 'antd';
import React from 'react';
import InfoCard from '../../components/InfoCard';

export default function CarDetails(props: any) {
  return (
    <InfoCard>
      <div className="flex h-screen max-w-full shrink-0 basis-2/3 flex-col ">
        <div className="relative w-full bg-blue-500" style={{ height: 500 }}>
          <Carousel autoplay style={{ height: '100%' }} adaptiveHeight={false}>
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
            <InfoCard loading={props.isLoading}>
              <Typography className="mb-4 text-3xl">Spark</Typography>
              <Rate disabled defaultValue={2} />
              <Typography className="mt-8 text-2xl">Description</Typography>
            </InfoCard>
          </Col>
          <Col md={8} className="p-4">
            <InfoCard className="">
              <Typography className="text-3xl">Owner info</Typography>
              <Skeleton loading={props.isLoading} avatar active></Skeleton>
            </InfoCard>
          </Col>
        </Row>
      </div>
    </InfoCard>
  );
}

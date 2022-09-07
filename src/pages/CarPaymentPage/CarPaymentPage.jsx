import React from 'react';
import Header from '../../components/Header';
import { Col, Row, Typography } from 'antd';
export default function CarPaymentPage() {
  return (
    <>
      <Header />
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <Row>
            <Col span={11}></Col>
            <Col>
              <Typography className='text-3xl'>Payment</Typography>
            </Col>
          </Row>
        </Col>
        <Col span={3}></Col>
      </Row>
    </>
  );
}

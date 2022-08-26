import { Card } from 'antd';
import React from 'react';

export default function InfoCard(props: any) {
  return (
    <Card
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
      }}
      loading={props.loading}
    >
      {props.children}
    </Card>
  );
}

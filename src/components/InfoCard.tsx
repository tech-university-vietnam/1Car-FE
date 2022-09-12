import { Card } from 'antd';
import React from 'react';

export default function InfoCard(props: {
  style?: React.CSSProperties;
  loading?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <Card
      style={{
        overflow: 'auto',
        marginBottom: 15,
        ...props.style,
      }}
      loading={props.loading}
      className="rounded-md"
    >
      {props.children}
    </Card>
  );
}

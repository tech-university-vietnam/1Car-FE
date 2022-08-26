import { Card } from "antd";
import React from "react";

export default function InfoCard(props: any) {
  return (
    <Card
      style={{
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      {props.children}
    </Card>
  );
}

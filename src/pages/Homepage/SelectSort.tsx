import React from 'react';
import { Select } from 'antd';

export default function SelectSort() {
  return (
    <div className="ml-auto w-48">
      <Select placeholder="Sort" className="w-full" size="large">
        <Select.Option value="price_asc">Low price first</Select.Option>
        <Select.Option value="price_dsc">High price first</Select.Option>
        <Select.Option value="rating">Rating</Select.Option>
        <Select.Option value="success_trip">Success trip</Select.Option>
      </Select>
    </div>
  );
}

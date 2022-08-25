import React from 'react';
import { Select } from 'antd';

export default function SelectFilter() {
  return (
    <div className="mr-2 mb-4 w-full basis-1/4 md:mr-4 md:mb-0 md:w-36 md:basis-1/6">
      <Select placeholder="Brand" className="w-full" size="large">
        <Select.Option value="Audi">Audi</Select.Option>
        <Select.Option value="Toyota">Toyota</Select.Option>
        <Select.Option value="Audi">Ferrari</Select.Option>
      </Select>
    </div>
  );
}

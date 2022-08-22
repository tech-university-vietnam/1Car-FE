import { Button, DatePicker, Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import React from 'react';

export default function SearchBar() {
  return (
    <div
      className="flex items-center justify-center bg-blue-100 py-20 bg-blend-darken md:py-28"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.45), 
          rgba(0, 0, 0, 0.45)
        ), url('/bg-search.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-5/6 min-w-fit items-center rounded-md bg-white p-4 shadow-md sm:flex sm:flex-row md:w-3/4 md:p-8 md:py-10">
        <div className="flex-1 flex-row p-2 md:basis-2/5">
          <div>Location:</div>
          <Input
            placeholder="Location"
            size="large"
            addonAfter={<EnvironmentOutlined />}
          ></Input>
        </div>
        <div className="flex-1 flex-row p-2 md:basis-1/6">
          <div>Start date:</div>
          <DatePicker
            placeholder="From"
            size="large"
            style={{ width: '100%' }}
          ></DatePicker>
        </div>
        <div className="flex-1 flex-row p-2 md:basis-1/6">
          <div>End date:</div>
          <DatePicker
            placeholder="To"
            size="large"
            style={{ width: '100%' }}
          ></DatePicker>
        </div>
        <div className="h-full basis-1/6 flex-row items-center justify-center p-2">
          <Button className="mt-2 w-full px-8 md:mt-5" size="large">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

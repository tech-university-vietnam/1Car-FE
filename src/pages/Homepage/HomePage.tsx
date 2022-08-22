import React from 'react';
import Header from '../../components/Header';
import { Button, Divider, Rate, Select } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import {
  TrademarkCircleOutlined,
  TeamOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons';
import SearchBar from './SearchBar';

export default function HomePage() {
  const cars = Array.from(Array(10).keys()); //TODO change this
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <SearchBar />
      <div className="my-4 flex h-full flex-col gap-4 md:m-8">
        <div className="flex min-h-fit w-full flex-wrap items-center justify-start px-4 md:flex-nowrap">
          <div className="mr-2 mb-4 w-full basis-1/4 md:mr-4 md:mb-0 md:w-36 md:basis-1/6">
            <Select placeholder="Brand" className="w-full" size="large">
              <Select.Option value="Audi">Audi</Select.Option>
              <Select.Option value="Toyota">Toyota</Select.Option>
              <Select.Option value="Audi">Ferrari</Select.Option>
            </Select>
          </div>
          <div className="mr-2 mb-4 w-full basis-1/4 md:mr-4 md:mb-0 md:w-36 md:basis-1/6">
            <Select placeholder="Type" className="w-full" size="large">
              <Select.Option value="6 Seats">SUV</Select.Option>
              <Select.Option value="4 Seats">Sport</Select.Option>
            </Select>
          </div>
          <div className="mr-2 mb-4 w-full basis-1/4 md:mr-4 md:mb-0 md:w-36 md:basis-1/6">
            <Select placeholder="Size" className="w-full" size="large">
              <Select.Option value="6 Seats">6 Seats</Select.Option>
              <Select.Option value="4 Seats">4 Seats</Select.Option>
              <Select.Option value="14 Seats">14 Seats</Select.Option>
            </Select>
          </div>
          <div className="mr-2 mb-4 w-full basis-1/4 md:mr-4 md:mb-0 md:w-36 md:basis-0">
            <Button className="w-full" size="large">
              Clear
            </Button>
          </div>
          <div className="ml-auto w-24">
            <Select placeholder="Sort" className="w-full" size="large">
              <Select.Option value="6 Seats">6 Seats</Select.Option>
              <Select.Option value="4 Seats">4 Seats</Select.Option>
              <Select.Option value="14 Seats">14 Seats</Select.Option>
            </Select>
          </div>
        </div>

        <div className="mt-3 px-4">
          <h1 className="text-2xl">123 Cars Found</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {cars.map((value, index) => (
              <div
                className="rounded-md p-4 shadow-md"
                style={{ backgroundColor: '#F9F9FB' }}
              >
                <div className="flex h-48 w-full max-w-full overflow-hidden">
                  <img
                    src="/demo-car.png"
                    alt="demo car"
                    className="mx-auto max-h-full max-w-full items-center justify-center"
                  />
                </div>
                <div className="my-4 flex items-center justify-start">
                  <div className="mr-6 flex items-center text-sm font-semibold opacity-70">
                    <TrademarkCircleOutlined className="mr-2 " />
                    Audi
                  </div>
                  <div className="mr-6 flex items-center text-sm font-semibold opacity-70">
                    <NodeIndexOutlined className="mr-2 " />
                    SUV
                  </div>
                  <div className="mr-6 flex items-center text-sm font-semibold opacity-70">
                    <TeamOutlined className="mr-2 " />5 seats
                  </div>
                </div>
                <div className="flex items-center justify-around rounded-md bg-slate-50 p-4 px-8 text-center shadow">
                  <div className="basis-1">
                    <p className="mb-1 font-light">Deposit</p>
                    <p className="mb-0 text-base font-bold">1000$</p>
                  </div>
                  <Divider type="vertical" />
                  <div className="basis-1">
                    <p className="mb-1 font-light">Limit</p>
                    <p className="mb-0 text-base font-bold">500Kms</p>
                  </div>
                  <Divider type="vertical" />
                  <div className="basis-1">
                    <p className="mb-1 text-xs font-light">Credit</p>
                    <p className="mb-0 text-base font-bold">Required</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex-1">
                    <p className="mb-2 text-sm font-normal text-gray-500">
                      123 Success trips
                    </p>
                    <p className="mb-2">
                      <Rate disabled defaultValue={2} />
                    </p>
                  </div>
                  <div className="flex-1 text-right text-3xl font-bold">
                    $350.0
                  </div>
                </div>
                <div className="my-2 mt-6">
                  <Button className="w-full" size="large" type="primary">
                    Rent now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer>
        <p className="mb-0 text-center text-xs text-gray-500">Team 1 - 1Car</p>
      </Footer>
    </div>
  );
}

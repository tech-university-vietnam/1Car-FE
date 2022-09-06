import { Divider, Rate, Button } from 'antd';
import {
  TrademarkCircleOutlined,
  TeamOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../redux/reducer/car';

export default function CarCard({ car }: { car: Car }) {
  const CardBodyAttribute = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => (
    <div className='basis-1'>
      <p className='mb-1 text-xs font-light'>{title}</p>
      <p className='mb-0 text-base font-bold'>{value}</p>
    </div>
  );

  let navigate = useNavigate();

  return (
    <div
      className='rounded-md p-4 shadow-md'
      style={{ backgroundColor: '#F9F9FB' }}
    >
      <div className='flex h-48 w-full max-w-full overflow-hidden'>
        <img
          src={car.images[0] || '/demo-car.png'}
          alt='demo car'
          className='mx-auto max-h-full max-w-full items-center justify-center'
        />
      </div>
      <div className='my-4 flex items-center justify-start'>
        <div className='mr-6 flex items-center text-sm font-semibold opacity-70'>
          <TrademarkCircleOutlined className='mr-2 ' />
          {car.attributes[0].value}
        </div>
        <div className='mr-6 flex items-center text-sm font-semibold opacity-70'>
          <NodeIndexOutlined className='mr-2 ' />
          {car.attributes[1]?.value || 'N/A'}
        </div>
        <div className='mr-6 flex items-center text-sm font-semibold opacity-70'>
          <TeamOutlined className='mr-2 ' />
          {car.attributes[2]?.value || 'N/A'}
        </div>
      </div>
      <div className='flex items-center justify-around rounded-md bg-slate-50 p-4 px-8 text-center shadow'>
        <CardBodyAttribute title='Deposit' value='1000$' />
        <Divider type='vertical' />
        <CardBodyAttribute title='Limit' value='500Kms' />
        <Divider type='vertical' />
        <CardBodyAttribute title='Credit' value='Required' />
      </div>
      <div className='mt-4 flex items-center'>
        <div className='flex-1'>
          <p className='mb-2 text-sm font-normal text-gray-500'>
            100 Success trips
          </p>
          <div className='mb-2'>
            <Rate disabled defaultValue={5} />
          </div>
        </div>
        <div className='flex-1 text-right text-3xl font-bold'>
          ${car.pricePerDate}
        </div>
      </div>
      <div className='my-2 mt-6'>
        <Button
          className='w-full'
          size='large'
          type='primary'
          onClick={() => navigate('/details/' + car.id)}
        >
          Rent now
        </Button>
      </div>
    </div>
  );
}

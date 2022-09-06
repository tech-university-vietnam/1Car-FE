import React from 'react';
import { Select } from 'antd';
import { Attribute, Type } from '../../redux/reducer/car';

export default function SelectFilter({
  type,
  data,
  currentFilterAttribute,
  updateFilter,
}: {
  type: Type;
  data: Attribute[];
  currentFilterAttribute: string[];
  updateFilter: (data: string) => void;
}) {
  const onChange = (value: string) => {
    updateFilter(value);
  };

  const currentId = currentFilterAttribute.find((item) =>
    data.map((item) => item.id).includes(item)
  );

  return (
    <div className='mr-2 mb-4 w-full basis-1/4 md:mr-4 md:mb-0 md:w-36 md:basis-1/6'>
      <Select
        placeholder={type.type}
        className='w-full'
        size='large'
        onChange={onChange}
        value={currentId}
      >
        {data.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.value}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}

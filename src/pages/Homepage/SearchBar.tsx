import { EnvironmentOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { geocodeByPlaceId } from 'react-google-places-autocomplete';

const defaultLocationValue = {
  label: 'Hồ Chí Minh, Thành phố Hồ Chí Minh, Việt Nam',
  value: {
    description: 'Hồ Chí Minh, Thành phố Hồ Chí Minh, Việt Nam',
    matched_substrings: [
      {
        length: 11,
        offset: 0,
      },
    ],
    place_id: 'ChIJ0T2NLikpdTERKxE8d61aX_E',
    reference: 'ChIJ0T2NLikpdTERKxE8d61aX_E',
    structured_formatting: {
      main_text: 'Hồ Chí Minh',
      main_text_matched_substrings: [
        {
          length: 11,
          offset: 0,
        },
      ],
      secondary_text: 'Thành phố Hồ Chí Minh, Việt Nam',
    },
    terms: [
      {
        offset: 0,
        value: 'Hồ Chí Minh',
      },
      {
        offset: 13,
        value: 'Thành phố Hồ Chí Minh',
      },
      {
        offset: 36,
        value: 'Việt Nam',
      },
    ],
    types: ['locality', 'political', 'geocode'],
  },
};

export default function SearchBar() {
  const [startDate, setStartDate] = useState<string | undefined>('');
  const [endDate, setEndDate] = useState<string | undefined>('');
  const [location, setLocation] = useState(defaultLocationValue);

  const disabledStartDate: RangePickerProps['disabledDate'] = (
    current: any
  ) => {
    return current && current < moment().startOf('day');
  };

  const disabledEndDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current < moment(startDate || Date.now()).startOf('day');
  };

  const handleFilter = () => {
    console.log(startDate, endDate, location);
    geocodeByPlaceId(location.value.place_id)
      .then((results) => console.log(results))
      .catch((error) => console.error(error));
  };

  return (
    <div
      className='flex items-center justify-center bg-blue-100 py-20 bg-blend-darken md:py-28'
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
      <div className='w-5/6 min-w-fit items-center rounded-md bg-white p-4 shadow-md sm:flex sm:flex-row md:w-3/4 md:p-8 md:py-10'>
        <div className='flex-1 flex-row p-2 md:basis-2/5'>
          <div>Location:</div>
          {/* <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GG_API_KEY}
            selectProps={{
              value: location,
              onChange: setLocation,
            }}
          /> */}
        </div>
        <div className='flex-1 flex-row p-2 md:basis-1/6'>
          <div>Start date:</div>
          <DatePicker
            placeholder='From'
            size='large'
            style={{ width: '100%' }}
            disabledDate={disabledStartDate}
            onChange={(data) => {
              setEndDate('');
              setStartDate(data?.toLocaleString());
            }}
          ></DatePicker>
        </div>
        <div className='flex-1 flex-row p-2 md:basis-1/6'>
          <div>End date:</div>
          <DatePicker
            placeholder='To'
            size='large'
            style={{ width: '100%' }}
            disabledDate={disabledEndDate}
            onChange={(data) => setEndDate(data?.toLocaleString())}
          ></DatePicker>
        </div>
        <div className='h-full basis-1/6 flex-row items-center justify-center p-2'>
          <Button
            className='mt-2 w-full px-8 md:mt-5'
            size='large'
            onClick={handleFilter}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}

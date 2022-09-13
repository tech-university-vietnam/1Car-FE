import {
  Typography,
  Divider,
  Row,
  Col,
  Button,
  DatePicker,
  Checkbox,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from '../../redux/reducer/car';
import { formatCurrency, calculateDatesBetween } from '../../utils/utils';

import GoogleMapReact from 'google-map-react';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

const AnyReactComponent = ({
  text,
  lat,
  lng,
}: {
  text: string;
  lat: number;
  lng: number;
}) => <div>{text}</div>;

interface bookingProps {
  car: Car;
  startDate: string;
  endDate: string;
  location: string;
  buttonLoading: boolean;
  setButtonLoading: (loading: boolean) => void;
  createBooking: (id: string, isSkip: boolean) => void;
}
export default function BookingConfirmation({
  car,
  startDate,
  endDate,
  buttonLoading,
  setButtonLoading,
  createBooking,
  location,
}: bookingProps) {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);
  const [locationLongLat, setLocationLongLat] = useState({
    lat: 10.806786,
    lng: 106.661442,
  });

  useEffect(() => {
    if (location) {
      console.log(location);
      geocodeByPlaceId(location)
        .then(async (results) => {
          setLocationLongLat(results[0].geometry.location.toJSON());
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const defaultProps = {
    center: locationLongLat,
    zoom: 11,
  };

  return (
    <div className='flex flex-col space-y-8'>
      <Typography.Title level={3} className='m-auto'>
        Booking confirmation
      </Typography.Title>
      <Divider />
      <Row gutter={8}>
        <Col md={8}>
          {car.images ? (
            <img
              src={car.images[0]}
              alt='your car'
              className='mb-4 h-auto w-5/6'
            />
          ) : (
            <></>
          )}
          <Typography.Title level={4}>{car.name}</Typography.Title>
        </Col>
        <Col span={16}>
          <Row gutter={24}>
            <Typography.Title level={5}>Duration:</Typography.Title>
          </Row>
          <Row gutter={24} className=''>
            <DatePicker.RangePicker
              ranges={
                {
                  // Today: [moment(), moment()],
                  // 'This Month': [
                  //   moment().startOf('month'),
                  //   moment().endOf('month'),
                  // ],
                }
              }
              defaultValue={[
                moment(new Date(startDate), 'DD/MM/YYYY'),
                moment(new Date(endDate), 'DD/MM/YYYY'),
              ]}
              format='DD/MM/YYYY'
              disabled
            />
          </Row>
          <Row gutter={24} className='mt-4'>
            <Typography.Title level={5}>Pickup location:</Typography.Title>
          </Row>
          <Row gutter={24} className=''>
            <div style={{ height: '300px', width: '90%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GG_API_KEY! }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                <AnyReactComponent
                  lat={locationLongLat?.lat}
                  lng={locationLongLat?.lng}
                  text='My Marker'
                />
              </GoogleMapReact>
            </div>
            {/* </div> */}
          </Row>
        </Col>
      </Row>
      <Divider />
      <Typography.Title level={5}>Description</Typography.Title>
      <TextArea
        rows={5}
        placeholder='Enter your note'
        maxLength={200}
        showCount
      />
      <Divider />
      <div>
        <Typography.Title level={5}>Booking detail</Typography.Title>
        <ul>
          <li className='flex items-center justify-between'>
            <span>Number of days:</span>{' '}
            <span className='text-md ml-auto inline-block font-semibold'>
              {calculateDatesBetween(startDate, endDate)} days
            </span>
          </li>
          <li className='flex items-center justify-between'>
            <span>Price per day:</span>{' '}
            <span className='text-md ml-auto inline-block font-semibold'>
              {car.pricePerDate}$
            </span>
          </li>
          <li className='flex items-center justify-between'>
            <span>Insurance:</span>{' '}
            <span className='text-md ml-auto inline-block font-semibold'>
              0$
            </span>
          </li>
          <li className='flex items-center justify-between'>
            <span>Flexible pickup:</span>{' '}
            <span className='text-md ml-auto inline-block font-semibold'>
              0$
            </span>
          </li>
          <li className='flex items-center justify-between'>
            <span>Sub total:</span>{' '}
            <span className='text-md ml-auto inline-block font-semibold'>
              {formatCurrency(
                calculateDatesBetween(startDate, endDate) * car.pricePerDate
              )}
            </span>
          </li>
        </ul>
      </div>
      <div className='flex w-full'>
        <Typography.Title level={5}>Total</Typography.Title>
        <div className='ml-auto text-2xl'>
          {formatCurrency(
            calculateDatesBetween(startDate, endDate) * car.pricePerDate
          )}
        </div>
      </div>
      <div>
        <Checkbox
          onChange={(e: any) => setAccepted(e.target.checked)}
          checked={accepted}
        >
          Agree to <a href='#'>terms</a> and <a href='#'>conditions.</a>
        </Checkbox>
      </div>
      <div className='ml-auto space-x-4'>
        <Button size='large' onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button
          size='large'
          loading={buttonLoading}
          onClick={() => {
            setButtonLoading(true);
            createBooking(car.id ?? '', false);
          }}
          type='primary'
          disabled={!accepted}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

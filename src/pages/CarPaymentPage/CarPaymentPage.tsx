import { Checkbox, DatePicker, Divider, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getUserInformationAction } from '../../redux/reducer/user';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getBookingDataAction } from '../../redux/reducer/booking';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import { getCar, postBooking } from '../../apis';
import { Car } from '../../redux/reducer/car';
import { Row, Col } from 'antd';
import BookingConfirmation from './BookingConfirmation';
export default function CarPaymentPage() {
  const dispatch = useAppDispatch();
  const { carId } = useParams() ?? '';
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [car, setCar] = useState<Car>();

  const userData = useAppSelector((state) => state.user.info);

  const startDate = searchParams.get('start') ?? '';
  const endDate = searchParams.get('end') ?? '';
  const receivedDateTime = new Date(startDate).toISOString();
  const returnDateTime = new Date(endDate).toISOString();

  //send request to booking creation api and receive a redirect link
  const createBooking = async (carId: string) => {
    const requestData = {
      carId,
      returnDateTime,
      receivedDateTime,
      pickUpLocationId: '47964507-b206-4afd-b874-e9ba1bf6a944',
    };
    try {
      const response = await postBooking(requestData);
      window.location.href = response;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // If there is not a user, do not allow access this page
    if (userData) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }
  }, [userData]);

  //Get car infomartion and load user information
  useEffect(() => {
    (async () => {
      const c = await getCar(carId ?? '');
      setCar(c);
      dispatch(getUserInformationAction());
      dispatch(getBookingDataAction());
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Header />
      {car ? (
        <div className=' m-auto mt-8 w-3/4 p-8'>
          <Row gutter={16}>
            <Col span={8}>
              <InfoCard>
                {isLoading || !isAllowed ? (
                  <div>No user detected</div>
                ) : (
                  <div className='flex flex-col space-y-8'>
                    <Typography.Title level={3} className='m-auto'>
                      Add-ons
                    </Typography.Title>
                    <Divider />
                    <div className='flex flex-col'>
                      <Checkbox>Vehical Insurance</Checkbox>
                      <br />
                      <Checkbox>Life Insurance</Checkbox>
                      <br />
                      <Checkbox>Flexible pickup</Checkbox>
                      <br />
                    </div>
                  </div>
                )}
              </InfoCard>
            </Col>
            <Col span={16}>
              <InfoCard loading={isLoading}>
                {isLoading || !isAllowed ? (
                  <></>
                ) : (
                  <BookingConfirmation
                    car={car}
                    startDate={startDate}
                    endDate={endDate}
                    buttonLoading={buttonLoading}
                    setButtonLoading={setButtonLoading}
                    createBooking={createBooking}
                  />
                )}
              </InfoCard>
            </Col>
          </Row>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

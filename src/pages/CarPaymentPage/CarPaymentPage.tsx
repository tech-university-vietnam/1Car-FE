import { Checkbox, Divider, Radio, Typography } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getUserInformationAction, UserRole } from '../../redux/reducer/user';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getBookingDataAction } from '../../redux/reducer/booking';
import Header from '../../components/Header';
import InfoCard from '../../components/InfoCard';
import { getCar, postBooking } from '../../apis';
import { Car } from '../../redux/reducer/car';
import { Row, Col } from 'antd';
import BookingConfirmation from './BookingConfirmation';
import UpdateUserModal from '../../components/UpdateUserModal';
import SecurityLayout from '../../components/Layout/SecurityLayout';
export default function CarPaymentPage() {
  const dispatch = useAppDispatch();
  const { carId } = useParams() ?? '';
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [car, setCar] = useState<Car>();
  const ref = useRef<any>(null);

  const userData = useAppSelector((state) => state.user.info);

  const startDate = searchParams.get('start') ?? '';
  const endDate = searchParams.get('end') ?? '';
  const location = searchParams.get('location') ?? '';
  const receivedDateTime = new Date(startDate).toISOString();
  const returnDateTime = new Date(endDate).toISOString();

  //send request to booking creation api and receive a redirect link

  const createBooking = async (carId: string, isSkip = false) => {
    const requestData = {
      carId,
      returnDateTime,
      receivedDateTime,
      pickUpLocationId: location,
    };

    try {
      if (!isSkip && !userData.dateOfBirth) {
        ref?.current.open(() => {});
      } else {
        const response = await postBooking(requestData);
        window.location.href = response;
      }
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
    <SecurityLayout role={[UserRole.USER, UserRole.ADMIN]} fallback='/'>
      <Header />
      {car ? (
        <div className='mx-auto mt-8 w-full p-8 md:w-3/4'>
          <Row gutter={{ md: 16, sm: 0 }}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <InfoCard>
                {isLoading || !isAllowed ? (
                  <div>No user detected</div>
                ) : (
                  <div className='flex flex-col space-y-8'>
                    <Typography.Title level={4} className='m-auto'>
                      Add ons
                    </Typography.Title>
                    <Divider />
                    <div className='flex flex-col'>
                      <div className='flex items-center justify-between'>
                        <Checkbox>
                          <span>Vehicle Insurance</span>
                        </Checkbox>
                        <span className='ml-auto inline-block'>0$</span>{' '}
                      </div>
                      <br />
                      <div className='flex items-center justify-between'>
                        <Checkbox>
                          <span>Life Insurance</span>
                        </Checkbox>
                        <span className='ml-auto inline-block'>0$</span>{' '}
                      </div>
                      <br />
                      <div className='flex items-center justify-between'>
                        <Checkbox>
                          <span>Flexible pickup</span>
                        </Checkbox>
                        <span className='ml-auto inline-block'>0$</span>{' '}
                      </div>
                      <br />
                    </div>
                  </div>
                )}
              </InfoCard>
              <InfoCard>
                {isLoading || !isAllowed ? (
                  <div>No user detected</div>
                ) : (
                  <div className='flex flex-col space-y-8'>
                    <Typography.Title level={4} className='m-auto'>
                      Payment method
                    </Typography.Title>
                    <Divider />
                    <div className='flex flex-col'>
                      <div className='mb-3 flex w-full items-center rounded-lg border-2 border-gray-200 p-4'>
                        <img
                          alt='credit-card'
                          src='/credit-card.png'
                          className='mr-4 w-10'
                        />
                        <span className='font-semibold text-gray-500'>
                          Credit Card
                        </span>
                        <div className='ml-auto'>
                          <Radio name='payment' value='card' checked disabled />
                        </div>
                      </div>
                      <div className='mb-3 flex w-full items-center rounded-lg border-2 border-gray-200 p-4 opacity-40'>
                        <img
                          alt='money'
                          src='/money.png'
                          className='mr-4 w-10'
                        />
                        <span className='font-semibold text-gray-500'>
                          Cash
                        </span>
                        <div className='ml-auto'>
                          <Radio name='payment' checked disabled />
                        </div>
                      </div>
                      <div className='mb-3 flex w-full items-center rounded-lg border-2 border-gray-200 p-4 opacity-40'>
                        <img
                          alt='wallet'
                          src='/wallet.png'
                          className='mr-4 w-10'
                        />
                        <span className='font-semibold text-gray-500'>
                          E-Wallet
                        </span>
                        <div className='ml-auto'>
                          <Radio name='payment' checked disabled />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </InfoCard>
            </Col>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
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
                    location={location}
                  />
                )}
              </InfoCard>
            </Col>
          </Row>
          <UpdateUserModal
            ref={ref}
            onSuccess={() => createBooking(carId!, true)}
          />
        </div>
      ) : (
        <></>
      )}
    </SecurityLayout>
  );
}

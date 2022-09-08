import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { Descriptions, Spin, Table } from 'antd';
import EditButton from '../../components/EditButton';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import UpdateUserModal from '../../components/UpdateUserModal';
import { getUserInformationAction, UserRole } from '../../redux/reducer/user';
import { useAppDispatch, useAppSelector } from '../../redux';
import { BookingData, getBookingDataAction } from '../../redux/reducer/booking';
import SecurityLayout from '../../components/Layout/SecurityLayout';

function UserPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  const bookingData = useAppSelector((state) => state.booking.bookings);
  const userData = useAppSelector((state) => state.user.info);
  const { user } = useAuth0();
  const modalRef: React.RefObject<any> = React.createRef();

  // On click edit user info button
  const onEdit = () => {
    modalRef.current?.open();
  };

  // Load essential information
  useEffect(() => {
    dispatch(getUserInformationAction());
    dispatch(getBookingDataAction());
    setLoading(true);
    setLoading(false);
  }, [dispatch]);

  // Prepare booking column for table
  const bookingColumns: ColumnsType<BookingData> = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
    },
    {
      title: 'Booking Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Car Information',
      dataIndex: 'carInfo',
      key: 'carInfo',
    },
  ];

  return (
    <div className='min-h-screen'>
      {loading ? (
        <Spin />
      ) : (
        <div>
          <Header />
          <div className='mx-5 h-screen bg-neutral-100 px-5 pt-5 sm:mx-5 sm:my-10 sm:h-1/2 sm:w-full sm:py-10 lg:w-3/4'>
            <Descriptions title='Your information'>
              <Descriptions.Item label='Name'>
                {userData.name}
              </Descriptions.Item>
              <Descriptions.Item label='Email'>
                {user?.email || userData.email}
              </Descriptions.Item>
              <Descriptions.Item label='Phone'>
                {userData.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label='Date Of Birth'>
                {userData.dateOfBirth}
              </Descriptions.Item>
              <Descriptions.Item>
                {
                  <EditButton
                    label='Edit your information'
                    onClickFunction={onEdit}
                  />
                }
              </Descriptions.Item>
            </Descriptions>
          </div>
          <UpdateUserModal ref={modalRef} isEdit={true} user={userData} />
          <div className='mx-5'>
            <Table columns={bookingColumns} dataSource={bookingData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserPageWithSecurity() {
  return (
    <SecurityLayout role={[UserRole.USER]} fallback='/'>
      <UserPage />
    </SecurityLayout>
  );
}

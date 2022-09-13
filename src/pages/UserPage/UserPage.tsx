import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Avatar, Descriptions, Modal, Spin, Table, Typography } from 'antd';
import EditButton from '../../components/EditButton';
import { useAuth0 } from '@auth0/auth0-react';
import { ColumnsType } from 'antd/lib/table';
import UpdateUserModal from '../../components/UpdateUserModal';
import { getUserInformationAction, UserRole } from '../../redux/reducer/user';
import { useAppDispatch, useAppSelector } from '../../redux';
import { BookingData, getBookingDataAction } from '../../redux/reducer/booking';
import SecurityLayout from '../../components/Layout/SecurityLayout';
import InfoCard from '../../components/InfoCard';
import moment from 'moment';
import BookingDetail from '../AdminPage/BookingDetail';

function UserPage() {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = React.useState(true);
  const bookingData = useAppSelector((state) => state.booking.bookings);
  const userData = useAppSelector((state) => state.user.info);
  const { user } = useAuth0();
  const modalRef: React.RefObject<any> = React.createRef();
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [visible, setVisible] = useState(false);

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
      ellipsis: true,
      width: 150,
    },
    {
      title: 'Booking Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value) => <span>{moment(value).toLocaleString()}</span>,
    },
    {
      title: 'Payment Status',
      dataIndex: 'bookingStatus',
      key: 'bookingStatus',
      width: 200,
    },
    {
      title: 'Car Information',
      dataIndex: 'car',
      key: 'car',
      width: 200,
      render: (car) => <a href={`/details/${car?.id}`}>{car?.name}</a>,
    },
    {
      title: 'Pickup Status',
      dataIndex: 'pickUpStatus',
      width: 200,
      key: 'pickUpStatus',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <div>
          <a
            onClick={() => {
              setCurrentBooking(record);
              setVisible(true);
            }}
          >
            View
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className='min-h-screen'>
      {loading ? (
        <Spin />
      ) : (
        <div className=''>
          <Header />
          <div className='min-h-screen w-full py-4'>
            <div className='mx-auto w-5/6 md:w-3/4'>
              <InfoCard>
                <Typography.Title level={5}>Your Information</Typography.Title>
                <div className='block items-center py-8 md:flex'>
                  <div className='my-2 mr-8 md:my-0'>
                    <Avatar
                      size={120}
                      src='https://joeschmoe.io/api/v1/random'
                    />
                  </div>
                  <Descriptions>
                    <Descriptions.Item label='Name'>
                      {userData.name}
                    </Descriptions.Item>
                    <Descriptions.Item label='Email'>
                      {user?.email || userData.email}
                    </Descriptions.Item>
                    <Descriptions.Item label='Phone'>
                      {userData.phoneNumber || 'N/A'}
                    </Descriptions.Item>
                    <Descriptions.Item label='Date Of Birth'>
                      {userData.dateOfBirth || 'N/A'}
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
              </InfoCard>
            </div>
            <div className='mx-auto mt-8 w-5/6 overflow-auto bg-white p-6 md:w-3/4'>
              <Typography.Title level={5}>
                Your booking history
              </Typography.Title>
              <Table columns={bookingColumns} dataSource={bookingData} />
            </div>
            <UpdateUserModal ref={modalRef} isEdit={true} user={userData} />
          </div>
        </div>
      )}

      <Modal
        title='Booking detail'
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        width='75%'
      >
        <BookingDetail booking={currentBooking} />
      </Modal>
    </div>
  );
}

export default function UserPageWithSecurity() {
  return (
    <SecurityLayout role={[UserRole.USER, UserRole.ADMIN]} fallback='/'>
      <UserPage />
    </SecurityLayout>
  );
}

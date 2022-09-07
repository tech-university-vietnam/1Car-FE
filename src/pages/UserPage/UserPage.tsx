import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { UserData } from './models/UserData';
import { Descriptions, Spin, Table } from 'antd';
import EditButton from '../../components/EditButton';
import { useAuth0 } from '@auth0/auth0-react';
import UpdateUserModal from '../../components/UpdateUserModal';
import { useNavigate } from 'react-router-dom';
import { BookingData, mockBookingData } from './models/BookingData';
import { ColumnsType } from 'antd/lib/table';
import authApi from '../../apis/authApi';

export default function UserPage() {
  const [userData, setUserData] = React.useState(new UserData(null));
  const [bookingData, setBookingData] = React.useState<BookingData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth0();
  const modalRef: React.RefObject<any> = React.createRef();

  const onEdit = () => {
    modalRef.current?.open();
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await authApi.get('/user/me');
        setUserData(res.data.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    const getBookingData = async () => {
      //const bookingData: any = await authApi.get('/booking');
      setBookingData(mockBookingData);
    };
    setLoading(true);
    getUserInfo();
    getBookingData();
    setLoading(false);
  }, []);

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
              <Descriptions.Item label='Email'>{user?.email}</Descriptions.Item>
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

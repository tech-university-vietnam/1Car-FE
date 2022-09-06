import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { UserData } from './models/UserData';
import { Descriptions, Spin, Table, Tag } from 'antd';
import EditButton from '../../components/EditButton';
import authApi from '../../api/axiosConfig';
import { useAuth0 } from '@auth0/auth0-react';
import useWindowDimensions from '../../hooks/useWindowDimensions.hooks';
import UpdateUserModal from '../../components/UpdateUserModal';
import { useNavigate } from 'react-router-dom';
import { BookingData, mockBookingData } from './models/BookingData';
import { ColumnsType, ColumnType } from 'antd/lib/table';

export default function UserPage() {
  const [userData, setUserData] = React.useState(new UserData(null));
  const [bookingData, setBookingData] = React.useState<BookingData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth0();
  const { height, width } = useWindowDimensions();
  const modalRef: React.RefObject<any> = React.createRef();

  const onEdit = () => {
    modalRef.current?.open();
  };

  const navigate = useNavigate();
  if (!user) {
    navigate('/');
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const userData: UserData = await authApi.get('/user/me');
      setUserData(userData);
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
    <div className="min-h-screen">
      {loading ? (
        <Spin />
      ) : (
        <div>
          <Header />
          <div className="mx-5 h-screen bg-neutral-100 px-5 pt-5 sm:mx-5 sm:my-10 sm:h-1/2 sm:w-full sm:py-10 lg:w-3/4">
            <Descriptions title="Your information">
              <Descriptions.Item label="Name">
                {userData.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">
                {userData.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Date Of Birth">
                {userData.dateOfBirth}
              </Descriptions.Item>
              <Descriptions.Item>
                {
                  <EditButton
                    label="Edit your information"
                    onClickFunction={onEdit}
                  />
                }
              </Descriptions.Item>
            </Descriptions>
          </div>
          <UpdateUserModal ref={modalRef} isEdit={true} user={userData} />
          <div className="mx-5">
            <Table columns={bookingColumns} dataSource={bookingData} />
          </div>
        </div>
      )}
    </div>
  );
}

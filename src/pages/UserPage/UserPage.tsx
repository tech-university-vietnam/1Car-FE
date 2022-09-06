import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { UserData } from '../../models/UserData';
import { Avatar } from 'antd';
import EditButton from '../../components/EditButton';
import authApi from '../../api/axiosConfig';
import { useAuth0 } from '@auth0/auth0-react';
import useWindowDimensions from '../../hooks/useWindowDimensions.hooks';
import UpdateUserModal from '../../components/UpdateUserModal';

export default function UserPage() {
  const [userData, setUserData] = React.useState(new UserData(null));
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth0();
  const { height, width } = useWindowDimensions();
  const modalRef: React.RefObject<any> = React.createRef();

  const onEdit = () => {
    modalRef.current?.open();
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userData: UserData = await authApi.get('/user/me');
      setUserData(userData);
    };
    getUserInfo();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="h-screen bg-teal-100 sm:mx-auto sm:my-10 sm:h-1/2 sm:w-full sm:py-10 lg:w-3/4">
        <h1 className="text-center font-bold">Your information</h1>
        <div className="mx-auto flex h-1/2 rounded-md bg-teal-500 sm:w-full sm:px-10 sm:py-10 lg:w-3/4">
          <div className="flex-none self-center">
            <Avatar className="mx-auto" src={user?.picture} size={50}>
              {userData.name}
            </Avatar>
          </div>
          <div className="mx-auto flex-initial self-center">
            <p>
              <em>Name:</em> {userData.name}
            </p>
            <p>
              <em>Email:</em> {user?.email}
            </p>
            <p>
              <em>Phone number:</em> {userData.phoneNumber}
            </p>
            <p>
              <em>Date of birth:</em> {userData.dateOfBirth}
            </p>
          </div>
          <div className="flex-1 pr-2 sm:mx-auto">
            <EditButton
              label={width > 700 ? 'Edit your information' : ''}
              onClickFunction={onEdit}
            />
          </div>
          <UpdateUserModal ref={modalRef} isEdit={true} user={userData} />
        </div>
      </div>
    </div>
  );
}

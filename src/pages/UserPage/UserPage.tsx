import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { UserData } from '../../models/UserData';
import { Avatar, Spin } from 'antd';
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
    setLoading(true);
    getUserInfo();
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        <Spin />
      ) : (
        <div>
          <Header />
          <div className="h-screen bg-teal-100 sm:mx-auto sm:my-10 sm:h-1/2 sm:w-full sm:py-10 lg:w-3/4">
            <h1 className="pt-3 text-center font-bold">Your information</h1>
            <div className="mx-auto my-8 flex h-3/4 self-center rounded-md bg-teal-500 sm:w-full sm:px-10 sm:py-10 lg:w-3/4">
              <div className="flex-none self-center">
                <Avatar className="mx-auto" src={user?.picture} size={50}>
                  {userData.name}
                </Avatar>
              </div>
              <div className="lg:px-15 mx-auto flex-initial self-center px-3 sm:px-10">
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
              <div className="flex-1 self-center pr-2 sm:mx-auto">
                <EditButton
                  label={width > 700 ? 'Edit your information' : ''}
                  onClickFunction={onEdit}
                />
              </div>
              <UpdateUserModal ref={modalRef} isEdit={true} user={userData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

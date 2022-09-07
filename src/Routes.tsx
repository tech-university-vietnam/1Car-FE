import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import UpdateUserModal from './components/UpdateUserModal';
import AdminPage from './pages/AdminPage/AdminPage';
import CarDetailPage from './pages/CarDetailPage/CarDetailPage';
import HomePage from './pages/Homepage/HomePage';
import UserPage from './pages/UserPage/UserPage';
import { useAuth0 } from '@auth0/auth0-react';
import authApi from './apis/authApi';
import { ExceptionMessage } from './apis/exceptionMessage';

export default function AppRouters() {
  const userInfo = localStorage.getItem('userEmail');
  const modalRef: React.RefObject<any> = React.createRef();
  const { user } = useAuth0();

  useEffect(() => {
    if (!userInfo) {
      // Check if this user has full data or not
      const checkIsFirstTimeLogin = async () => {
        try {
          const res = await authApi.get('/user/me');
          localStorage.setItem('userEmail', res.data?.data?.email);
        } catch (error: any) {
          if (
            error?.response?.data?.message ===
            ExceptionMessage.USER_NEED_UPDATE_INFO
          ) {
            modalRef?.current.open();
          }
        }
      };
      checkIsFirstTimeLogin();
    }
  }, [userInfo, modalRef, user]);

  return (
    <>
      <UpdateUserModal ref={modalRef} />
      <Routes>
        <Route path='/user' element={<UserPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='*' element={<HomePage />} />
        <Route path='/details/:id' element={<CarDetailPage />} />
      </Routes>
    </>
  );
}

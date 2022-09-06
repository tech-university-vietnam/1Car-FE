import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import UpdateUserModal from './components/UpdateUserModal';
import AdminPage from './pages/AdminPage/AdminPage';
import HomePage from './pages/Homepage/HomePage';
import UserPage from './pages/UserPage/UserPage';
import authApi from './api/axiosConfig';
import { useAuth0 } from '@auth0/auth0-react';

export default function AppRouters() {
  const userInfo = localStorage.getItem('userInfo');
  const modalRef: React.RefObject<any> = React.createRef();
  const { user } = useAuth0();

  useEffect(() => {
    if (!userInfo) {
      // Check if it is first time login user
      const checkIsFirstTimeLogin = async () => {
        try {
          const res: { isFirstTime: boolean } = await authApi.get(
            '/user/is-first-time'
          );
          if (res.isFirstTime) {
            // Open modal to ask user to fill in updated user info
            console.log(user);
            const createUserPromise = await authApi.post('/user', {
              username: user?.name,
              email: user?.email,
            });
            console.log(user);
            modalRef.current?.open();
          }
        } catch (error: any) {
          console.log(error.message);
        }
      };
      checkIsFirstTimeLogin();
    }
  }, [userInfo, modalRef, user]);

  return (
    <>
      <UpdateUserModal ref={modalRef} />
      <Routes>
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

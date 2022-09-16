import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Cookies from 'universal-cookie';
import AdminPage from './pages/AdminPage/AdminPage';
import CarDetailPage from './pages/CarDetailPage/CarDetailPage';
import CarPaymentPage from './pages/CarPaymentPage/CarPaymentPage';
import HomePage from './pages/Homepage/HomePage';
import PaymentFailedPage from './pages/PaymentFailedPage/PaymentFailedPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage/PaymentSuccessPage';
import UserPage from './pages/UserPage/UserPage';
import { useAppDispatch } from './redux';
import { getUserInformationAction } from './redux/reducer/user';
import MorePage from './pages/AdditionalPage/MorePage';
import AboutPage from './pages/AdditionalPage/AboutPage';

export default function AppRouters() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const cookies = new Cookies();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: 'read:current_user',
          });
          cookies.set('access_token', accessToken, { path: '/' });
          getMe(accessToken);
        }
      } catch (e: any) {
        console.log(e.message);
      } finally {
      }
    };
    getAccessToken();
  }, [getAccessTokenSilently, domain, isAuthenticated]);

  const getMe = async (token: string) => {
    dispatch(getUserInformationAction(token));
  };

  return (
    <Routes>
      <Route path='/user' element={<UserPage />} />
      <Route path='/admin/*' element={<AdminPage />} />
      <Route path='/details/:id' element={<CarDetailPage />} />
      <Route path='/booking/:id/success' element={<PaymentSuccessPage />} />
      <Route path='/booking/failed' element={<PaymentFailedPage />} />
      <Route path='/payments/:carId' element={<CarPaymentPage />} />
      <Route path='/more' element={<MorePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='*' element={<HomePage />} />
    </Routes>
  );
}

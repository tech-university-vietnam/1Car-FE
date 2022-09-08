import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage/AdminPage';
import CarDetailPage from './pages/CarDetailPage/CarDetailPage';
import CarPaymentPage from './pages/CarPaymentPage/CarPaymentPage';
import HomePage from './pages/Homepage/HomePage';
import UserPage from './pages/UserPage/UserPage';

export default function AppRouters() {
  return (
    <>
      <Routes>
        <Route path='/user' element={<UserPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/details/:id' element={<CarDetailPage />} />
        <Route path='/payments/:carId' element={<CarPaymentPage />} />
        <Route path='*' element={<HomePage />} />
      </Routes>
    </>
  );
}

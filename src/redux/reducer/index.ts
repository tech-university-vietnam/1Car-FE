import { combineReducers } from '@reduxjs/toolkit';
import carReducer from './car';
import userReducer from './user';
import bookingReducer from './booking';

export default combineReducers({
  car: carReducer,
  user: userReducer,
  booking: bookingReducer,
});

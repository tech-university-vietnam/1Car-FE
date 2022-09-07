import { combineReducers } from '@reduxjs/toolkit';
import carReducer from './car';
import userReducer from './user';

export default combineReducers({
  car: carReducer,
  user: userReducer,
});

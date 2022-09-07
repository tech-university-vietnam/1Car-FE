import { combineReducers } from '@reduxjs/toolkit';
import carReducer from './car';

export default combineReducers({
  car: carReducer,
});

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../apis';
import { Car } from './car';
import { User } from './user';
export interface BookingData {
  id: string;
  userId: string;
  carId: string;
  receivedDateTime: string;
  returnDateTime: string;
  pickUpLocationId: string;
  totalPrice: number;
  description?: any;
  discountCode?: any;
  transactionId?: any;
  bookingStatus: string;
  pickUpStatus: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  car: Car;
  user: User;
}

export const mockBookingData: BookingData[] = [];

const initialState: {
  bookings: BookingData[];
  allBooking: BookingData[];
} = {
  bookings: [],
  allBooking: [],
};

export const getBookingDataAction = createAsyncThunk(
  'booking/getBookings',
  async (payload, thunkApi) => {
    const res = await api.getBookingData();
    thunkApi.dispatch(getBookingData(res));
  }
);

export const getAllBookingForAdminAction = createAsyncThunk(
  'booking/getBookingForAdmin',
  async (payload, thunkApi) => {
    const res = await api.getAllBookingForAdmin();
    thunkApi.dispatch(getAllBookingForAdmin(res));
  }
);

const bookingSlice = createSlice({
  name: 'bookingData',
  initialState,
  reducers: {
    getBookingData: (state, action: PayloadAction<BookingData[]>) => {
      state.bookings = action.payload;
    },
    getAllBookingForAdmin: (state, action: PayloadAction<BookingData[]>) => {
      state.allBooking = action.payload;
    },
  },
});

export const { getBookingData, getAllBookingForAdmin } = bookingSlice.actions;
export default bookingSlice.reducer;

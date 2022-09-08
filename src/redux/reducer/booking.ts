import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../apis';

export interface BookingData {
  id: number;
  bookingDate: string;
  carInfo: string;
  status: string;
}

export const mockBookingData: BookingData[] = [
  {
    id: 1,
    bookingDate: '2020-01-01',
    carInfo: 'test car info',
    status: 'test status',
  },
  {
    id: 2,
    bookingDate: '2020-01-02',
    carInfo: 'test car info',
    status: 'test status',
  },
];

const initialState: {
  bookings: BookingData[];
} = {
  bookings: [],
};

export const getBookingDataAction = createAsyncThunk(
  'booking/getBookings',
  async (payload, thunkApi) => {
    const res = await api.getBookingData();
    thunkApi.dispatch(getBookingData(res));
  }
);

const bookingSlice = createSlice({
  name: 'bookingData',
  initialState,
  reducers: {
    getBookingData: (state, action: PayloadAction<BookingData[]>) => {
      state.bookings = action.payload;
    },
  },
});

export const { getBookingData } = bookingSlice.actions;
export default bookingSlice.reducer;

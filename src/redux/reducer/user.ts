import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../apis';

export interface User {
  id: string;
  name: string;
  email: string;
  userRole: string;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const initialState: {
  info: User;
} = {
  info: {
    id: 'string id',
    name: 'string name',
    email: 'string email',
    userRole: UserRole.USER,
    isDeleted: false,
    createdAt: 'created date',
    updatedAt: 'update date',
  },
};

export const getUserInformationAction = createAsyncThunk(
  'user/getInfo',
  async (payload, thunkApi) => {
    const res = await api.getUserInfoUsingToken();
    thunkApi.dispatch(getUserInfoUsingToken(res.data));
  }
);

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserInfoUsingToken: (state, action: PayloadAction<User>) => {
      state.info = action.payload;
    },
  },
});

export const { getUserInfoUsingToken } = userSlice.actions;
export default userSlice.reducer;

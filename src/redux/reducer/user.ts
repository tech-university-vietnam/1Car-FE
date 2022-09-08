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

export interface UserUpdateDTO {
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
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
    return res.data;
  }
);

export const updateUserInfoAction = createAsyncThunk(
  'user/updateInfo',
  async (payload: UserUpdateDTO, thunkApi) => {
    const res = await api.updateUserInfo(payload);
    thunkApi.dispatch(updateUserInfo(payload));
    return res.data;
  }
);

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    getUserInfoUsingToken: (state, action: PayloadAction<User>) => {
      state.info = action.payload;
    },
    updateUserInfo: (state, action: PayloadAction<UserUpdateDTO>) => {
      const dto = action.payload;
      dto.dateOfBirth = dto.dateOfBirth.toString();
      state.info = {
        ...state.info,
        ...dto,
      };
    },
  },
});

export const { getUserInfoUsingToken, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;

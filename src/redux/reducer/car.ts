import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../apis';
import * as _ from 'lodash';

export interface Car {
  id: string;
  name: string;
  description?: any;
  status: string;
  pricePerDate: number;
  numberOfTrips: number;
  numberOfKilometer: number;
  images: string[];
  locationId?: any;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  attributes: Attribute[];
}

export interface Attribute {
  id: string;
  value: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  type: Type;
}

export interface Type {
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarFilter {
  page?: number;
  limit?: number;
  attribute?: string[];
}

const initialState: {
  cars: Car[];
  filter: CarFilter;
  attributes: Attribute[];
  attributeTypes: Type[];
} = {
  cars: [],
  filter: {
    page: 1,
    limit: 10,
  },
  attributes: [],
  attributeTypes: [],
};

export const getCarAction = createAsyncThunk(
  'car/getCar',
  async (
    payload: CarFilter = {
      page: 1,
      limit: 10,
    },
    thunkApi
  ) => {
    const cars = await api.getCars(payload as Record<string, string>);
    thunkApi.dispatch(getCar(cars));
  }
);

export const getCarAttributeAction = createAsyncThunk(
  'car/getCarAttribute',
  async (payload, thunkApi) => {
    const attributes = await api.getCarAttribute();
    thunkApi.dispatch(getCarAttribute(attributes));
  }
);

export const getCarAttributeTypeAction = createAsyncThunk(
  'car/getCarAttributeType',
  async (payload, thunkApi) => {
    const types = await api.getCarAttributeType();
    thunkApi.dispatch(getCarAttributeType(types));
  }
);

const carSlice = createSlice({
  name: 'blogData',
  initialState,
  reducers: {
    getCar: (state, action: PayloadAction<[]>) => {
      state.cars = action.payload;
    },
    getCarAttribute: (state, action: PayloadAction<Attribute[]>) => {
      state.attributes = action.payload;
    },
    getCarAttributeType: (state, action: PayloadAction<Type[]>) => {
      state.attributeTypes = action.payload;
    },
    updateFilter: (state, action: PayloadAction<CarFilter>) => {
      state.filter = action.payload;
    },
  },
});

export const { getCar, getCarAttribute, updateFilter, getCarAttributeType } =
  carSlice.actions;
export default carSlice.reducer;

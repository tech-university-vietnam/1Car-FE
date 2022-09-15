import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../../apis';

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
  startDate?: string;
  endDate?: string;
}

export interface CarAdminFilter {
  page: number;
  limit: number;
}

const initialState: {
  cars: Car[];
  filter: CarFilter;
  attributes: Attribute[];
  attributeTypes: Type[];
  adminCars: Car[];
  totalRecords: number;
  carFormChangeIndex: number;
} = {
  cars: [],
  filter: {
    page: 1,
    limit: 10,
  },
  attributes: [],
  attributeTypes: [],
  adminCars: [],
  totalRecords: 0,
  carFormChangeIndex: -1,
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

export const getCarForAdminAction = createAsyncThunk(
  'car/getCarForAdmin',
  async (payload: CarAdminFilter, thunkApi) => {
    const cars = await api.getCarForAdmin(payload);
    thunkApi.dispatch(getCarForAdmin(cars));
  }
);

export const updateCarAction = createAsyncThunk(
  'car/updateCar',
  async (payload: any, thunkApi) => {
    const updatedCar: Car = await api.updateCar(payload);
    thunkApi.dispatch(updateCarListOfAdmin(updatedCar));
  }
);

export const createCarAction = createAsyncThunk(
  'car/createCar',
  async (payload: any, thunkAPI) => {
    const createdCar: Car = await api.createCar(payload);
    thunkAPI.dispatch(addCarToListOfAdmin(createdCar));
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
    getCarForAdmin: (
      state,
      action: PayloadAction<{
        totalRecords: number;
        totalPage: number;
        cars: any[];
      }>
    ) => {
      state.adminCars = action.payload.cars;
      state.totalRecords = action.payload.totalRecords;
    },
    addCarToListOfAdmin: (state, action: PayloadAction<Car>) => {
      state.adminCars = [...state.adminCars, action.payload];
    },
    updateCarListOfAdmin: (state, action: PayloadAction<Car>) => {
      //  Find index of existing car in the list
      const updatedCarIndex = state.adminCars.findIndex(
        (car) => car.id === action.payload.id
      );
      // Copy and make change to the list
      let copyList = [...state.adminCars];
      copyList[updatedCarIndex] = action.payload;
      state.adminCars = copyList;
    },
  },
});

export const {
  getCar,
  getCarAttribute,
  updateFilter,
  getCarAttributeType,
  getCarForAdmin,
  addCarToListOfAdmin,
  updateCarListOfAdmin,
} = carSlice.actions;
export default carSlice.reducer;

import axios, { Method } from 'axios';
import _ from 'lodash';
import { UserRole, UserUpdateDTO } from '../redux/reducer/user';
import Cookies from 'universal-cookie';
import { CarAdminFilter } from '../redux/reducer/car';

const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export async function callApi(
  endpoint: string,
  method: Method = 'get',
  data: any = {},
  headers: any = {}
) {
  try {
    const response = await axios({
      url: BASE_URL + endpoint,
      method,
      data,
      headers: { ...headers },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Use if you want to have token in the header
const cookies = new Cookies();

export async function callAuthApi(
  endpoint: string,
  method: Method = 'get',
  data: any = {},
  headers: any = {}
) {
  try {
    const response = await axios({
      url: endpoint,
      method,
      data,
      headers: {
        Authorization: `Bearer ${cookies.get('access_token')}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
        ...headers,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// Car apis
export async function getCars(filter: Record<string, any> = {}) {
  const query = Object.keys(filter)
    .map((key) => {
      if (_.isArray(filter[key])) {
        return filter[key].map((item: string) => `${key}=${item}`).join('&');
      } else return `${key}=${filter[key]}`;
    })
    .join('&');
  return callApi('/car' + (query.length > 0 ? '?' + query : ''));
}

export async function getCar(id: string) {
  return callApi(`/car/${id}`);
}
export async function checkCarAvailability(
  id: string,
  startDate: string,
  endDate: string
) {
  return callApi(
    `/car/${id}/available?startDate=${startDate}&endDate=${endDate}`
  );
}
export async function getCarDetails(id: string) {
  return callApi(`/car/${id}/attributes`);
}

export async function getCarAttribute(): Promise<[]> {
  return callApi('/car/attribute');
}

export async function getBooking(bookingId: string) {
  return await callAuthApi(`/booking/${bookingId}`);
}

export async function createCarAttribute(data: any): Promise<any> {
  return callAuthApi('/car/attribute', 'POST', data);
}

export async function createCar(data: any): Promise<any> {
  return callAuthApi('/car', 'POST', data);
}

export async function getCarAttributeType(): Promise<[]> {
  return callApi('/car/attribute/type');
}

export async function updateCar(payload: any): Promise<any> {
  return callAuthApi(`/car/${payload.id}`, 'patch', payload.form);
}

// User apis

export async function getUserInfoUsingToken(token?: string) {
  return callAuthApi(
    '/user/me',
    'GET',
    {},
    token ? { Authorization: `Bearer ${token}` } : {}
  );
}

export async function updateUserInfo(updateInfo: UserUpdateDTO) {
  return callAuthApi('/user', 'patch', updateInfo);
}

export async function getUserInfoUsingId(id: string) {
  return callAuthApi(`/user/${id}`);
}

// Booking apis
export async function getBookingData() {
  return callAuthApi('/booking/me');
}
export async function postBooking(data: Object) {
  return callAuthApi('/payment/checkout', 'POST', data);
}

// Admin apis

export async function getAllUsersForAdmin() {
  return callAuthApi('/user');
}

export async function updateBookingForAdmin(id: string, data: any) {
  return callAuthApi(`/booking/${id}`, 'PATCH', data);
}

export async function getAllBookingForAdmin() {
  return callAuthApi('/booking');
}

export async function getCarForAdmin(
  filter: CarAdminFilter
): Promise<{ totalRecords: number; totalPage: number; cars: any[] }> {
  return callAuthApi(`/car/admin/?limit=${filter.limit}&page=${filter.page}`);
}

export async function changeUserToAdmin(id: string) {
  return callAuthApi(`/user/${id}/admin`, 'patch', {
    id: id,
    userRole: UserRole.ADMIN,
  });
}

export async function updateUserInfoUsingAdminAccount(payload: {
  id: string;
  name: string;
  phoneNumber: string;
  dateOfBirth: string;
}) {
  return callAuthApi(`/user/${payload.id}/admin`, 'patch', payload);
}

export async function deleteUser(payload: { id: string }) {
  return callAuthApi(`/user/${payload.id}`, 'delete');
}

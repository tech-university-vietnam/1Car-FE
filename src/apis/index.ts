import axios, { Method } from 'axios';
import _ from 'lodash';
import { UserUpdateDTO } from '../redux/reducer/user';
import { mockBookingData } from '../redux/reducer/booking';
import Cookies from 'universal-cookie';

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
  data: any = {}
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
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

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

export async function getCarDetails(id: string) {
  return callApi(`/car/${id}/attributes`);
}

export async function getCarAttribute(): Promise<[]> {
  return callApi('/car/attribute');
}

export async function getUserInfoUsingToken() {
  return callAuthApi('/user/me');
}

export async function updateUserInfo(updateInfo: UserUpdateDTO) {
  return callAuthApi('/user', 'patch', updateInfo);
}

export async function getBookingData() {
  return mockBookingData;
  // TODO: Remove mock data after finish developing this endpoint
  // return callAuthApi('/booking');
}
export async function postBooking(data: Object) {
  return callAuthApi('/payment/checkout', 'POST', data);
}

import axios, { Method } from 'axios';
import _ from 'lodash';
import authApi from './authApi';

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

// Use if want to have token in the header
export async function callAuthApi(
  endpoint: string,
  method: Method = 'get',
  data: any = {}
) {
  try {
    const response = await authApi({
      url: endpoint,
      method,
      data,
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

export async function getCar(id: string | undefined) {
  return callApi(`/car/${id}`);
}

export async function getCarAttribute(): Promise<[]> {
  return callApi('/car/attribute');
}

export async function getUserInfoUsingToken() {
  return callAuthApi('/user/me');
}

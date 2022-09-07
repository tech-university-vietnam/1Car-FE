import axios, { Method } from 'axios';
import _ from 'lodash';

const BASE_URL = 'http://localhost:8080';

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

export async function getCarAttribute(): Promise<[]> {
  return callApi('/car/attribute');
}

export async function createCarAttribute(data: any): Promise<any> {
  return callApi('/car/attribute', 'POST', data);
}

export async function createCar(data: any): Promise<any> {
  return callApi('/car', 'POST', data);
}

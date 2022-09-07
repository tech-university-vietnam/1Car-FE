import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();
const authApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${cookies.get('access_token')}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
  },
});
export default authApi;

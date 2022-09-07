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

export async function getCar(id: string | undefined) {
  return callApi(`/car/${id}`);
}

export async function getCarAttribute(): Promise<[]> {
  return callApi('/car/attribute');
}

export async function postBooking(data: Object) {
  return callApi('/payment/checkout', 'POST', data, {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVXVDlHY1BFOU5OSHhDT01JUWQtaiJ9.eyJuaWNrbmFtZSI6InF1eWVuY2h1b25nMTk5OCIsIm5hbWUiOiJxdXllbmNodW9uZzE5OThAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzAzYzVkZWVjMGM2ZTYyODczOTEzYjY5ZTQ4YzM3OWRlP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGcXUucG5nIiwidXBkYXRlZF9hdCI6IjIwMjItMDktMDVUMDY6NDM6MDQuMzI4WiIsImVtYWlsIjoicXV5ZW5jaHVvbmcxOTk4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtZWx3czVlMTMudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzMTU5YTI5NzJhNDVjNTA3ODE2NmJjMSIsImF1ZCI6InN5ZFFJb1p0YWtIcko5YjRkdmZ6V3lDczJaR1d3RnpzIiwiaWF0IjoxNjYyNTQyODQ2LCJleHAiOjQ1MDUyNjIxNzAyMTYsInNpZCI6ImRjcTZRek4xdlF5NHJjNmsyVVBJMmtKcm9QRVRTN2VVIiwibm9uY2UiOiJSMDloWVhoUlkxTTBPVnAyTmtJd016aHBRMGN5YTFaVVRURXlWRk5HTldScmJtOTFablE1WjJGa1FRPT0ifQ.HrZ64kyJ2mrzI3LrXNWrM_elwL7Rw6M7pitNp3DE2B_T9Yqyg360z7MIam8k9D3LEquQlXCRmikYIlCxnN-fqA2N_VRqFGddpE-5DfWX3r1Yto8cRw8y69Py39i2XFRln14jWdBNkQE4AodQZ7CCl3NTWKcRMHgMeJZ6HtWqa4WHoMKBzi40XgV0mUzJ5z9VBhP0TFi4lJDRAMle1FJJn3Mb7yYUk-bbcdh6xRyOLnXvhHIO9FS17FWXV5yBJdV98uXhDneiS9nsdssJVQK4fy3_0m0a8f6xQ2dB70umd8T_q88Ogt1wRm3wSFYSGUlHW6vcAHtgp-oJxdiQwRdlBw',
  });
}

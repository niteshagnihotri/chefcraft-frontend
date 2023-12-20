import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const apiLink = process.env.NEXT_PUBLIC_API_URL;

export const makeRequest = async (
  method: string,
  endpoint: string,
  data?: any,
  headers?: { [key: string]: string }
) => {
  const axiosOptions: AxiosRequestConfig = {
    baseURL: `${apiLink ?? ''}`,
    method,
    url: endpoint,
    data,
    timeout: 10000,
  };

  const localToken = Cookies.get('access-token');
  if (localToken)
    axiosOptions.headers = {
      Authorization: `Bearer ${localToken}`,
      ...headers,
    };

  const res = await axios.request({
    ...axiosOptions,
  });
  return res;
};

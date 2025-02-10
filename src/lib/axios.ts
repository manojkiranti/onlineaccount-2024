import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';

import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  config.headers = config.headers ?? {};
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    if (error.response.status === 403 || error.response.status === 401) {
      storage.clearToken();
      window.location.assign(window.location.origin as unknown as string);
    }
    /**
     * TODO: integrate with redux
     */
    alert(message);

    return Promise.reject(error);
  },
);

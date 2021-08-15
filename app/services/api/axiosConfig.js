import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { API_URL } from '@env';
import { WalkieDoggieAPIError } from '../../helpers/errorHandler';
import { getStorageItem } from '../../utils/storage';
import { refreshToken } from './sessions/refreshToken';

const baseURL = API_URL;

export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const publicRequest = async (config) => {
  try {
    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    const metadata = handleError(error);
    throw new WalkieDoggieAPIError({ metadata });
  }
};

export const privateRequest = async (config) => {
  try {
    const accessToken = await getStorageItem('access_token');

    const mergeConfig = {
      ...config,
      headers: { ...config.headers, Authorization: accessToken },
    };
    const response = await axiosInstance.request(mergeConfig);
    return response.data;
  } catch (error) {
    const metadata = handleError(error);
    throw new WalkieDoggieAPIError({ metadata });
  }
};

const handleError = (error) => {
  const responseData = {
    statusCode: 500,
    errorData: error,
    message: 'Generic Error',
  };

  if (!error.response) return responseData;

  const statusCode = error.response.status;

  return {
    statusCode,
    errorData: error.response.data,
  };
};

// Response interceptor for API calls
axiosInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  const { message, internal_code } = error.response.data;

  const isTokenExpiredError = error.response.status === 401 &&
    internal_code === 'invalid_token' &&
    message === 'jwt expired';

  if (isTokenExpiredError && !originalRequest._retry) {
    originalRequest._retry = true;
    const { data: {access_token} } = await refreshToken();
    axios.defaults.headers.common['Authorization'] = access_token;
    originalRequest.headers.Authorization = access_token;

    return axiosInstance(originalRequest);
  }
  return Promise.reject(error);
});
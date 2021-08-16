import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { API_URL } from '@env';
import { WalkieDoggieAPIError } from '../../helpers/errorHandler';
import { getAccessTokenStorage } from '../../utils/storage';
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

export const publicRequest = async config =>  axiosInstance.request(config);


export const privateRequest = async (config) => {

  const accessToken = await getAccessTokenStorage();

  const mergeConfig = {
    ...config,
    headers: { ...config.headers, Authorization: accessToken },
  };
  return axiosInstance.request(mergeConfig);
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
  return response.data
}, async function (error) {
  const originalRequest = error.config;
  const { message, internal_code } = error.response.data;

  const isTokenExpiredError = error.response.status === 401 &&
    internal_code === 'invalid_token' &&
    message === 'jwt expired';

  if (isTokenExpiredError && !originalRequest._retry) {
    originalRequest._retry = true;
    const { data: { access_token } } = await refreshToken();
    axios.defaults.headers.common['Authorization'] = access_token;
    originalRequest.headers.Authorization = access_token;

    return axiosInstance(originalRequest);
  }
  const metadata = handleError(error);
  const customError = new WalkieDoggieAPIError({ metadata });
  return Promise.reject(customError);
});
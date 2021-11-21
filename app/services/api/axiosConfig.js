import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { WalkieDoggieAPIError } from 'helpers/errorHandler';
import {
  getAccessTokenStorage,
  getRefreshTokenStorage,
  multiRemoveStorageItems,
  setStorageItem,
} from 'utils/storage';

const baseURL = API_URL;

export const HTTP_METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const publicRequest = async (config) => {
  // console.log(config);
  return axiosInstance.request(config);
};

export const refreshToken = async () => {
  const currentRefreshToken = await getRefreshTokenStorage();
  const config = {
    method: HTTP_METHOD.POST,
    url: 'sessions/refresh',
    data: {
      refresh_token: currentRefreshToken,
    },
  };

  try {
    const data = await publicRequest(config);
    await multiRemoveStorageItems(['access_token', 'refresh_token']);
    const { access_token, refresh_token } = data;
    await setStorageItem('access_token', access_token);
    await setStorageItem('refresh_token', refresh_token);
    return { result: true, data: { access_token } };
  } catch (error) {
    const { metadata } = error;
    return { result: false, data: metadata };
  }
};

export const privateRequest = async (config) => {
  const accessToken = await getAccessTokenStorage();
  console.log(config);
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

  if (!error.response) {
    return responseData;
  }

  const statusCode = error.response.status;

  return {
    statusCode,
    errorData: error.response.data,
  };
};

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async function (error) {
    console.log(error);
    const originalRequest = error.config;
    const { message, internal_code } = error.response.data;

    const isTokenExpiredError =
      error.response.status === 401 &&
      internal_code === 'invalid_token' &&
      message === 'jwt expired';

    if (isTokenExpiredError && !originalRequest._retry) {
      originalRequest._retry = true;
      const {
        data: { access_token },
      } = await refreshToken();
      axios.defaults.headers.common.Authorization = access_token;
      originalRequest.headers.Authorization = access_token;

      return axiosInstance(originalRequest);
    }
    const metadata = handleError(error);
    const customError = new WalkieDoggieAPIError({ metadata });
    return Promise.reject(customError);
  },
);

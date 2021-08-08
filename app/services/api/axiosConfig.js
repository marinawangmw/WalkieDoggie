import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { API_URL } from '@env'
import { WalkieDoggieAPIError } from '../../helpers/errorHandler';
import { getStorageItem } from '../../utils/storage';

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
}

export const privateRequest = async (config) => {
  try {
    const accessToken = await getStorageItem('access_token');
    const mergeConfig = {
      ...config,
      headers: { ...config.headers, Authorization: accessToken}
    }
    const response = await axiosInstance.request(mergeConfig);
    return response.data;
  } catch (error) {
    const metadata = handleError(error);
    throw new WalkieDoggieAPIError({ metadata });
  }
}

const handleError = (error) => {
  const responseData = {
    statusCode: 500,
    errorData: error,
    message: 'Internal Server Error',
  };

  if (!error.response) return responseData;

  const statusCode = error.response.status;

  return {
    statusCode,
    errorData: error.response.data
  }
}
import axios from 'axios';
import { API_URL } from '@env'

const baseURL = API_URL;

export const METHOD = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const privateRequest = (config) => {
  return axiosInstance.request(config).then(response => response.data);
}
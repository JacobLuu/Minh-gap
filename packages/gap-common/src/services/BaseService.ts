import axios from 'axios';
import { ACCESS_TOKEN } from '../constants/localStorage';
import { removeCachedUrl } from '../utils/localStorage';
import { STATUS_CODE } from '../constants/common';
import PATH from '../constants/clientPath';
import history from '../utils/history';
import API_HOST from '../constants/apiHosts';

const baseRequestConfig = {
  baseURL: API_HOST.BASE_URL,
};

const baseService = axios.create(baseRequestConfig);

baseService.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

baseService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
      localStorage.removeItem(ACCESS_TOKEN);
      removeCachedUrl();
      history.replace(PATH.LOGIN);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default baseService;

import axios from 'axios';
import {
  removeCachedUrl,
  getToken,
  removeToken,
} from '../../utils/localStorage';
import { STATUS_CODE } from '../../constants/common';
import PATH from '../../constants/clientPath';
import history from '../../utils/history';
import API_HOST from '../../constants/apiHosts';

const baseRequestConfig = {
  baseURL: API_HOST.USER_URL,
};

const userService = axios.create(baseRequestConfig);

userService.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

userService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
      removeToken();
      removeCachedUrl();
      history.replace(PATH.LOGIN);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default userService;

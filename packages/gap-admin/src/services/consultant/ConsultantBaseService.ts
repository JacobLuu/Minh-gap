import axios from 'axios';
import {
  removeToken,
  removeCachedUrl,
  getSelectedBranch,
  getToken,
} from '../../utils/localStorage';
import { STATUS_CODE } from '../../constants/common';
import PATH from '../../constants/clientPath';
import history from '../../utils/history';
import API_HOST from '../../constants/apiHosts';

const baseRequestConfig = {
  baseURL: API_HOST.CONSULTANT_URL,
};

const baseService = axios.create(baseRequestConfig);
const branchSelected = getSelectedBranch();
const accessToken = getToken();

baseService.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...config.headers.common,
        Authorization: `Bearer ${accessToken}`,
        'Gap-Branch-ID': `${branchSelected}`,
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
      removeToken();
      removeCachedUrl();
      history.replace(PATH.LOGIN);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default baseService;

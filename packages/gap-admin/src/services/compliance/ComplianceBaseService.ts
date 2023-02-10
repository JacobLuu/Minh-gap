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
  baseURL: API_HOST.COMPLIANCE_URL,
};

const ComplianceBaseService = axios.create(baseRequestConfig);
const accessToken = getToken();

ComplianceBaseService.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        ...config.headers.common,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

ComplianceBaseService.interceptors.response.use(
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

export default ComplianceBaseService;

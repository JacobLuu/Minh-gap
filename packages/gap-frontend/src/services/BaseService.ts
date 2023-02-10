/* eslint-disable no-console */
import axios from 'axios';
import moment from 'moment-timezone';
import {
  getAccessToken,
  removeAccessToken,
  // updateAccessToken,
  // getRefreshToken,
  // updateRefreshToken,
  // removeCachedUrl,
  // removeRefreshToken,
} from '../utils/localStorage';
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
        ...config.headers,
        Authorization: `Bearer ${getAccessToken()}`,
        'x-timezone': moment.tz.guess(),
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
  async (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx

      if (error.response.status >= STATUS_CODE.SERVER_ERROR) {
        return Promise.reject(error);
      }

      if (
        error.response.status === STATUS_CODE.NOT_FOUND ||
        error.response.status === STATUS_CODE.METHOD_NOT_ALLOWED
      ) {
        return Promise.reject(error);
      }

      if (error.response.status === STATUS_CODE.BAD_REQUEST) {
        return Promise.reject(error);
      }

      // Access Token was expired
      if (error.response.status === STATUS_CODE.UNAUTHORIZED) {
        const originalConfig = error.config;
        if (originalConfig.url === '/auth/login') {
          // login failed
          return error.response;
        }

        // remove user token, redirect to login page
        removeAccessToken();
        history.replace(PATH.LOGIN);

        // if (originalConfig.url !== '/auth/login') {
        //   // Refresh token and retry
        //   if (!originalConfig._retry) {
        //     originalConfig._retry = true;

        //     try {
        //       const rs = await baseService.post('/api/candidate/refresh', {
        //         refreshToken: getRefreshToken(),
        //       });

        //       if (rs.status !== STATUS_CODE.SUCCESS) {
        //         // refresh failed, remove user token, redirect to login page
        //         removeAccessToken();
        //         removeRefreshToken();
        //         removeCachedUrl();

        //         history.replace(PATH.LOGIN);
        //       }

        //       const { access_token, refresh_token } = rs.data;
        //       // update user token
        //       updateAccessToken(access_token);
        //       updateRefreshToken(refresh_token);

        //       return baseService(originalConfig);
        //     } catch (_error) {
        //       // remove user token, redirect to login page
        //       removeAccessToken();
        //       removeRefreshToken();
        //       removeCachedUrl();

        //       history.replace(PATH.LOGIN);
        //       return Promise.reject(_error);
        //     }
        //   }
        // }
      }
      return Promise.reject(error);
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('Error: ', error.message);
      Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error: ', error.message);
      Promise.reject(error);
    }
  },
);

export default baseService;

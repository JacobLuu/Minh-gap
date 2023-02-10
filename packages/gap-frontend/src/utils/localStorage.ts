import {
  ACCESS_TOKEN,
  ACCOUNT_INFO,
  CACHED_URL,
  REFRESH_TOKEN,
} from '../constants/localStorage';

export const getCachedUrl = () => localStorage.getItem(CACHED_URL);

export const updateCachedUrl = (url: string) =>
  localStorage.setItem(CACHED_URL, url);

export const removeCachedUrl = () => localStorage.removeItem(CACHED_URL);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const isHavingToken = () => !!getAccessToken();

export const updateAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN, token);

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);

export const updateRefreshToken = (token: string) =>
  localStorage.setItem(REFRESH_TOKEN, token);

export const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN);

export const getUser = () => JSON.parse(localStorage.getItem(ACCOUNT_INFO));

export const updateUser = (data: any) =>
  localStorage.setItem(ACCOUNT_INFO, JSON.stringify(data));

export const removeUser = () => localStorage.removeItem(ACCOUNT_INFO);

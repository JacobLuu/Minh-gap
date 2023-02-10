import {
  ACCESS_TOKEN,
  CACHED_URL,
  ACCOUNT_INFO,
  BRANCH_SELECTED,
} from '../constants/localStorage';

// get localStorage
export const getToken = () => localStorage.getItem(ACCESS_TOKEN);

export const getCachedUrl = () => localStorage.getItem(CACHED_URL);

export const getAccountInfo = () =>
  JSON.parse(localStorage.getItem(ACCOUNT_INFO));

export const getSelectedBranch = () =>
  JSON.parse(localStorage.getItem(BRANCH_SELECTED));

// set localStorage
export const setCachedUrl = (data) => localStorage.setItem(CACHED_URL, data);

export const setAccessToken = (accessToken) =>
  localStorage.setItem(ACCESS_TOKEN, accessToken);

export const setAccountInfo = (data) =>
  localStorage.setItem(ACCOUNT_INFO, JSON.stringify(data));

export const setSelectedBranch = (data) =>
  localStorage.setItem(BRANCH_SELECTED, JSON.stringify(data));

// remove localStorage
export const removeCachedUrl = () => localStorage.removeItem(CACHED_URL);
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
export const removeAccountInfo = () => localStorage.removeItem(ACCOUNT_INFO);
export const removeBranchSelected = () =>
  localStorage.removeItem(BRANCH_SELECTED);

export const isHavingToken = () => !!getToken();

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  window.dispatchEvent(new Event('storage'));
};

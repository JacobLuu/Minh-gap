import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'loginSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    loginStatus: REQUEST_STATUS.IDLE,
    logoutStatus: REQUEST_STATUS.IDLE,
    accountInfoStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getActionLoginRequest: (state) => {
      state.loginStatus = REQUEST_STATUS.REQUESTING;
    },
    getActionLoginSuccess: (state) => {
      state.loginStatus = REQUEST_STATUS.SUCCESS;
    },
    getActionLoginFail: (state) => {
      state.loginStatus = REQUEST_STATUS.ERROR;
    },

    getAccountInfoSuccess: (state) => {
      state.accountInfoStatus = REQUEST_STATUS.SUCCESS;
    },
    getAccountInfoFail: (state) => {
      state.accountInfoStatus = REQUEST_STATUS.ERROR;
    },

    clearInitialState: (state) => {
      state.loginStatus = REQUEST_STATUS.IDLE;
      state.logoutStatus = REQUEST_STATUS.IDLE;
      state.accountInfoStatus = REQUEST_STATUS.IDLE;
    },
  },
});

export const {
  getActionLoginRequest,
  getActionLoginSuccess,
  getActionLoginFail,
  getAccountInfoSuccess,
  getAccountInfoFail,
  clearInitialState,
} = slice.actions;

export const selectLoginSlice = (state: any) => state[sliceName];

export default slice.reducer;

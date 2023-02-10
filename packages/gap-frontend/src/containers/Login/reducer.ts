import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'loginSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    loginStatus: REQUEST_STATUS.IDLE,
    loginMessage: '',
    getMeStatus: REQUEST_STATUS.IDLE,
    userProfile: null,
  },
  reducers: {
    makeLoading: (state, { payload }) => {
      state.loginStatus = payload;
    },
    loginRequest: (state, action) => {
      if (action) state.loginStatus = REQUEST_STATUS.REQUESTING;
    },
    loginSuccess: (state) => {
      state.loginStatus = REQUEST_STATUS.SUCCESS;
    },
    loginFail: (state, { payload }) => {
      state.loginStatus = REQUEST_STATUS.ERROR;
      state.loginMessage = payload;
    },
    getMeRequest: (state) => {
      state.getMeStatus = REQUEST_STATUS.REQUESTING;
    },
    getMeSuccess: (state, { payload }) => {
      state.getMeStatus = REQUEST_STATUS.SUCCESS;
      state.userProfile = payload;
    },
    getMeFail: (state, { payload }) => {
      state.getMeStatus = REQUEST_STATUS.ERROR;
      state.loginMessage = payload;
    },
    clearInitialState: (state) => {
      state.loginStatus = REQUEST_STATUS.IDLE;
      state.loginMessage = '';
      state.getMeStatus = REQUEST_STATUS.IDLE;
      state.userProfile = null;
    },
  },
});

export const {
  loginRequest,
  makeLoading,
  loginSuccess,
  clearInitialState,
  loginFail,
  getMeRequest,
  getMeSuccess,
  getMeFail,
} = slice.actions;

export const selectLoginSlice = (state: any) => state[sliceName];

export default slice.reducer;

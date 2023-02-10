import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'forgotPasswordSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    forgotPasswordStatus: REQUEST_STATUS.IDLE,
    forgotPasswordMessage: '',
  },
  reducers: {
    makeLoading: (state, { payload }) => {
      state.forgotPasswordStatus = payload;
    },
    forgotPasswordRequest: (state, action) => {
      if (action) state.forgotPasswordStatus = REQUEST_STATUS.REQUESTING;
    },
    forgotPasswordSuccess: (state) => {
      state.forgotPasswordStatus = REQUEST_STATUS.SUCCESS;
    },
    forgotPasswordFail: (state, { payload }) => {
      state.forgotPasswordStatus = REQUEST_STATUS.ERROR;
      state.forgotPasswordMessage = payload;
    },
    forgotPasswordResetStatus: (state) => {
      state.forgotPasswordStatus = REQUEST_STATUS.IDLE;
    },
    clearInitialState: (state) => {
      state.forgotPasswordMessage = '';
      state.forgotPasswordStatus = REQUEST_STATUS.IDLE;
    },
  },
});

export const {
  forgotPasswordRequest,
  makeLoading,
  forgotPasswordSuccess,
  forgotPasswordFail,
  forgotPasswordResetStatus,
  clearInitialState,
} = slice.actions;

export const selectForgotPasswordSlice = (state: any) => state[sliceName];

export default slice.reducer;

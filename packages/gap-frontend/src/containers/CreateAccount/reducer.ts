import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'createAccountSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    signupStatus: REQUEST_STATUS.IDLE,
    signupMessage: '',
  },
  reducers: {
    signupRequest: (state, action) => {
      if (action) state.signupStatus = REQUEST_STATUS.REQUESTING;
    },
    signupSuccess: (state) => {
      state.signupStatus = REQUEST_STATUS.SUCCESS;
    },
    signupFail: (state, { payload }) => {
      state.signupStatus = REQUEST_STATUS.ERROR;
      state.signupMessage = payload;
    },
    signupResetStatus: (state) => {
      state.signupStatus = REQUEST_STATUS.IDLE;
    },
    clearAPIMessage: (state) => {
      state.signupMessage = '';
    },
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFail,
  signupResetStatus,
  clearAPIMessage,
} = slice.actions;

export const selectCreateAccountSlice = (state: any) => state[sliceName];

export default slice.reducer;

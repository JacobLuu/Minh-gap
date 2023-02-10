import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState } from '../../../types/models';
import type { ShareCodeResponse } from '../../../types/Responses';

interface MeShareCodeState extends ShareCodeResponse, BaseError, BaseState {}

export type { MeShareCodeState };

const initialState: MeShareCodeState = {
  success: null,
  message: '',
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: null,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'meShareCodeSlice',
  initialState,
  reducers: {
    checkMeShareCodeRequest: (
      state,
      _action: PayloadAction<{ shareCode: string }>,
    ) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    checkMeShareCodeSuccess: (
      state,
      action: PayloadAction<ShareCodeResponse>,
    ) => {
      const { payload } = action;
      state.success = payload.success;
      state.message = payload.message;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    checkMeShareCodeFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
  },
});

export const {
  checkMeShareCodeRequest,
  checkMeShareCodeSuccess,
  checkMeShareCodeFail,
} = slice.actions;

export const selectMeShareCodeSlice = (state: RootState) =>
  state.meShareCodeSlice;

export default slice.reducer;

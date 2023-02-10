import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { BaseError, BaseState } from '../../../types/models';

import type { RootState } from '../../../redux/store';
import type { ProgressesResponse } from '../../../types/Responses';

interface ProgressesState extends ProgressesResponse, BaseState, BaseError {}

export type { ProgressesState };

const initialState: ProgressesState = {
  progresses: [],
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: null,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'progressesSlice',
  initialState,
  reducers: {
    getProgressesRequest: (
      state,
      _action: PayloadAction<{ jobId: number }>,
    ) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getProgressesSuccess: (state, action: PayloadAction<ProgressesState>) => {
      const { payload } = action;
      state.progresses = payload.progresses;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getProgressesFail: (state, action: PayloadAction<AxiosResponse>) => {
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

export const { getProgressesRequest, getProgressesSuccess, getProgressesFail } =
  slice.actions;

export const selectProgressesSlice = (state: RootState) =>
  state.progressesSlice;

export default slice.reducer;

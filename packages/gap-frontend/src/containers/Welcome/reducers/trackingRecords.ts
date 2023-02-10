import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState } from '../../../types/models';
import type { RegisterAdvertReactionResponse } from '../../../types/Responses';

interface TrackingRecordsState
  extends RegisterAdvertReactionResponse,
    BaseError,
    BaseState {
  registerAdvertReactionCompleted: boolean;
}

export type { TrackingRecordsState };

const initialState: TrackingRecordsState = {
  status: REQUEST_STATUS.IDLE,
  registerAdvertReactionCompleted: false,
  cookie: '',
  error: {
    data: null,
    status: 0,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'trackingRecordsSlice',
  initialState,
  reducers: {
    registerAdvertReactionRequest: (state, action) => {
      if (action) state.status = REQUEST_STATUS.REQUESTING;
    },
    registerAdvertReactionSuccess: (
      state,
      action: PayloadAction<RegisterAdvertReactionResponse>,
    ) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.SUCCESS;
      state.registerAdvertReactionCompleted = true;
      state.cookie = payload.cookie;
    },
    registerAdvertReactionFail: (
      state,
      action: PayloadAction<AxiosResponse>,
    ) => {
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
  registerAdvertReactionRequest,
  registerAdvertReactionSuccess,
  registerAdvertReactionFail,
} = slice.actions;

export const selectTrackingRecordsSlice = (state: RootState) =>
  state.trackingRecordsSlice;

export default slice.reducer;

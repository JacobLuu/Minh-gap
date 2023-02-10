import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { BaseError, BaseState } from '../../../types/models';

import type { RootState } from '../../../redux/store';
import type { NationalitiesResponse } from '../../../types/Responses';

interface NationalitiesState
  extends NationalitiesResponse,
    BaseState,
    BaseError {}

export type { NationalitiesState };

const initialState: NationalitiesState = {
  nationalities: [],
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: null,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'nationalitiesSlice',
  initialState,
  reducers: {
    getNationalitiesRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getNationalitiesSuccess: (
      state,
      action: PayloadAction<NationalitiesState>,
    ) => {
      const { payload } = action;
      state.nationalities = payload.nationalities;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getNationalitiesFail: (state, action: PayloadAction<AxiosResponse>) => {
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
  getNationalitiesRequest,
  getNationalitiesSuccess,
  getNationalitiesFail,
} = slice.actions;

export const selectNationalitiesSlice = (state: RootState) =>
  state.nationalitiesSlice;

export default slice.reducer;

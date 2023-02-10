import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { BaseError, BaseState } from '../../../types/models';

import type { RootState } from '../../../redux/store';
import type { EthnicitiesResponse } from '../../../types/Responses';

interface EthnicitiesState extends EthnicitiesResponse, BaseState, BaseError {}

export type { EthnicitiesState };

const initialState: EthnicitiesState = {
  ethnicities: [],
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: null,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'ethnicitiesSlice',
  initialState,
  reducers: {
    getEthnicitiesRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getEthnicitiesSuccess: (state, action: PayloadAction<EthnicitiesState>) => {
      const { payload } = action;
      state.ethnicities = payload.ethnicities;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getEthnicitiesFail: (state, action: PayloadAction<AxiosResponse>) => {
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
  getEthnicitiesRequest,
  getEthnicitiesSuccess,
  getEthnicitiesFail,
} = slice.actions;

export const selectEthnicitiesSlice = (state: RootState) =>
  state.ethnicitiesSlice;

export default slice.reducer;

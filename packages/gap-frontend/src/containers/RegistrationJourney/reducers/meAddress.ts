import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState, Address } from '../../../types/models';
import type { AddressResponse } from '../../../types/Responses';

interface MeAddressState extends BaseError, BaseState {
  address: Address | null;
  updateAddressStatus: string;
}

export type { MeAddressState };

const initialState: MeAddressState = {
  address: null,
  status: REQUEST_STATUS.IDLE,
  updateAddressStatus: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: 0,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'meAddressSlice',
  initialState,
  reducers: {
    getAddressRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getAddressSuccess: (state, action: PayloadAction<AddressResponse>) => {
      const { payload } = action;
      state.address = payload;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getAddressFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
    updateAddressRequest: (state, action) => {
      if (action) {
        state.status = REQUEST_STATUS.REQUESTING;
        state.updateAddressStatus = REQUEST_STATUS.REQUESTING;
      }
    },
    updateAddressSuccess: (state, action: PayloadAction<AddressResponse>) => {
      const { payload } = action;
      state.address = payload;
      state.status = REQUEST_STATUS.SUCCESS;
      state.updateAddressStatus = REQUEST_STATUS.SUCCESS;
    },
    updateAddressFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.updateAddressStatus = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
  },
});

export const {
  getAddressRequest,
  getAddressSuccess,
  getAddressFail,
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFail,
} = slice.actions;

export const selectMeAddressSlice = (state: RootState) => state.meAddressSlice;

export default slice.reducer;

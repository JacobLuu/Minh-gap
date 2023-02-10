import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type {
  BaseError,
  BaseState,
  LoqateAddress,
} from '../../../types/models';
import type { LoqateAddressesResponse } from '../../../types/Responses';

interface LoqateAddressesState
  extends LoqateAddressesResponse,
    BaseError,
    BaseState {}

export type { LoqateAddressesState };

const initialState: LoqateAddressesState = {
  addresses: [],
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: 0,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'loqateAddressesSlice',
  initialState,
  reducers: {
    searchAddressesFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
    resetLoqateAddresses: (state) => {
      state.addresses = initialState.addresses;
      state.status = initialState.status;
    },
    appendLoqateAddress: (state, action: PayloadAction<LoqateAddress>) => {
      const { payload } = action;
      state.addresses = state.addresses.concat(payload);
    },
  },
});

export const {
  searchAddressesFail,
  resetLoqateAddresses,
  appendLoqateAddress,
} = slice.actions;

export const selectLoqateAddresses = (state: RootState) =>
  state.loqateAddressesSlice;

export default slice.reducer;

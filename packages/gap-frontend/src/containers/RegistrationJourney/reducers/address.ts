import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState } from '../../../types/models';
import type { AddressResponse } from '../../../types/Responses';

interface AddressState extends BaseError, BaseState {
  address: AddressResponse;
}

export type { AddressState };

const initialState: AddressState = {
  address: {
    town_city: '',
    county: '',
    postcode: '',
    house_name_number_and_street_name: '',
  },
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: 0,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'AddressSlice',
  initialState,
  reducers: {
    getAddressRequest: (state, _action: PayloadAction<{ key: string }>) => {
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
  },
});

export const { getAddressRequest, getAddressSuccess, getAddressFail } =
  slice.actions;

export const selectAddressSlice = (state: RootState) => state.addressSlice;

export default slice.reducer;

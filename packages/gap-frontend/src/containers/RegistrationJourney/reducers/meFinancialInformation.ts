import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type {
  BaseError,
  BaseState,
  FinancialInformation,
} from '../../../types/models';
import type { FinancialInformationResponse } from '../../../types/Responses';

interface MeFinancialInformationState extends BaseError, BaseState {
  financialInformation: FinancialInformation | null;
  updateFinancialInformationStatus: string;
}

export type { MeFinancialInformationState };

const initialState: MeFinancialInformationState = {
  financialInformation: null,
  status: REQUEST_STATUS.IDLE,
  updateFinancialInformationStatus: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: 0,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'meFinancialInformationSlice',
  initialState,
  reducers: {
    getFinancialInformationRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getFinancialInformationSuccess: (
      state,
      action: PayloadAction<FinancialInformationResponse>,
    ) => {
      const { payload } = action;
      state.financialInformation = payload;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getFinancialInformationFail: (
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
    updateFinancialInformationRequest: (state, action) => {
      if (action) {
        state.status = REQUEST_STATUS.REQUESTING;
        state.updateFinancialInformationStatus = REQUEST_STATUS.REQUESTING;
      }
    },
    updateFinancialInformationSuccess: (
      state,
      action: PayloadAction<FinancialInformationResponse>,
    ) => {
      const { payload } = action;
      state.financialInformation = payload;
      state.status = REQUEST_STATUS.SUCCESS;
      state.updateFinancialInformationStatus = REQUEST_STATUS.SUCCESS;
    },
    updateFinancialInformationFail: (
      state,
      action: PayloadAction<AxiosResponse>,
    ) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.updateFinancialInformationStatus = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
  },
});

export const {
  getFinancialInformationRequest,
  getFinancialInformationSuccess,
  getFinancialInformationFail,
  updateFinancialInformationRequest,
  updateFinancialInformationSuccess,
  updateFinancialInformationFail,
} = slice.actions;

export const selectMeFinancialInformationSlice = (state: RootState) =>
  state.meFinancialInformationSlice;

export default slice.reducer;

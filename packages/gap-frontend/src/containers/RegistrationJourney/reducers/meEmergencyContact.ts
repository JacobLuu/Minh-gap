import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type {
  BaseError,
  BaseState,
  EmergencyContact,
} from '../../../types/models';
import type { EmergencyContactResponse } from '../../../types/Responses';

interface MeEmergencyContactState extends BaseError, BaseState {
  emergencyContact: EmergencyContact;
  updateEmergencyContactStatus: string;
}

export type { MeEmergencyContactState };

const initialState: MeEmergencyContactState = {
  emergencyContact: null,
  status: REQUEST_STATUS.IDLE,
  updateEmergencyContactStatus: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: 0,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'meEmergencyContactSlice',
  initialState,
  reducers: {
    getEmergencyContactRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getEmergencyContactSuccess: (
      state,
      action: PayloadAction<EmergencyContactResponse>,
    ) => {
      const { payload } = action;
      state.emergencyContact = payload;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getEmergencyContactFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
    updateEmergencyContactRequest: (state, action) => {
      if (action) {
        state.status = REQUEST_STATUS.REQUESTING;
        state.updateEmergencyContactStatus = REQUEST_STATUS.REQUESTING;
      }
    },
    updateEmergencyContactSuccess: (
      state,
      action: PayloadAction<EmergencyContactResponse>,
    ) => {
      const { payload } = action;
      state.emergencyContact = payload;
      state.status = REQUEST_STATUS.SUCCESS;
      state.updateEmergencyContactStatus = REQUEST_STATUS.SUCCESS;
    },
    updateEmergencyContactFail: (
      state,
      action: PayloadAction<AxiosResponse>,
    ) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.updateEmergencyContactStatus = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
  },
});

export const {
  getEmergencyContactRequest,
  getEmergencyContactSuccess,
  getEmergencyContactFail,
  updateEmergencyContactRequest,
  updateEmergencyContactSuccess,
  updateEmergencyContactFail,
} = slice.actions;

export const selectMeEmergencyContactSlice = (state: RootState) =>
  state.meEmergencyContactSlice;

export default slice.reducer;

import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState } from '../../../types/models';
import type { JobsResponse } from '../../../types/Responses';

interface MeJobsState extends JobsResponse, BaseError, BaseState {
  updateMeJobsCompleted: boolean;
  addNewJobCompleted: boolean;
  addNewJobStatus: string;
}

export type { MeJobsState };

const initialState: MeJobsState = {
  jobs: [],
  status: REQUEST_STATUS.IDLE,
  updateMeJobsCompleted: false,
  addNewJobCompleted: false,
  addNewJobStatus: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: 0,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'meJobsSlice',
  initialState,
  reducers: {
    getMeJobsRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getMeJobsSuccess: (state, action: PayloadAction<JobsResponse>) => {
      const { payload } = action;
      state.jobs = payload.jobs;
      state.status = REQUEST_STATUS.SUCCESS;
      state.updateMeJobsCompleted = true;
    },
    getMeJobsFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
    addMeJobsRequest: (state, action) => {
      if (action) {
        state.status = REQUEST_STATUS.REQUESTING;
        state.addNewJobStatus = REQUEST_STATUS.REQUESTING;
      }
    },
    addMeJobsSuccess: (state, action: PayloadAction<JobsResponse>) => {
      const { payload } = action;
      state.jobs = payload.jobs;
      state.status = REQUEST_STATUS.SUCCESS;
      state.addNewJobStatus = REQUEST_STATUS.SUCCESS;
      state.addNewJobCompleted = true;
    },
    addMeJobsFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.addNewJobStatus = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
  },
});

export const {
  getMeJobsRequest,
  getMeJobsSuccess,
  getMeJobsFail,
  addMeJobsRequest,
  addMeJobsSuccess,
  addMeJobsFail,
} = slice.actions;

export const selectMeJobsSlice = (state: RootState) => state.meJobsSlice;

export default slice.reducer;

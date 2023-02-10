import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../constants/common';
import type { JobsResponse } from '../../types/Responses';

const sliceName = 'getStartedSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    userProfile: null,
    jobs: [],
    updateMeStatus: REQUEST_STATUS.IDLE,
    updateMeMessage: '',
    getMeStatus: REQUEST_STATUS.IDLE,
    getMeMessage: '',
    getMeJobsStatus: REQUEST_STATUS.IDLE,
    getMeJobsCompleted: false,
    addNewJobStatus: REQUEST_STATUS.IDLE,
    addNewJobCompleted: false,
  },
  reducers: {
    updateMeRequest: (state, action) => {
      if (action) state.updateMeStatus = REQUEST_STATUS.REQUESTING;
    },
    updateMeSuccess: (state, { payload }) => {
      state.updateMeStatus = REQUEST_STATUS.SUCCESS;
      state.userProfile = payload;
    },
    updateMeFail: (state, { payload }) => {
      state.updateMeStatus = REQUEST_STATUS.ERROR;
      state.updateMeMessage = payload;
    },
    getMeRequest: (state) => {
      state.getMeStatus = REQUEST_STATUS.REQUESTING;
    },
    getMeSuccess: (state, { payload }) => {
      state.getMeStatus = REQUEST_STATUS.SUCCESS;
      state.userProfile = payload;
    },
    getMeFail: (state, { payload }) => {
      state.getMeStatus = REQUEST_STATUS.ERROR;
      state.getMeMessage = payload;
    },
    getMeJobsRequest: (state) => {
      state.getMeJobsStatus = REQUEST_STATUS.REQUESTING;
    },
    getMeJobsSuccess: (state, action: PayloadAction<JobsResponse>) => {
      const { payload } = action;
      state.jobs = payload.jobs;
      state.getMeJobsStatus = REQUEST_STATUS.SUCCESS;
      state.getMeJobsCompleted = true;
    },
    getMeJobsFail: (state) => {
      state.getMeJobsStatus = REQUEST_STATUS.ERROR;
    },
    addNewJobRequest: (state, action) => {
      if (action) state.addNewJobStatus = REQUEST_STATUS.REQUESTING;
    },
    addNewJobSuccess: (state, action: PayloadAction<JobsResponse>) => {
      const { payload } = action;
      state.jobs = payload.jobs;
      state.addNewJobStatus = REQUEST_STATUS.SUCCESS;
      state.addNewJobCompleted = true;
    },
    addNewJobFail: (state) => {
      state.getMeJobsStatus = REQUEST_STATUS.ERROR;
    },
    clearInitialState: (state) => {
      state.updateMeStatus = REQUEST_STATUS.IDLE;
      state.updateMeMessage = '';
      state.getMeStatus = REQUEST_STATUS.IDLE;
      state.getMeMessage = '';
    },
  },
});

export const {
  updateMeRequest,
  updateMeSuccess,
  updateMeFail,
  getMeRequest,
  getMeSuccess,
  getMeFail,
  getMeJobsRequest,
  getMeJobsSuccess,
  getMeJobsFail,
  addNewJobRequest,
  addNewJobSuccess,
  addNewJobFail,
  clearInitialState,
} = slice.actions;

export const selectGetStartedSlice = (state: any) => state[sliceName];

export default slice.reducer;

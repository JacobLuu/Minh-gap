import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../constants/common';

const sliceName = 'branchCandidateSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    branchCandidateDetailStatus: REQUEST_STATUS.IDLE,
    branchCandidateDataDetail: {},
  },
  reducers: {
    branchCandidateDataDetailRequest: (state, _action) => {
      state.branchCandidateDetailStatus = REQUEST_STATUS.REQUESTING;
    },
    branchCandidateDataDetailSuccess: (state, { payload }) => {
      state.branchCandidateDetailStatus = REQUEST_STATUS.SUCCESS;
      state.branchCandidateDataDetail = payload;
    },
    branchCandidateDataDetailFail: (state) => {
      state.branchCandidateDetailStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  branchCandidateDataDetailRequest,
  branchCandidateDataDetailSuccess,
  branchCandidateDataDetailFail,
} = slice.actions;

export const selectBranchCandidateDetailSlice = (state: any) =>
  state[sliceName];

export default slice.reducer;

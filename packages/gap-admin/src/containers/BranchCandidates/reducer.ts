import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'branchCandidatesSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    branchCandidatesStatus: REQUEST_STATUS.IDLE,
    branchCandidates: [],
  },
  reducers: {
    getBranchCandidatesRequest: (state, _action) => {
      state.branchCandidatesStatus = REQUEST_STATUS.REQUESTING;
    },
    getBranchCandidatesSuccess: (state, { payload }) => {
      state.branchCandidatesStatus = REQUEST_STATUS.SUCCESS;
      state.branchCandidates = payload;
    },
    getBranchCandidatesFail: (state) => {
      state.branchCandidatesStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  getBranchCandidatesRequest,
  getBranchCandidatesSuccess,
  getBranchCandidatesFail,
} = slice.actions;

export const selectBranchCandidatesSlice = (state: any) => state[sliceName];

export default slice.reducer;

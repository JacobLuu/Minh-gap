import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'branchesSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    branchesStatus: REQUEST_STATUS.IDLE,
    branchesData: {},
  },
  reducers: {
    getBranchesRequest: (state, _action) => {
      state.branchesStatus = REQUEST_STATUS.REQUESTING;
    },
    getBranchesSuccess: (state, { payload }) => {
      state.branchesStatus = REQUEST_STATUS.SUCCESS;
      state.branchesData = payload;
    },
    getBranchesFail: (state) => {
      state.branchesStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const { getBranchesRequest, getBranchesSuccess, getBranchesFail } =
  slice.actions;

export const selectBranchesSlice = (state: any) => state[sliceName];

export default slice.reducer;

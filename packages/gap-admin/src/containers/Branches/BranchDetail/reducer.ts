import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../constants/common';

const sliceName = 'branchSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    branchStatus: REQUEST_STATUS.IDLE,
    isDeleteBranchStatus: false,
    isUpdateDataStatus: false,
    isCreateDataStatus: false,
    branchData: {},
  },
  reducers: {
    getBranchRequest: (state, _action) => {
      state.branchStatus = REQUEST_STATUS.REQUESTING;
    },
    getBranchSuccess: (state, { payload }) => {
      state.branchStatus = REQUEST_STATUS.SUCCESS;
      state.branchData = payload;
    },
    getBranchFail: (state) => {
      state.branchStatus = REQUEST_STATUS.ERROR;
    },
    updateBranchRequest: (_state, _action) => {},
    updateBranchSuccess: (state, { payload }) => {
      state.isUpdateDataStatus = true;
      state.branchData = payload;
    },
    updateBranchFail: (state) => {
      state.branchStatus = REQUEST_STATUS.ERROR;
    },
    createBranchRequest: (_state, _action) => {},
    createBranchSuccess: (state, { payload }) => {
      state.branchData = payload;
      state.isCreateDataStatus = true;
    },
    createBranchFail: (state) => {
      state.branchStatus = REQUEST_STATUS.ERROR;
    },
    deleteBranchRequest: (_state, _action) => {},
    deleteBranchSuccess: (state) => {
      state.isDeleteBranchStatus = true;
    },
    deleteBranchFail: (state) => {
      state.isDeleteBranchStatus = false;
    },
  },
});

export const {
  getBranchRequest,
  getBranchSuccess,
  getBranchFail,
  updateBranchRequest,
  updateBranchSuccess,
  updateBranchFail,
  createBranchRequest,
  createBranchSuccess,
  createBranchFail,
  deleteBranchRequest,
  deleteBranchSuccess,
  deleteBranchFail,
} = slice.actions;

export const selectBranchSlice = (state: any) => state[sliceName];

export default slice.reducer;

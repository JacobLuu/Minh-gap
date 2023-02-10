import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../constants/common';

const sliceName = 'advertResponsesDetailSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    advertResponsesDetailStatus: REQUEST_STATUS.IDLE,
    updateCandidateStatus: REQUEST_STATUS.IDLE,
    postContactLogStatus: REQUEST_STATUS.IDLE,
    getContactLogStatus: REQUEST_STATUS.IDLE,
    interviewBookingStatus: REQUEST_STATUS.IDLE,
    branchesStatus: REQUEST_STATUS.IDLE,
    advertResponsesDataDetail: {},
    contactLogsData: [],
    branchesData: [],
  },
  reducers: {
    advertResponsesDataDetailRequest: (state) => {
      state.advertResponsesDetailStatus = REQUEST_STATUS.REQUESTING;
    },
    advertResponsesDataDetailSuccess: (state, { payload }) => {
      state.advertResponsesDetailStatus = REQUEST_STATUS.SUCCESS;
      state.advertResponsesDataDetail = payload;
    },
    advertResponsesDataDetailFail: (state) => {
      state.advertResponsesDetailStatus = REQUEST_STATUS.ERROR;
    },

    interviewBookingRequest: (state) => {
      state.interviewBookingStatus = REQUEST_STATUS.REQUESTING;
    },
    interviewBookingSuccess: (state) => {
      state.interviewBookingStatus = REQUEST_STATUS.SUCCESS;
    },
    interviewBookingFail: (state) => {
      state.interviewBookingStatus = REQUEST_STATUS.ERROR;
    },

    getBranchesRequest: (state) => {
      state.branchesStatus = REQUEST_STATUS.REQUESTING;
    },
    getBranchesSuccess: (state, { payload }) => {
      state.branchesStatus = REQUEST_STATUS.SUCCESS;
      state.branchesData = payload;
    },
    getBranchesFail: (state) => {
      state.branchesStatus = REQUEST_STATUS.ERROR;
    },

    updateCandidateRequest: (state) => {
      state.updateCandidateStatus = REQUEST_STATUS.REQUESTING;
    },
    updateCandidateSuccess: (state, { payload }) => {
      state.updateCandidateStatus = REQUEST_STATUS.SUCCESS;
      state.advertResponsesDataDetail = payload;
    },
    updateCandidateFail: (state) => {
      state.updateCandidateStatus = REQUEST_STATUS.ERROR;
    },

    getContactLogRequest: (state) => {
      state.getContactLogStatus = REQUEST_STATUS.REQUESTING;
    },
    getContactLogSuccess: (state, { payload }) => {
      state.getContactLogStatus = REQUEST_STATUS.SUCCESS;
      state.contactLogsData = payload.logs;
    },
    getContactLogFail: (state) => {
      state.getContactLogStatus = REQUEST_STATUS.ERROR;
    },

    postContactLogRequest: (state) => {
      state.postContactLogStatus = REQUEST_STATUS.REQUESTING;
    },
    postContactLogSuccess: (state, { payload }) => {
      state.postContactLogStatus = REQUEST_STATUS.SUCCESS;
      state.contactLogsData.unshift(payload);
    },
    postContactLogFail: (state) => {
      state.postContactLogStatus = REQUEST_STATUS.ERROR;
    },

    clearInitialState: (state) => {
      state.interviewBookingStatus = REQUEST_STATUS.IDLE;
      state.advertResponsesDetailStatus = REQUEST_STATUS.IDLE;
      state.updateCandidateStatus = REQUEST_STATUS.IDLE;
      state.advertResponsesDataDetail = {};
    },
  },
});

export const {
  advertResponsesDataDetailRequest,
  advertResponsesDataDetailSuccess,
  advertResponsesDataDetailFail,
  interviewBookingRequest,
  interviewBookingSuccess,
  interviewBookingFail,
  getBranchesRequest,
  getBranchesSuccess,
  getBranchesFail,
  getContactLogRequest,
  getContactLogSuccess,
  getContactLogFail,
  postContactLogRequest,
  postContactLogSuccess,
  postContactLogFail,
  updateCandidateRequest,
  updateCandidateSuccess,
  updateCandidateFail,
  clearInitialState,
} = slice.actions;

export const selectAdvertResponsesDetailSlice = (state: any) =>
  state[sliceName];

export default slice.reducer;

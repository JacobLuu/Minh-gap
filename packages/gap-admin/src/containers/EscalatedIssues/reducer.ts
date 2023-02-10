import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'escalatedIssuesSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    escalatedIssuesStatus: REQUEST_STATUS.IDLE,
    candidatesData: {},
  },
  reducers: {
    getEscalatedIssuesRequest: (state, _action) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.REQUESTING;
    },
    getEscalatedIssuesSuccess: (state, { payload }) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.SUCCESS;
      state.candidatesData = {
        ...payload,
        candidates: payload?.candidates?.map((item) => {
          return {
            ...item,
            jobs: item?.jobs?.sort((a, b) => b.id - a.id) || [],
          };
        }),
      };
    },
    getEscalatedIssuesFail: (state) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  getEscalatedIssuesRequest,
  getEscalatedIssuesSuccess,
  getEscalatedIssuesFail,
} = slice.actions;

export const selectEscalatedIssuesSlice = (state: any) => state[sliceName];

export default slice.reducer;

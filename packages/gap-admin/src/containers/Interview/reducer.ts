import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

export const slice = createSlice({
  name: 'interviewSlice',
  initialState: {
    interviewTableData: [],
    interviewDataCount: 0,
    interViewStatus: REQUEST_STATUS.IDLE,
    interViewDetailStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getInterviewRequest: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.REQUESTING;
    },
    getInterviewSuccess: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.SUCCESS;
      state.interviewDataCount = action.payload?.count;
      state.interviewTableData = action.payload?.candidates?.map((item) => {
        return {
          ...item,
          jobs: item?.jobs?.sort((a, b) => b.id - a.id) || [],
        };
      });
    },
    getInterviewFail: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const { getInterviewRequest, getInterviewSuccess, getInterviewFail } =
  slice.actions;

export const selectInterviewStore = (state: any) => state.interviewSlice;

export default slice.reducer;

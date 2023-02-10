import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'rightToWorkHubSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    advertResponsesStatus: REQUEST_STATUS.IDLE,
    advertResponsesData: [],
  },
  reducers: {
    rightToWorkHubDataRequest: (state) => {
      state.advertResponsesStatus = REQUEST_STATUS.REQUESTING;
    },
    rightToWorkHubDataSuccess: (state, { payload }) => {
      state.advertResponsesStatus = REQUEST_STATUS.SUCCESS;
      state.advertResponsesData = payload;
    },
    rightToWorkHubDataFail: (state) => {
      state.advertResponsesStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  rightToWorkHubDataRequest,
  rightToWorkHubDataSuccess,
  rightToWorkHubDataFail,
} = slice.actions;

export const selectRightToWorkHubSlice = (state: any) => state[sliceName];

export default slice.reducer;

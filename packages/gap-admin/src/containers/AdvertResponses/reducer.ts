import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'advertResponsesSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    advertResponsesStatus: REQUEST_STATUS.IDLE,
    advertResponsesData: [],
  },
  reducers: {
    advertResponsesDataRequest: (state, _action) => {
      state.advertResponsesStatus = REQUEST_STATUS.REQUESTING;
    },
    advertResponsesDataSuccess: (state, { payload }) => {
      state.advertResponsesStatus = REQUEST_STATUS.SUCCESS;
      state.advertResponsesData = {
        ...payload,
        candidates: payload?.candidates?.map((item) => {
          return {
            ...item,
            jobs: item?.jobs?.sort((a, b) => b.id - a.id) || [],
          };
        }),
      };
    },
    advertResponsesDataFail: (state) => {
      state.advertResponsesStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  advertResponsesDataRequest,
  advertResponsesDataSuccess,
  advertResponsesDataFail,
} = slice.actions;

export const selectAdvertResponsesSlice = (state: any) => state[sliceName];

export default slice.reducer;

import { createSlice } from '@reduxjs/toolkit';
// import { CANDIDATE_STATUS } from 'gap-common/src/constants/enums';
import { REQUEST_STATUS } from '../../constants/common';

export const slice = createSlice({
  name: 'candidatesSlice',
  initialState: {
    candidatesStatus: REQUEST_STATUS.IDLE,
    candidatesData: [],
  },
  reducers: {
    candidatesRequest: (state, _action) => {
      state.candidatesStatus = REQUEST_STATUS.REQUESTING;
    },
    candidatesSuccess: (state, { payload }) => {
      state.candidatesStatus = REQUEST_STATUS.SUCCESS;
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
    candidatesFail: (state) => {
      state.candidatesStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const { candidatesRequest, candidatesSuccess, candidatesFail } =
  slice.actions;

export const selectCandidatesSlice = (state: any) => state.candidatesSlice;

export default slice.reducer;

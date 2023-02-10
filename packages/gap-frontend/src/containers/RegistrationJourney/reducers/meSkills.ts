import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState } from '../../../types/models';
import type { SkillsResponse } from '../../../types/Responses';

interface MeSkillsState extends SkillsResponse, BaseError, BaseState {}

export type { MeSkillsState };

const initialState: MeSkillsState = {
  skills: [],
  count: 0,
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: null,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'meSkillsSlice',
  initialState,
  reducers: {
    getMeSkillsRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getMeSkillsSuccess: (state, action: PayloadAction<SkillsResponse>) => {
      const { payload } = action;
      state.skills = payload.skills;
      state.count = payload.count;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getMeSkillsFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
  },
});

export const { getMeSkillsRequest, getMeSkillsSuccess, getMeSkillsFail } =
  slice.actions;

export const selectMeSkills = (state: RootState) => state.meSkillsSlice;

export default slice.reducer;

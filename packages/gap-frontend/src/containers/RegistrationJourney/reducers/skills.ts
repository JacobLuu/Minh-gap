import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState } from '../../../types/models';
import type { SkillsResponse } from '../../../types/Responses';

interface SkillsState extends SkillsResponse, BaseError, BaseState {}

export type { SkillsState };

const initialState: SkillsState = {
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
  name: 'skillsSlice',
  initialState,
  reducers: {
    getSkillsRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getSkillsSuccess: (state, action: PayloadAction<SkillsResponse>) => {
      const { payload } = action;
      state.skills = payload.skills;
      state.count = payload.count;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getSkillsFail: (state, action: PayloadAction<AxiosResponse>) => {
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

export const { getSkillsRequest, getSkillsSuccess, getSkillsFail } =
  slice.actions;

export const selectSkills = (state: RootState) => state.skillsSlice;

export default slice.reducer;

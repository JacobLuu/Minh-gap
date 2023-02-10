import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { QUESTION_GROUP_TYPE, REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState } from '../../../types/models';
import type { QuestionGroupResponse } from '../../../types/Responses';

interface QuestionGroupsState extends BaseError, BaseState {
  questionGroups: Record<QUESTION_GROUP_TYPE, QuestionGroupResponse>;
}

const initialQuestionGroups: Record<
  QUESTION_GROUP_TYPE,
  QuestionGroupResponse
> = {
  [QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_TRANSPORT_AND_AVAILABILITY]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_SEEKING]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT]: null,
};

export type { QuestionGroupsState };

const initialState: QuestionGroupsState = {
  questionGroups: initialQuestionGroups,
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: null,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'questionGroupsSlice',
  initialState,
  reducers: {
    getQuestionGroupRequest: (
      state,
      _action: PayloadAction<QUESTION_GROUP_TYPE>,
    ) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getQuestionGroupSuccess: (
      state,
      action: PayloadAction<QuestionGroupResponse>,
    ) => {
      const { payload } = action;
      const { type } = payload;
      state.questionGroups[type] = payload;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getQuestionGroupFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
    resetQuestionGroups: (state) => {
      state.questionGroups = initialQuestionGroups;
    },
  },
});

export const {
  getQuestionGroupRequest,
  getQuestionGroupSuccess,
  getQuestionGroupFail,
  resetQuestionGroups,
} = slice.actions;

export const selectQuestionGroups = (state: RootState) =>
  state.questionGroupsSlice;

export default slice.reducer;

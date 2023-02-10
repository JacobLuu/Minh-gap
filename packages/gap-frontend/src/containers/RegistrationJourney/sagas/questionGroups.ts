import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { STATUS_CODE } from '../../../constants/common';
import { QUESTION_GROUP_TYPE } from '../../../constants/enums';
import questionGroupsService from '../../../services/QuestionGroupsService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getQuestionGroupFail,
  getQuestionGroupRequest,
  getQuestionGroupSuccess,
} from '../reducers/questionGroups';

import type { QuestionGroupResponse } from '../../../types/Responses';

function* getQuestionGroupFlow(action: PayloadAction<QUESTION_GROUP_TYPE>) {
  try {
    const response: AxiosResponse<QuestionGroupResponse> = yield call(
      questionGroupsService.getQuestionGroup,
      action.payload,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getQuestionGroupSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getQuestionGroupFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });

    let errorMessage = error?.response?.data?.message;
    if (!errorMessage && error?.response?.data?.errors?.length > 0) {
      errorMessage = error?.response?.data.errors[0]?.message;
    }
    if (!errorMessage) errorMessage = 'Something went wrong';
    yield put({
      type: setErrorMessages.type,
      payload: [errorMessage],
    });
  }
}

function* questionGroupsWatcher() {
  yield takeEvery(getQuestionGroupRequest, getQuestionGroupFlow);
}

export default questionGroupsWatcher;

import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { STATUS_CODE } from '../../../constants/common';
import ProgressesService from '../../../services/ProgressesService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getProgressesFail,
  getProgressesRequest,
  getProgressesSuccess,
} from '../reducers/progresses';

import type { ProgressesResponse } from '../../../types/Responses';

function* getProgressesFlow(action: PayloadAction<{ jobId: number }>) {
  try {
    const response: AxiosResponse<ProgressesResponse> = yield call(
      ProgressesService.getProgresses,
      action.payload.jobId,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getProgressesSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getProgressesFail.type,
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

function* ProgressesWatcher() {
  yield takeEvery(getProgressesRequest, getProgressesFlow);
}

export default ProgressesWatcher;

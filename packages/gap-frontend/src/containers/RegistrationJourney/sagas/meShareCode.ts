import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import { STATUS_CODE } from '../../../constants/common';
import MeService from '../../../services/MeService';
import { setErrorMessages } from '../../Global/reducer';
import {
  checkMeShareCodeFail,
  checkMeShareCodeRequest,
  checkMeShareCodeSuccess,
} from '../reducers/meShareCode';

import type { ShareCodeResponse } from '../../../types/Responses';

function* checkMeShareCodeFlow(action: PayloadAction<{ shareCode: string }>) {
  try {
    const response: AxiosResponse<ShareCodeResponse> = yield call(
      MeService.checkShareCode,
      action.payload.shareCode,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: checkMeShareCodeSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: checkMeShareCodeFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });

    let errorMessage = error?.response?.data?.message;
    if (!errorMessage && error?.response?.data?.errors?.length > 0) {
      errorMessage = error?.response?.data?.errors[0]?.message;
    }
    if (!errorMessage) errorMessage = 'Something went wrong';
    yield put({
      type: setErrorMessages.type,
      payload: [errorMessage],
    });
  }
}

function* meShareCodeWatcher() {
  yield takeEvery(checkMeShareCodeRequest, checkMeShareCodeFlow);
}

export default meShareCodeWatcher;

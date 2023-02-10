import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import TrackingRecordService from '../../../services/TrackingRecordService';
import { setErrorMessages } from '../../Global/reducer';
import { STATUS_CODE } from '../../../constants/common';
import {
  registerAdvertReactionRequest,
  registerAdvertReactionSuccess,
  registerAdvertReactionFail,
} from '../reducers/trackingRecords';

import type { StatusResponse } from '../../../types/Responses';

function* registerAdvertReactionFlow({ payload }) {
  try {
    const registerAdvertReactionBody = { ...payload };
    const response: AxiosResponse<StatusResponse> = yield call(
      TrackingRecordService.registerAdvertReaction,
      registerAdvertReactionBody,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: registerAdvertReactionSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: registerAdvertReactionFail.type,
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

function* trackingRecordsWatcher() {
  yield takeEvery(registerAdvertReactionRequest, registerAdvertReactionFlow);
}

export default trackingRecordsWatcher;

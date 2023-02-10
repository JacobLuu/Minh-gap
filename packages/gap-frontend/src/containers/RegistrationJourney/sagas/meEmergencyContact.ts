import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import MeService from '../../../services/MeService';
import { setErrorMessages, setSuccessMessages } from '../../Global/reducer';
import {
  getEmergencyContactFail,
  getEmergencyContactRequest,
  getEmergencyContactSuccess,
  updateEmergencyContactRequest,
  updateEmergencyContactSuccess,
  updateEmergencyContactFail,
} from '../reducers/meEmergencyContact';

import type {
  EmergencyContactResponse,
  StatusResponse,
} from '../../../types/Responses';

function* getEmergencyContactFlow() {
  try {
    const response: AxiosResponse<EmergencyContactResponse> = yield call(
      MeService.getEmergencyContact,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getEmergencyContactSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getEmergencyContactFail.type,
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

function* updateEmergencyContactFlow({ payload }) {
  try {
    const response: AxiosResponse<EmergencyContactResponse | StatusResponse> =
      yield call(MeService.updateEmergencyContact, payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: updateEmergencyContactSuccess.type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Update emergency contact successful'],
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: updateEmergencyContactFail.type,
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

function* meJobsWatcher() {
  yield takeEvery(getEmergencyContactRequest, getEmergencyContactFlow);
  yield takeEvery(updateEmergencyContactRequest, updateEmergencyContactFlow);
}

export default meJobsWatcher;

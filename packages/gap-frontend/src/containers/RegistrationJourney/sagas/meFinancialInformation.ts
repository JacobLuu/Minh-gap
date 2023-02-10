import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import MeService from '../../../services/MeService';
import { setErrorMessages, setSuccessMessages } from '../../Global/reducer';
import {
  getFinancialInformationFail,
  getFinancialInformationRequest,
  getFinancialInformationSuccess,
  updateFinancialInformationRequest,
  updateFinancialInformationSuccess,
  updateFinancialInformationFail,
} from '../reducers/meFinancialInformation';

import type {
  FinancialInformationResponse,
  StatusResponse,
} from '../../../types/Responses';

function* getFinancialInformationFlow() {
  try {
    const response: AxiosResponse<FinancialInformationResponse> = yield call(
      MeService.getFinancialInformation,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getFinancialInformationSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getFinancialInformationFail.type,
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

function* updateFinancialInformationFlow({ payload }) {
  try {
    const response: AxiosResponse<
      FinancialInformationResponse | StatusResponse
    > = yield call(MeService.updateFinancialInformation, payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: updateFinancialInformationSuccess.type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Update financial information successful'],
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: updateFinancialInformationFail.type,
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
  yield takeEvery(getFinancialInformationRequest, getFinancialInformationFlow);
  yield takeEvery(
    updateFinancialInformationRequest,
    updateFinancialInformationFlow,
  );
}

export default meJobsWatcher;

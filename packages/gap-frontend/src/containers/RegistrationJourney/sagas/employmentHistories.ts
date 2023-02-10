import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import MeService from '../../../services/MeService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getEmploymentHistoriesFail,
  getEmploymentHistoriesRequest,
  getEmploymentHistoriesSuccess,
} from '../reducers/employmentHistories';

import type { EmploymentHistoriesResponse } from '../../../types/Responses';

function* getEmploymentHistoriesFlow() {
  try {
    const response: AxiosResponse<EmploymentHistoriesResponse> = yield call(
      MeService.getEmploymentHistories,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getEmploymentHistoriesSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getEmploymentHistoriesFail.type,
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

function* EmploymentHistoriesWatcher() {
  yield takeEvery(getEmploymentHistoriesRequest, getEmploymentHistoriesFlow);
}

export default EmploymentHistoriesWatcher;

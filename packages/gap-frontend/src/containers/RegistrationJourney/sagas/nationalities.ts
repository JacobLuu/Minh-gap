import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import NationalitiesService from '../../../services/NationalitiesService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getNationalitiesFail,
  getNationalitiesRequest,
  getNationalitiesSuccess,
} from '../reducers/nationalities';

import type { NationalitiesResponse } from '../../../types/Responses';

function* getNationalitiesFlow() {
  try {
    const response: AxiosResponse<NationalitiesResponse> = yield call(
      NationalitiesService.getNationalities,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getNationalitiesSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getNationalitiesFail.type,
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

function* NationalitiesWatcher() {
  yield takeEvery(getNationalitiesRequest, getNationalitiesFlow);
}

export default NationalitiesWatcher;

import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import EthnicitiesService from '../../../services/EthnicitiesService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getEthnicitiesFail,
  getEthnicitiesRequest,
  getEthnicitiesSuccess,
} from '../reducers/ethnicities';

import type { EthnicitiesResponse } from '../../../types/Responses';

function* getEthnicitiesFlow() {
  try {
    const response: AxiosResponse<EthnicitiesResponse> = yield call(
      EthnicitiesService.getEthnicities,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getEthnicitiesSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getEthnicitiesFail.type,
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

function* EthnicitiesWatcher() {
  yield takeEvery(getEthnicitiesRequest, getEthnicitiesFlow);
}

export default EthnicitiesWatcher;

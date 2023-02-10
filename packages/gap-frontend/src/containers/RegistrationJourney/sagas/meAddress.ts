import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import MeService from '../../../services/MeService';
import { setErrorMessages, setSuccessMessages } from '../../Global/reducer';
import {
  getAddressFail,
  getAddressRequest,
  getAddressSuccess,
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFail,
} from '../reducers/meAddress';

import type { AddressResponse, StatusResponse } from '../../../types/Responses';

function* getAddressFlow() {
  try {
    const response: AxiosResponse<AddressResponse> = yield call(
      MeService.getAddress,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getAddressSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getAddressFail.type,
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

function* updateAddressFlow({ payload }) {
  try {
    const response: AxiosResponse<AddressResponse | StatusResponse> =
      yield call(MeService.updateAddress, payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: updateAddressSuccess.type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Update address successful'],
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: updateAddressFail.type,
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
  yield takeEvery(getAddressRequest, getAddressFlow);
  yield takeEvery(updateAddressRequest, updateAddressFlow);
}

export default meJobsWatcher;

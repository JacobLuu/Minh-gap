import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { STATUS_CODE } from '../../../constants/common';
import AddressesService from '../../../services/AddressesService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getAddressFail,
  getAddressRequest,
  getAddressSuccess,
} from '../reducers/address';

import type { AddressResponse } from '../../../types/Responses';

function* getAddressFlow(action: PayloadAction<{ key: string }>) {
  try {
    const response: AxiosResponse<AddressResponse> = yield call(
      AddressesService.getAddress,
      action.payload.key,
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

function* AddressWatcher() {
  yield takeEvery(getAddressRequest, getAddressFlow);
}

export default AddressWatcher;

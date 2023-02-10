import { call, put, debounce } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import AuthenticationService from '../../services/AuthenticationService';
import { setErrorMessages } from '../Global/reducer';
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
} from './reducer';

interface INewPasswordRequest {
  payload: {
    email: string;
  };
}

function* newPasswordRequest({ payload }: INewPasswordRequest) {
  try {
    const response = yield call(AuthenticationService.forgotPassword, payload);
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = forgotPasswordSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      let errorMessage = response.data?.message;
      if (!errorMessage && response.data?.errors?.length > 0) {
        errorMessage = response.data.errors[0]?.message;
      }

      throw new Error(errorMessage);
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: error.message,
    });
    yield put({
      type: forgotPasswordFail.type,
      payload: error.message,
    });
  }
}

function* loginWatcher() {
  yield debounce(500, forgotPasswordRequest, newPasswordRequest);
}

export default loginWatcher;

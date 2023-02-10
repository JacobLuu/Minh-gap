import { put, debounce } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import { setErrorMessages } from '../Global/reducer';
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
} from './reducer';
import AuthenticationService from '../../services/user/AuthenticationService';

interface INewPasswordRequest {
  payload: {
    email: string;
  };
}

function* newPasswordRequest({ payload }: INewPasswordRequest) {
  try {
    const response = yield AuthenticationService.forgotPassword(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = forgotPasswordSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: forgotPasswordFail.type });
    }
  } catch (error) {
    yield put({
      type: setErrorMessages.type,
      payload: error.response.data.message,
    });
    yield put({
      type: forgotPasswordFail.type,
      payload: error.response.data.message,
    });
  }
}

function* loginWatcher() {
  yield debounce(500, forgotPasswordRequest, newPasswordRequest);
}

export default loginWatcher;

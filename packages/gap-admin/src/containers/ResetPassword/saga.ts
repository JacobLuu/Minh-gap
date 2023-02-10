import { put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import history from '../../utils/history';
import CLIENT_PATH from '../../constants/clientPath';
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
  verifyTokenRequest,
  verifyTokenSuccess,
  verifyTokenFail,
} from './reducer';
import { IResetPassword } from './ResetPassword';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import AuthenticationService from '../../services/user/AuthenticationService';

function* resetPasswordFlow<T extends IResetPassword = IResetPassword>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response = yield AuthenticationService.resetPassword(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = resetPasswordSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['You have successfully reset your password'],
      });
    } else {
      yield put({ type: resetPasswordFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: ['Failed to reset password'],
    });
    yield put({
      type: resetPasswordFail.type,
      payload: 'Wrong password format',
    });
  }
}

function* postVerifyTokenFlow({ payload }) {
  try {
    const response = yield AuthenticationService.verifyToken(payload);
    if (response.status === STATUS_CODE.SUCCESS) {
      const { is_available } = response.data;
      const { type } = verifyTokenSuccess;

      if (is_available) {
        yield put({
          type,
          payload: response.data,
        });
      } else {
        yield put({
          type: verifyTokenFail.type,
          payload: 'Token is invalid',
        });
        // toast message
        yield put({
          type: setErrorMessages.type,
          payload: ['Token is invalid'],
        });
      }
    } else {
      yield put({ type: verifyTokenFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    yield put({ type: verifyTokenFail.type });
    history.replace(CLIENT_PATH.LOGIN);
  }
}

function* resetPasswordWatcher() {
  yield takeEvery(verifyTokenRequest, postVerifyTokenFlow);
  yield takeEvery(resetPasswordRequest, resetPasswordFlow);
}

export default resetPasswordWatcher;

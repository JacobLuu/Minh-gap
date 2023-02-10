import { call, put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import AuthenticationService from '../../services/AuthenticationService';
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

function* resetPasswordFlow<T extends IResetPassword = IResetPassword>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response = yield call(AuthenticationService.resetPassword, payload);
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
      let errorMessage = response.data?.message;
      if (!errorMessage && response.data?.errors?.length > 0) {
        errorMessage = response.data.errors[0]?.message;
      }

      yield put({ type: resetPasswordFail.type });
      yield put({
        type: setErrorMessages.type,
        payload: [errorMessage],
      });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.message],
    });
    yield put({
      type: resetPasswordFail.type,
      payload: error.message,
    });
  }
}

function* verifyTokenFlow({ payload }) {
  try {
    const { token } = payload;
    const response = yield call(
      AuthenticationService.verifyResetPasswordToken,
      token,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      const { is_available } = response.data;
      const { type } = verifyTokenSuccess;
      if (is_available === false) {
        yield put({
          type: verifyTokenFail.type,
          payload: 'Token is invalid',
        });
        // toast message
        yield put({
          type: setErrorMessages.type,
          payload: ['Token is invalid'],
        });
      } else {
        yield put({
          type,
          payload: response.data,
        });
      }
    } else {
      let errorMessage = response.data?.message;
      if (!errorMessage && response.data?.errors?.length > 0) {
        errorMessage = response.data.errors[0]?.message;
      }

      throw new Error(errorMessage);
    }
  } catch (error: any) {
    // toast message
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.message],
    });
    yield put({ type: verifyTokenFail.type });
  }
}

function* resetPasswordWatcher() {
  yield takeEvery(verifyTokenRequest, verifyTokenFlow);
  yield takeEvery(resetPasswordRequest, resetPasswordFlow);
}

export default resetPasswordWatcher;

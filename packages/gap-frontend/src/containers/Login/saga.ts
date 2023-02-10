import { call, put, debounce, takeEvery } from 'redux-saga/effects';
import i18n from '../../utils/i18n';
import { STATUS_CODE } from '../../constants/common';
import {
  updateAccessToken,
  updateRefreshToken,
} from '../../utils/localStorage';
import {
  loginRequest,
  loginSuccess,
  loginFail,
  getMeRequest,
  getMeSuccess,
  getMeFail,
} from './reducer';
import AuthenticationService from '../../services/AuthenticationService';
import MeService from '../../services/MeService';
import { setErrorMessages } from '../Global/reducer';

interface ILoginPayload {
  email: string;
  password: string;
}

function* loginFlow<T extends ILoginPayload = ILoginPayload>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response = yield call(AuthenticationService.login, payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { access_token, refresh_token } = response.data;
      yield call(updateAccessToken, access_token);
      yield call(updateRefreshToken, refresh_token);

      const { type } = loginSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else if (response.status === STATUS_CODE.UNAUTHORIZED) {
      throw new Error(i18n.t('common.validation.password.wrong_password'));
    } else {
      let errorMessage = response.data?.message;
      if (!errorMessage && response.data?.errors?.length > 0) {
        errorMessage = response.data.errors[0]?.message;
      }

      throw new Error(errorMessage);
    }
  } catch (error: any) {
    yield put({ type: loginFail.type, payload: error.message });
    // toast message
    yield put({
      type: setErrorMessages.type,
      payload: [error.message],
    });
  }
}

function* getMeFlow() {
  try {
    const response = yield call(MeService.getMe);
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getMeSuccess;
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
      payload: [error.message],
    });
    yield put({
      type: getMeFail.type,
      payload: error.message,
    });
  }
}

function* loginWatcher() {
  yield debounce(500, loginRequest, loginFlow);
  yield takeEvery(getMeRequest, getMeFlow);
}

export default loginWatcher;

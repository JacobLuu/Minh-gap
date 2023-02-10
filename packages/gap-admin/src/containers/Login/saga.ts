import { put, debounce } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import {
  getActionLoginRequest,
  getActionLoginSuccess,
  getActionLoginFail,
  getAccountInfoSuccess,
  getAccountInfoFail,
} from './reducer';
import {
  setAccessToken,
  setAccountInfo,
  setSelectedBranch,
} from '../../utils/localStorage';
import { ROLES } from '../../constants/enums';

import { setErrorMessages } from '../Global/reducer';
import AuthenticationService from '../../services/user/AuthenticationService';

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
    const response = yield AuthenticationService.login(payload);
    if (response.status === STATUS_CODE.SUCCESS) {
      setAccessToken(response.data?.access_token);

      try {
        const responseAuthentication =
          yield AuthenticationService.accountInfo();

        if (responseAuthentication.status === STATUS_CODE.SUCCESS) {
          setAccountInfo(responseAuthentication.data);

          if (responseAuthentication.data.roles.includes(ROLES.CONSULTANT)) {
            setSelectedBranch(responseAuthentication.data.branches[0].id);
          }

          yield put({
            type: getAccountInfoSuccess.type,
          });
        }
      } catch (error) {
        yield put({
          type: getAccountInfoFail.type,
        });
      }

      const { type } = getActionLoginSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      // toast message
      yield put({
        type: setErrorMessages.type,
        payload: [response.data.detail],
      });

      yield put({
        type: getActionLoginFail.type,
      });
    }
  } catch (error) {
    // toast message
    yield put({
      type: setErrorMessages.type,
      payload: [error.response.data.detail],
    });

    yield put({
      type: getActionLoginFail.type,
    });
  }
}

function* loginWatcher() {
  yield debounce(500, getActionLoginRequest, loginFlow);
}

export default loginWatcher;

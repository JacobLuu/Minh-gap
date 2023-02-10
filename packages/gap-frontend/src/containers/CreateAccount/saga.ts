import { call, put, debounce } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';
import AuthenticationService from '../../services/AuthenticationService';
import { signupRequest, signupSuccess, signupFail } from './reducer';
import { setSuccessMessages, setErrorMessages } from '../Global/reducer';

interface ICreateAccountInputs {
  email: string;
  password: string;
}

function* signupFlow<T extends ICreateAccountInputs = ICreateAccountInputs>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response = yield call(AuthenticationService.signup, payload);
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = signupSuccess;

      yield put({
        type,
        payload: response.data,
      });

      // toast message
      yield put({
        type: setSuccessMessages.type,
        payload: ['Create account successful'],
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: signupFail.type,
      payload: error.message,
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

function* signupWatcher() {
  yield debounce(500, signupRequest, signupFlow);
}

export default signupWatcher;

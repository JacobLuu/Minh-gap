import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import MeService from '../../../services/MeService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getMeSkillsFail,
  getMeSkillsRequest,
  getMeSkillsSuccess,
} from '../reducers/meSkills';

import type { SkillsResponse } from '../../../types/Responses';

function* getMeSkillsFlow() {
  try {
    const response: AxiosResponse<SkillsResponse> = yield call(
      MeService.getSkills,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getMeSkillsSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getMeSkillsFail.type,
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

function* meSkillsWatcher() {
  yield takeEvery(getMeSkillsRequest, getMeSkillsFlow);
}

export default meSkillsWatcher;

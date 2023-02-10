import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import SkillsService from '../../../services/SkillsService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getSkillsFail,
  getSkillsRequest,
  getSkillsSuccess,
} from '../reducers/skills';

import type { SkillsResponse } from '../../../types/Responses';

function* getSkillsFlow() {
  try {
    const response: AxiosResponse<SkillsResponse> = yield call(
      SkillsService.getSkills,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getSkillsSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getSkillsFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });

    let errorMessage = error?.response?.data?.message;
    if (!errorMessage && error?.response?.data?.errors?.length > 0) {
      errorMessage = error?.response?.data.errors[0]?.message;
    }
    if (!errorMessage) errorMessage = 'Something went wrong';
    yield put({
      type: setErrorMessages.type,
      payload: [errorMessage],
    });
  }
}

function* skillsWatcher() {
  yield takeEvery(getSkillsRequest, getSkillsFlow);
}

export default skillsWatcher;

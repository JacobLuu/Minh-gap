import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import MeService from '../../../services/MeService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getMeJobsFail,
  getMeJobsRequest,
  getMeJobsSuccess,
  addMeJobsRequest,
  addMeJobsSuccess,
  addMeJobsFail,
} from '../reducers/meJobs';

import type {
  JobsResponse,
  JobResponse,
  StatusResponse,
} from '../../../types/Responses';

function* getMeJobsFlow() {
  try {
    const response: AxiosResponse<JobsResponse> = yield call(MeService.getJobs);
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getMeJobsSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getMeJobsFail.type,
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

function* addMeJobFlow({ payload }) {
  try {
    const addJobBody = { ...payload };
    const response: AxiosResponse<JobResponse | StatusResponse> = yield call(
      MeService.addJob,
      addJobBody,
    );
    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      yield put({
        type: addMeJobsSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: addMeJobsFail.type,
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

function* meJobsWatcher() {
  yield takeEvery(getMeJobsRequest, getMeJobsFlow);
  yield takeEvery(addMeJobsRequest, addMeJobFlow);
}

export default meJobsWatcher;

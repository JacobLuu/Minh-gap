import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../constants/common';

import CandidatesService from '../../services/consultant/CandidatesService';
import { CandidatesRequests } from '../../types/Requests';
import {
  getInterviewRequest,
  getInterviewSuccess,
  getInterviewFail,
} from './reducer';

function* InterviewFlow<T extends CandidatesRequests = CandidatesRequests>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield CandidatesService.getCandidates(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getInterviewSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getInterviewFail.type });
    }
  } catch (error) {
    yield put({
      type: getInterviewFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* interViewWatcher() {
  yield takeEvery(getInterviewRequest, InterviewFlow);
}

export default interViewWatcher;

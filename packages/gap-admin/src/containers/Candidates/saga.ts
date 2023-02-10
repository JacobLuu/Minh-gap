import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../constants/common';
import CandidatesService from '../../services/consultant/CandidatesService';
import { CandidatesRequests } from '../../types/Requests';

import {
  candidatesRequest,
  candidatesSuccess,
  candidatesFail,
} from './reducer';

function* CandidatesDataFlow<
  T extends CandidatesRequests = CandidatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield CandidatesService.getCandidates(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = candidatesSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: candidatesFail.type });
    }
  } catch (error) {
    yield put({
      type: candidatesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* CandidatesWatcher() {
  yield takeEvery(candidatesRequest, CandidatesDataFlow);
}

export default CandidatesWatcher;

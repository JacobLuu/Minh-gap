import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../constants/common';
import CandidatesService from '../../services/consultant/CandidatesService';
import { CandidatesRequests } from '../../types/Requests';

import {
  advertResponsesDataRequest,
  advertResponsesDataSuccess,
  advertResponsesDataFail,
} from './reducer';

function* AdvertResponsesDataFlow<
  T extends CandidatesRequests = CandidatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield CandidatesService.getCandidates(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = advertResponsesDataSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: advertResponsesDataFail.type });
    }
  } catch (error) {
    yield put({
      type: advertResponsesDataFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* AdvertResponsesWatcher() {
  yield takeEvery(advertResponsesDataRequest, AdvertResponsesDataFlow);
}

export default AdvertResponsesWatcher;

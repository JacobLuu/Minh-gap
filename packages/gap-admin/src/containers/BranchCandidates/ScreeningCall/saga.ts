import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../../constants/common';
import BranchCandidatesService from '../../../services/compliance/BranchCandidatesService';
import {
  branchCandidateDataDetailRequest,
  branchCandidateDataDetailSuccess,
  branchCandidateDataDetailFail,
} from './reducer';

import { CandidatesIdRequests } from '../../../types/Requests';

function* BranchCandidateDataDetailFlow<
  T extends CandidatesIdRequests = CandidatesIdRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesIdRequests> =
      yield BranchCandidatesService.getCandidatesId(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = branchCandidateDataDetailSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: branchCandidateDataDetailFail.type });
    }
  } catch (error) {
    yield put({
      type: branchCandidateDataDetailFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* BranchCandidateDataDetailWatcher() {
  yield takeEvery(
    branchCandidateDataDetailRequest,
    BranchCandidateDataDetailFlow,
  );
}

export default BranchCandidateDataDetailWatcher;

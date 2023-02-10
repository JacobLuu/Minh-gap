import axios, { AxiosResponse } from 'axios';
import { put, debounce } from 'redux-saga/effects';
import { DEFAULT_DEBOUNCE_TIME, STATUS_CODE } from '../../constants/common';
import ComplianceService from '../../services/compliance/ComplianceService';
import { CandidatesRequests } from '../../types/Requests';
import {
  getBranchCandidatesRequest,
  getBranchCandidatesSuccess,
  getBranchCandidatesFail,
} from './reducer';

function* branchViewDataFlow<
  T extends CandidatesRequests = CandidatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield ComplianceService.getComplianceCandidates(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getBranchCandidatesSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getBranchCandidatesFail.type });
    }
  } catch (error) {
    yield put({
      type: getBranchCandidatesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* branchViewWatcher() {
  yield debounce(
    DEFAULT_DEBOUNCE_TIME,
    getBranchCandidatesRequest,
    branchViewDataFlow,
  );
}

export default branchViewWatcher;

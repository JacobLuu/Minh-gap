import axios, { AxiosResponse } from 'axios';
import { put, debounce } from 'redux-saga/effects';
import ComplianceService from '../../services/compliance/ComplianceService';
import { STATUS_CODE } from '../../constants/common';
import { CandidatesRequests } from '../../types/Requests';
import {
  rightToWorkHubDataRequest,
  rightToWorkHubDataSuccess,
  rightToWorkHubDataFail,
} from './reducer';

function* rightToWorkHubDataFlow() {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield ComplianceService.getComplianceCandidates(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = rightToWorkHubDataSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: rightToWorkHubDataFail.type });
    }
  } catch (error: any) {
    yield put({
      type: rightToWorkHubDataFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* rightToWorkHubWatcher() {
  yield debounce(500, rightToWorkHubDataRequest, rightToWorkHubDataFlow);
}

export default rightToWorkHubWatcher;

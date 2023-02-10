import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import EscalatedIssueService from '../../services/compliance/EscalatedIssueService';
import EscalatedIssuesConsultants from '../../services/consultant/EscalatedService';
import { EscalatedIssuesRequest } from '../../types/Requests';
import { isConsultant, isCompliance } from '../../utils/userRoles';
import { STATUS_CODE } from '../../constants/common';
import {
  getEscalatedIssuesRequest,
  getEscalatedIssuesSuccess,
  getEscalatedIssuesFail,
} from './reducer';

function* escalatedIssuesComplianceFlow<
  T extends EscalatedIssuesRequest = EscalatedIssuesRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<EscalatedIssuesRequest> =
      yield EscalatedIssueService.getEscalatedIssuesCompliance(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getEscalatedIssuesSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getEscalatedIssuesFail.type });
    }
  } catch (error) {
    yield put({
      type: getEscalatedIssuesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* escalatedIssuesConsultantFlow<
  T extends EscalatedIssuesRequest = EscalatedIssuesRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<EscalatedIssuesRequest> =
      yield EscalatedIssuesConsultants.getEscalatedIssuesConsultants(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getEscalatedIssuesSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getEscalatedIssuesFail.type });
    }
  } catch (error) {
    yield put({
      type: getEscalatedIssuesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* escalatedIssuesWatcher() {
  if (isCompliance()) {
    yield takeEvery(getEscalatedIssuesRequest, escalatedIssuesComplianceFlow);
  }
  if (isConsultant()) {
    yield takeEvery(getEscalatedIssuesRequest, escalatedIssuesConsultantFlow);
  }
}

export default escalatedIssuesWatcher;

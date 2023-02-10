import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { STATUS_CODE } from '../../../constants/common';
import ComplianceService from '../../../services/compliance/ComplianceService';
import { setErrorMessages } from '../../Global/reducer';
import {
  DocumentRequest,
  CandidatesRequests,
  QuestionGroupRequests,
  CommunicationNoteRequest,
  EmploymentHistoriesRequests,
} from '../../../types/Requests';
import {
  getBranchInterviewRequest,
  getBranchInterviewSuccess,
  getBranchInterviewFail,
  getBranchInterviewDetailsRequest,
  getBranchInterviewDetailsSuccess,
  getBranchInterviewDetailsFail,
  getCommunicationNoteRequest,
  getCommunicationNoteSuccess,
  getCommunicationNoteFail,
  getEmployeeHistoriesRequest,
  getEmployeeHistoriesSuccess,
  getEmployeeHistoriesFail,
  getQuestionGroupRequest,
  getQuestionGroupSuccess,
  getQuestionGroupFail,
  getFilesDocumentRequest,
  getFilesDocumentSuccess,
  getFilesDocumentFail,
} from './reducer';

function* BranchInterviewFlow<
  T extends CandidatesRequests = CandidatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield ComplianceService.getComplianceCandidates(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getBranchInterviewSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getBranchInterviewFail.type });
    }
  } catch (error) {
    yield put({
      type: getBranchInterviewFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* BranchInterviewDetailsFlow<
  T extends CandidatesRequests = CandidatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield ComplianceService.getComplianceCandidatesId(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getBranchInterviewDetailsSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getBranchInterviewDetailsFail.type });
    }
  } catch (error) {
    yield put({
      type: getBranchInterviewDetailsFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* GetCommunicationNoteFlow<
  T extends CommunicationNoteRequest = CommunicationNoteRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CommunicationNoteRequest> =
      yield ComplianceService.getCommunicationNote(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getCommunicationNoteSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getCommunicationNoteFail.type });
    }
  } catch (error) {
    yield put({
      type: getCommunicationNoteFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* EmployeeHistoriesFlow<
  T extends EmploymentHistoriesRequests = EmploymentHistoriesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<EmploymentHistoriesRequests> =
      yield ComplianceService.getEmploymentHistories(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getEmployeeHistoriesSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getEmployeeHistoriesFail.type });
    }
  } catch (error) {
    yield put({
      type: getEmployeeHistoriesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* GetQuestionGroupFlow<
  T extends QuestionGroupRequests = QuestionGroupRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<QuestionGroupRequests> =
      yield ComplianceService.getQuestionGroup(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getQuestionGroupSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getQuestionGroupFail.type });
    }
  } catch (error: any) {
    yield put({
      type: getQuestionGroupFail.type,
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

function* GetFilesDocumentFlow<T extends DocumentRequest = DocumentRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<DocumentRequest> =
      yield ComplianceService.getFilesDocument(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getFilesDocumentSuccess;
      yield put({
        type,
        payload: { ...response.data, fileType: payload },
      });
    } else {
      yield put({ type: getFilesDocumentFail.type });
    }
  } catch (error) {
    yield put({
      type: getFilesDocumentFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* branchInterviewWatcher() {
  yield takeEvery(getBranchInterviewRequest, BranchInterviewFlow);
  yield takeEvery(getFilesDocumentRequest, GetFilesDocumentFlow);
  yield takeEvery(getBranchInterviewDetailsRequest, BranchInterviewDetailsFlow);
  yield takeEvery(getEmployeeHistoriesRequest, EmployeeHistoriesFlow);
  yield takeEvery(getCommunicationNoteRequest, GetCommunicationNoteFlow);
  yield takeEvery(getQuestionGroupRequest, GetQuestionGroupFlow);
}

export default branchInterviewWatcher;

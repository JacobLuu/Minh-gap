import axios, { AxiosResponse } from 'axios';
import { put, takeEvery, debounce } from 'redux-saga/effects';
import { getErrorMessage } from 'gap-admin/src/utils/customHooks';
import { STATUS_CODE } from '../../../constants/common';
import CandidatesService from '../../../services/consultant/CandidatesService';
import BranchesService from '../../../services/consultant/BranchesService';
import { setSuccessMessages, setErrorMessages } from '../../Global/reducer';
import {
  advertResponsesDataDetailRequest,
  advertResponsesDataDetailSuccess,
  advertResponsesDataDetailFail,
  updateCandidateRequest,
  updateCandidateSuccess,
  updateCandidateFail,
  getBranchesRequest,
  getBranchesSuccess,
  getBranchesFail,
  interviewBookingRequest,
  interviewBookingSuccess,
  interviewBookingFail,
  getContactLogRequest,
  getContactLogSuccess,
  getContactLogFail,
  postContactLogRequest,
  postContactLogSuccess,
  postContactLogFail,
} from './reducer';

import {
  InterviewBookingRequest,
  UpdateCandidateRequest,
  CandidatesIdRequests,
  BranchesRequest,
  ContactLogRequest,
} from '../../../types/Requests';

function* AdvertResponsesDataDetailFlow<
  T extends CandidatesIdRequests = CandidatesIdRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesIdRequests> =
      yield CandidatesService.getCandidatesId(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = advertResponsesDataDetailSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: advertResponsesDataDetailFail.type });
    }
  } catch (error: any) {
    const errorMessage = getErrorMessage(error?.response?.data?.message);
    yield put({
      type: advertResponsesDataDetailFail.type,
      payload: [errorMessage],
    });
  }
}

function* branchManagementFlow<T extends BranchesRequest = BranchesRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<BranchesRequest> =
      yield BranchesService.getBranches(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getBranchesSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getBranchesFail.type });
    }
  } catch (error) {
    yield put({
      type: getBranchesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* InterviewBookingFlow<
  T extends InterviewBookingRequest = InterviewBookingRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<InterviewBookingRequest> =
      yield CandidatesService.postInterviewBooking(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: interviewBookingSuccess.type,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Booking successful'],
      });
    } else {
      yield put({ type: interviewBookingFail.type });
    }
  } catch (error) {
    yield put({
      type: interviewBookingFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* EditCandidateFlow<
  T extends UpdateCandidateRequest = UpdateCandidateRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<UpdateCandidateRequest> =
      yield CandidatesService.updateCandidate(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateCandidateSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Update successful'],
      });
    } else {
      yield put({ type: updateCandidateFail.type });
    }
  } catch (error) {
    yield put({
      type: updateCandidateFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* GetContactLogsFlow<T extends ContactLogRequest = ContactLogRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<ContactLogRequest> =
      yield CandidatesService.getContactLogs(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getContactLogSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getContactLogFail.type });
    }
  } catch (error: any) {
    yield put({
      type: getContactLogFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
    let errorMessage = error?.response?.data?.detail;
    if (!errorMessage && error?.response?.data?.errors?.length > 0) {
      errorMessage = error?.response?.data.errors[0]?.detail;
    }
    if (!errorMessage) errorMessage = 'Something went wrong';
    yield put({
      type: setErrorMessages.type,
      payload: [errorMessage],
    });
  }
}

function* PostContactLogsFlow<T extends ContactLogRequest = ContactLogRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<ContactLogRequest> =
      yield CandidatesService.postContactLogs(payload);

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = postContactLogSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: postContactLogFail.type });
    }
  } catch (error: any) {
    yield put({
      type: postContactLogFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
    let errorMessage = error?.response?.data?.detail;
    if (!errorMessage && error?.response?.data?.errors?.length > 0) {
      errorMessage = error?.response?.data.errors[0]?.detail;
    }
    if (!errorMessage) errorMessage = 'Something went wrong';
    yield put({
      type: setErrorMessages.type,
      payload: [errorMessage],
    });
  }
}

function* AdvertResponsesDataDetailWatcher() {
  yield takeEvery(
    advertResponsesDataDetailRequest,
    AdvertResponsesDataDetailFlow,
  );
  yield takeEvery(getContactLogRequest, GetContactLogsFlow);
  yield takeEvery(postContactLogRequest, PostContactLogsFlow);
  yield takeEvery(getBranchesRequest, branchManagementFlow);
  yield debounce(500, interviewBookingRequest, InterviewBookingFlow);
  yield debounce(500, updateCandidateRequest, EditCandidateFlow);
}

export default AdvertResponsesDataDetailWatcher;

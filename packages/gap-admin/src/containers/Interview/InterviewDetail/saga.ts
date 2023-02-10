import axios, { AxiosResponse } from 'axios';
import { put, takeEvery, debounce } from 'redux-saga/effects';
import type { AddAnswersRequest } from 'gap-common/src/types/Requests';
import CandidatesService from '../../../services/consultant/CandidatesService';
import EmployeeHistoriesService from '../../../services/consultant/EmployeeHistoriesService';
import { STATUS_CODE } from '../../../constants/common';
import { setSuccessMessages, setErrorMessages } from '../../Global/reducer';

import {
  EscalatedIssueRequest,
  CandidateMissingInformationRequests,
  UpdateEscalatedIssueRequest,
  EmploymentHistoriesRequests,
  DocumentRequest,
  CandidatesRequests,
  CandidateJobRequest,
  SkillsRequest,
} from '../../../types/Requests';
import {
  getQuestionGroupRequest,
  getQuestionGroupSuccess,
  getQuestionGroupFail,
  getFilesDocumentWithJobRequest,
  getFilesDocumentWithJobSuccess,
  getFilesDocumentWithJobFail,
  getFilesDocumentRequest,
  getFilesDocumentSuccess,
  getFilesDocumentFail,
  updateDocumentStatusRequest,
  updateDocumentStatusSuccess,
  updateDocumentStatusFail,
  deleteFilesDocumentRequest,
  deleteFilesDocumentSuccess,
  deleteFilesDocumentFail,
  getMissingInformationRequest,
  getMissingInformationSuccess,
  getMissingInformationFail,
  getCommunicationNoteRequest,
  getCommunicationNoteSuccess,
  getCommunicationNoteFail,
  updateCommunicationNoteRequest,
  updateCommunicationNoteSuccess,
  updateCommunicationNoteFail,
  postMissingInformationRequest,
  postMissingInformationSuccess,
  postMissingInformationFail,
  getEmployeeHistoriesRequest,
  getEmployeeHistoriesSuccess,
  getEmployeeHistoriesFail,
  getInterviewDetailRequest,
  getInterviewDetailSuccess,
  getInterviewDetailFail,
  updateCandidateRequest,
  updateCandidateSuccess,
  updateCandidateFail,
  updateCandidateJobRequest,
  updateCandidateJobSuccess,
  updateCandidateJobFail,
  postFilesDocumentRequest,
  postFilesDocumentSuccess,
  postFilesDocumentFail,
  escalatedIssuesRequest,
  escalatedIssuesSuccess,
  escalatedIssuesFail,
  updateEscalatedIssuesRequest,
  updateEscalatedIssuesSuccess,
  updateEscalatedIssuesFail,
  postQuestionGroupAnswersRequest,
  postQuestionGroupAnswersSuccess,
  postQuestionGroupAnswersFail,
  postSkillsRequests,
  postSkillsSuccess,
  postSkillsFail,
  getSkillsRequests,
  getSkillsSuccess,
  getSkillsFail,
  getCandidateSkillsRequests,
  getCandidateSkillsSuccess,
  getCandidateSkillsFail,
  removeCandidateSkillsRequests,
  removeCandidateSkillsSuccess,
  removeCandidateSkillsFail,
} from './reducer';

function* InterviewDetailFlow<
  T extends CandidatesRequests = CandidatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield CandidatesService.getCandidatesId(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getInterviewDetailSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getInterviewDetailFail.type });
    }
  } catch (error) {
    yield put({
      type: getInterviewDetailFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* getMissingInformationFlow<
  T extends CandidatesRequests = CandidatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield CandidatesService.getCandidateMissingInformationRequests(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getMissingInformationSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getMissingInformationFail.type });
    }
  } catch (error) {
    yield put({
      type: getMissingInformationFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* postMissingInformationFlow<
  T extends CandidatesRequests = CandidatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidatesRequests> =
      yield CandidatesService.postCandidateMissingInformationRequests(payload);

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = postMissingInformationSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Request success.'],
      });
    } else {
      yield put({ type: postMissingInformationFail.type });
    }
  } catch (error) {
    yield put({
      type: postMissingInformationFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* GetCommunicationNoteFlow<
  T extends CandidateMissingInformationRequests = CandidateMissingInformationRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidateMissingInformationRequests> =
      yield CandidatesService.getCommunicationNote(payload);

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

function* UpdateCommunicationNoteFlow<
  T extends CandidateMissingInformationRequests = CandidateMissingInformationRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidateMissingInformationRequests> =
      yield CandidatesService.updateCommunicationNote(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateCommunicationNoteSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Update success.'],
      });
    } else {
      yield put({ type: updateCommunicationNoteFail.type });
    }
  } catch (error) {
    yield put({
      type: updateCommunicationNoteFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* UpdateCandidateJobFlow<
  T extends CandidateJobRequest = CandidateJobRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<CandidateJobRequest> =
      yield CandidatesService.updateCandidateJob(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateCandidateJobSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: updateCandidateJobFail.type });
    }
  } catch (error) {
    yield put({
      type: updateCandidateJobFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* EscalatedIssuesFlow<
  T extends EscalatedIssueRequest = EscalatedIssueRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<EscalatedIssueRequest> =
      yield CandidatesService.escalatedIssues(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = escalatedIssuesSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Issue log success.'],
      });
    } else {
      yield put({ type: escalatedIssuesFail.type });
    }
  } catch (error) {
    yield put({
      type: escalatedIssuesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* UpdateEscalatedIssuesFlow<
  T extends UpdateEscalatedIssueRequest = UpdateEscalatedIssueRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<UpdateEscalatedIssueRequest> =
      yield CandidatesService.updateEscalatedIssue(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateEscalatedIssuesSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [payload?.message],
      });
    } else {
      yield put({ type: updateEscalatedIssuesFail.type });
    }
  } catch (error) {
    yield put({
      type: updateEscalatedIssuesFail.type,
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
      yield EmployeeHistoriesService.getEmploymentHistories(payload);

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

function* EditCandidateFlow<T extends any = any>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<any> =
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

function* GetFilesDocumentFlow<T extends DocumentRequest = DocumentRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<DocumentRequest> =
      yield CandidatesService.getFilesDocument(payload);

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

function* GetFilesDocumentWithJobFlow<
  T extends DocumentRequest = DocumentRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<DocumentRequest> =
      yield CandidatesService.getFilesDocumentWithJob(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getFilesDocumentWithJobSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getFilesDocumentWithJobFail.type });
    }
  } catch (error) {
    yield put({
      type: getFilesDocumentWithJobFail.type,
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

function* PostFilesDocumentFlow<T extends DocumentRequest = DocumentRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<DocumentRequest> =
      yield CandidatesService.postFilesDocument(payload);

    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      const { type } = postFilesDocumentSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [`${payload?.type?.replace(/_/g, ' ')} file successful`],
      });
    } else {
      yield put({ type: postFilesDocumentFail.type });
    }
  } catch (error) {
    yield put({
      type: postFilesDocumentFail.type,
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

function* PostQuestionGroupAnswersFlow<
  T extends AddAnswersRequest = AddAnswersRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<AddAnswersRequest> =
      yield CandidatesService.postQuestionGroupAnswers({
        type: payload?.type,
        candidate_id: payload?.candidate_id,
        questions: payload?.questions,
      });

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = postQuestionGroupAnswersSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [`${payload?.type?.replace(/_/g, ' ')} save successful`],
      });
    } else {
      yield put({ type: postQuestionGroupAnswersFail.type });
    }
  } catch (error) {
    yield put({
      type: postQuestionGroupAnswersFail.type,
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

function* GetSkillsFlow() {
  try {
    const response: AxiosResponse<SkillsRequest> =
      yield CandidatesService.getSkillsRequests();

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getSkillsSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getSkillsFail.type });
    }
  } catch (error) {
    yield put({
      type: getSkillsFail.type,
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

function* GetCandidateSkillsFlow<T extends SkillsRequest = SkillsRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<SkillsRequest> =
      yield CandidatesService.getCandidateSkills(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getCandidateSkillsSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getCandidateSkillsFail.type });
    }
  } catch (error) {
    yield put({
      type: getCandidateSkillsFail.type,
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

function* RemoveCandidateSkillsFlow<T extends SkillsRequest = SkillsRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<SkillsRequest> =
      yield CandidatesService.removeCandidateSkills(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = removeCandidateSkillsSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: removeCandidateSkillsFail.type });
    }
  } catch (error) {
    yield put({
      type: removeCandidateSkillsFail.type,
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

function* PostSkillsFlow<T extends SkillsRequest = SkillsRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<SkillsRequest> =
      yield CandidatesService.postCandidateSkills({
        candidate_id: payload?.candidate_id,
        skill_id: payload?.skill_id,
      });

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = postSkillsSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: [`Skill id ${payload?.skill_id} save successful`],
      });
    } else {
      yield put({ type: postSkillsFail.type });
    }
  } catch (error) {
    yield put({
      type: postSkillsFail.type,
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

function* UpdateDocumentStatusFlow<
  T extends DocumentRequest = DocumentRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<DocumentRequest> =
      yield CandidatesService.updateDocumentStatus(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateDocumentStatusSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: updateDocumentStatusFail.type });
    }
  } catch (error) {
    yield put({
      type: updateDocumentStatusFail.type,
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

function* DeleteFilesDocumentFlow<T extends DocumentRequest = DocumentRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<DocumentRequest> =
      yield CandidatesService.deleteFilesDocument(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = deleteFilesDocumentSuccess;
      yield put({
        type,
        payload,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Delete file successful'],
      });
    } else {
      yield put({ type: deleteFilesDocumentFail.type });
    }
  } catch (error) {
    yield put({
      type: deleteFilesDocumentFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* GetQuestionGroupFlow<T extends DocumentRequest = DocumentRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<DocumentRequest> =
      yield CandidatesService.getQuestionGroup(payload);

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

function* interViewWatcher() {
  yield takeEvery(getInterviewDetailRequest, InterviewDetailFlow);
  yield takeEvery(getMissingInformationRequest, getMissingInformationFlow);
  yield takeEvery(postMissingInformationRequest, postMissingInformationFlow);
  yield takeEvery(getEmployeeHistoriesRequest, EmployeeHistoriesFlow);
  yield takeEvery(getCommunicationNoteRequest, GetCommunicationNoteFlow);
  yield takeEvery(getFilesDocumentWithJobRequest, GetFilesDocumentWithJobFlow);
  yield takeEvery(getFilesDocumentRequest, GetFilesDocumentFlow);
  yield takeEvery(deleteFilesDocumentRequest, DeleteFilesDocumentFlow);
  yield takeEvery(updateCommunicationNoteRequest, UpdateCommunicationNoteFlow);
  yield takeEvery(postFilesDocumentRequest, PostFilesDocumentFlow);
  yield takeEvery(getQuestionGroupRequest, GetQuestionGroupFlow);
  yield takeEvery(updateDocumentStatusRequest, UpdateDocumentStatusFlow);
  yield takeEvery(postSkillsRequests, PostSkillsFlow);
  yield takeEvery(getSkillsRequests, GetSkillsFlow);
  yield takeEvery(getCandidateSkillsRequests, GetCandidateSkillsFlow);
  yield takeEvery(removeCandidateSkillsRequests, RemoveCandidateSkillsFlow);
  yield takeEvery(updateCandidateJobRequest, UpdateCandidateJobFlow);
  yield debounce(
    500,
    postQuestionGroupAnswersRequest,
    PostQuestionGroupAnswersFlow,
  );
  yield debounce(500, escalatedIssuesRequest, EscalatedIssuesFlow);
  yield debounce(500, updateEscalatedIssuesRequest, UpdateEscalatedIssuesFlow);
  yield debounce(500, updateCandidateRequest, EditCandidateFlow);
}

export default interViewWatcher;

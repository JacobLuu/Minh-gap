import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FILE_TYPE,
  HISTORY_TYPE,
  QUESTION_GROUP_TYPE,
  ESCALATED_ISSUES_STATUS,
} from 'gap-common/src/constants/enums';
import { REQUEST_STATUS } from '../../../constants/common';

const initialQuestionGroupData: Record<QUESTION_GROUP_TYPE, any> = {
  [QUESTION_GROUP_TYPE.DECLARATIONS_AGREEMENTS]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_DISCLOSURE_AND_BARRING_SERVICE]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_HEALTH_AND_DISABILITY]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_OVERALL_AGREEMENT]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_PAYMENT]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_SEEKING]: null,
  [QUESTION_GROUP_TYPE.DECLARATIONS_TRANSPORT_AND_AVAILABILITY]: null,
  [QUESTION_GROUP_TYPE.PERSONAL_PROTECTIVE_EQUIPMENTS]: null,
};

export const slice = createSlice({
  name: 'interviewDetailSlice',
  initialState: {
    skills: [],
    candidateSkills: [],
    filesDocuments: [],
    filesDocumentWithJobs: [],
    documentsContracts: {},
    interviewDetailData: {},
    employeeHistoriesData: [],
    employeeEducationData: [],
    employeeOtherData: [],
    communicationNoteData: '',
    missingInformationData: [],
    escalatedIssuesData: [],
    questionGroupData: initialQuestionGroupData,
    getSkillsStatus: REQUEST_STATUS.IDLE,
    getQuestionGroupStatus: REQUEST_STATUS.IDLE,
    postQuestionGroupStatus: REQUEST_STATUS.IDLE,
    getFilesDocumentStatus: REQUEST_STATUS.IDLE,
    postFilesDocumentStatus: REQUEST_STATUS.IDLE,
    deleteFilesDocumentStatus: REQUEST_STATUS.IDLE,
    escalatedIssuesStatus: REQUEST_STATUS.IDLE,
    getMissingInformationStatus: REQUEST_STATUS.IDLE,
    communicationNoteStatus: REQUEST_STATUS.IDLE,
    postMissingInformationStatus: REQUEST_STATUS.IDLE,
    employeeHistoriesStatus: REQUEST_STATUS.IDLE,
    interViewStatus: REQUEST_STATUS.IDLE,
    interViewDetailStatus: REQUEST_STATUS.IDLE,
    updateCandidateStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getInterviewDetailRequest: (state, action) => {
      if (action) state.interViewDetailStatus = REQUEST_STATUS.REQUESTING;
    },
    getInterviewDetailSuccess: (state, action) => {
      if (action) state.interViewDetailStatus = REQUEST_STATUS.SUCCESS;
      state.interviewDetailData = action.payload;
    },
    getInterviewDetailFail: (state, action) => {
      if (action) state.interViewDetailStatus = REQUEST_STATUS.ERROR;
    },

    getEmployeeHistoriesRequest: (state, action) => {
      if (action) state.employeeHistoriesStatus = REQUEST_STATUS.REQUESTING;
    },
    getEmployeeHistoriesSuccess: (state, action) => {
      if (action) state.employeeHistoriesStatus = REQUEST_STATUS.SUCCESS;
      state.employeeHistoriesData = action.payload?.histories?.filter(
        (item) => item?.history_type === HISTORY_TYPE.EMPLOYMENT,
      );
      state.employeeEducationData = action.payload?.histories?.filter(
        (item) => item?.history_type === HISTORY_TYPE.EDUCATION,
      );
      state.employeeOtherData = action.payload?.histories?.filter(
        (item) => item?.history_type === HISTORY_TYPE.OTHER,
      );
    },
    getEmployeeHistoriesFail: (state, action) => {
      if (action) state.employeeHistoriesStatus = REQUEST_STATUS.ERROR;
    },

    updateCandidateRequest: (state) => {
      state.updateCandidateStatus = REQUEST_STATUS.REQUESTING;
    },
    updateCandidateSuccess: (state, { payload }) => {
      state.updateCandidateStatus = REQUEST_STATUS.SUCCESS;
      state.interviewDetailData = payload;
    },
    updateCandidateFail: (state) => {
      state.updateCandidateStatus = REQUEST_STATUS.ERROR;
    },

    updateCandidateJobRequest: (state) => {
      state.updateCandidateStatus = REQUEST_STATUS.REQUESTING;
    },
    updateCandidateJobSuccess: (state) => {
      state.updateCandidateStatus = REQUEST_STATUS.SUCCESS;
    },
    updateCandidateJobFail: (state) => {
      state.updateCandidateStatus = REQUEST_STATUS.ERROR;
    },

    getCommunicationNoteRequest: (state) => {
      state.communicationNoteStatus = REQUEST_STATUS.REQUESTING;
    },
    getCommunicationNoteSuccess: (state, { payload }) => {
      state.communicationNoteStatus = REQUEST_STATUS.SUCCESS;
      state.communicationNoteData = payload?.content;
    },
    getCommunicationNoteFail: (state) => {
      state.communicationNoteStatus = REQUEST_STATUS.ERROR;
    },

    updateCommunicationNoteRequest: (state) => {
      state.communicationNoteStatus = REQUEST_STATUS.REQUESTING;
    },
    updateCommunicationNoteSuccess: (state, { payload }) => {
      state.communicationNoteStatus = REQUEST_STATUS.SUCCESS;
      state.communicationNoteData = payload?.content;
    },
    updateCommunicationNoteFail: (state) => {
      state.communicationNoteStatus = REQUEST_STATUS.ERROR;
    },

    escalatedIssuesRequest: (state) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.REQUESTING;
    },
    escalatedIssuesSuccess: (state, { payload }) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.SUCCESS;
      state.interviewDetailData?.escalated_issues?.push(payload);
    },
    escalatedIssuesFail: (state) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.ERROR;
    },

    updateEscalatedIssuesRequest: (state) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.REQUESTING;
    },
    updateEscalatedIssuesSuccess: (state, { payload }) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.SUCCESS;
      if (payload?.status !== ESCALATED_ISSUES_STATUS.DELETED) {
        state.interviewDetailData = {
          ...state.interviewDetailData,
          escalated_issues: state.interviewDetailData?.escalated_issues?.filter(
            (item) => {
              if (item?.category === payload?.category) {
                Object.assign(item, payload);
              }
              return item;
            },
          ),
        };
      } else {
        state.interviewDetailData = {
          ...state.interviewDetailData,
          escalated_issues: state.interviewDetailData?.escalated_issues?.filter(
            (item) => {
              return item?.category !== payload?.category;
            },
          ),
        };
      }
    },
    updateEscalatedIssuesFail: (state) => {
      state.escalatedIssuesStatus = REQUEST_STATUS.ERROR;
    },

    getMissingInformationRequest: (state) => {
      state.getMissingInformationStatus = REQUEST_STATUS.REQUESTING;
    },
    getMissingInformationSuccess: (state, { payload }) => {
      state.getMissingInformationStatus = REQUEST_STATUS.SUCCESS;
      state.missingInformationData = payload?.logs;
    },
    getMissingInformationFail: (state) => {
      state.getMissingInformationStatus = REQUEST_STATUS.ERROR;
    },

    postMissingInformationRequest: (state) => {
      state.postMissingInformationStatus = REQUEST_STATUS.REQUESTING;
    },
    postMissingInformationSuccess: (state, { payload }) => {
      state.postMissingInformationStatus = REQUEST_STATUS.SUCCESS;
      state.missingInformationData = payload?.logs;
    },
    postMissingInformationFail: (state) => {
      state.postMissingInformationStatus = REQUEST_STATUS.ERROR;
    },

    getFilesDocumentWithJobRequest: (state) => {
      state.getFilesDocumentStatus = REQUEST_STATUS.REQUESTING;
    },
    getFilesDocumentWithJobSuccess: (state, { payload }) => {
      if (payload.files.length) {
        let documentsContracts = {};
        const document = payload.files?.splice(-1, 1);
        const job = { job: document[0]?.job };
        let filesDocumentsObject = Object.assign(job, {});
        state.filesDocumentWithJobs.push(document[0]);
        filesDocumentsObject = Object.assign(
          {
            files: state.filesDocumentWithJobs,
          },
          filesDocumentsObject,
        );
        documentsContracts = filesDocumentsObject;
        state.documentsContracts = documentsContracts;
      }
      state.getFilesDocumentStatus = REQUEST_STATUS.SUCCESS;
    },
    getFilesDocumentWithJobFail: (state) => {
      state.getFilesDocumentStatus = REQUEST_STATUS.ERROR;
    },

    getFilesDocumentRequest: (
      state,
      _action: PayloadAction<{ candidate_id: number; type: FILE_TYPE }>,
    ) => {
      state.getFilesDocumentStatus = REQUEST_STATUS.REQUESTING;
    },

    getFilesDocumentSuccess: (state, { payload }) => {
      if (payload?.files?.length) {
        payload.files.forEach((document) => {
          state.filesDocuments.push(document);
        });
      }
      state.getFilesDocumentStatus = REQUEST_STATUS.SUCCESS;
    },
    getFilesDocumentFail: (state) => {
      state.getFilesDocumentStatus = REQUEST_STATUS.ERROR;
    },

    updateDocumentStatusRequest: (state) => {
      state.getFilesDocumentStatus = REQUEST_STATUS.REQUESTING;
    },

    updateDocumentStatusSuccess: (state, { payload }) => {
      state.documentsContracts = {
        ...state.documentsContracts,
        files: payload?.files,
      };
      state.getFilesDocumentStatus = REQUEST_STATUS.SUCCESS;
    },
    updateDocumentStatusFail: (state) => {
      state.getFilesDocumentStatus = REQUEST_STATUS.ERROR;
    },

    deleteFilesDocumentRequest: (state) => {
      state.deleteFilesDocumentStatus = REQUEST_STATUS.REQUESTING;
    },
    deleteFilesDocumentSuccess: (state, { payload }) => {
      state.deleteFilesDocumentStatus = REQUEST_STATUS.SUCCESS;
      state.documentsContracts = {
        ...state.documentsContracts,
        files: state.documentsContracts?.files?.filter((file) => {
          return file.id !== payload?.document_id;
        }),
      };
    },
    deleteFilesDocumentFail: (state) => {
      state.deleteFilesDocumentStatus = REQUEST_STATUS.ERROR;
    },

    getQuestionGroupRequest: (state) => {
      state.getQuestionGroupStatus = REQUEST_STATUS.REQUESTING;
    },

    getQuestionGroupSuccess: (state, { payload }) => {
      state.questionGroupData[payload.type] = payload.questions.map(
        (question) => {
          return {
            id: question?.id,
            type: payload?.type,
            questionType: question?.type,
            description: question?.description,
            options: question?.options,
            title: question?.text,
            answer: question?.answer && question.answer.answer,
          };
        },
      );
      state.getQuestionGroupStatus = REQUEST_STATUS.SUCCESS;
    },
    getQuestionGroupFail: (state) => {
      state.getQuestionGroupStatus = REQUEST_STATUS.ERROR;
    },

    postQuestionGroupAnswersRequest: (state) => {
      state.postQuestionGroupStatus = REQUEST_STATUS.REQUESTING;
    },

    postQuestionGroupAnswersSuccess: (state) => {
      state.postQuestionGroupStatus = REQUEST_STATUS.SUCCESS;
    },
    postQuestionGroupAnswersFail: (state) => {
      state.postQuestionGroupStatus = REQUEST_STATUS.ERROR;
    },

    postSkillsRequests: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.REQUESTING;
    },

    postSkillsSuccess: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.SUCCESS;
    },
    postSkillsFail: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.ERROR;
    },

    getSkillsRequests: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.REQUESTING;
    },
    getSkillsSuccess: (state, { payload }) => {
      state.getSkillsStatus = REQUEST_STATUS.SUCCESS;
      state.skills = payload?.skills;
    },
    getSkillsFail: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.ERROR;
    },

    getCandidateSkillsRequests: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.REQUESTING;
    },
    getCandidateSkillsSuccess: (state, { payload }) => {
      state.getSkillsStatus = REQUEST_STATUS.SUCCESS;
      state.candidateSkills = payload?.skills;
    },
    getCandidateSkillsFail: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.ERROR;
    },

    removeCandidateSkillsRequests: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.REQUESTING;
    },
    removeCandidateSkillsSuccess: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.SUCCESS;
    },
    removeCandidateSkillsFail: (state) => {
      state.getSkillsStatus = REQUEST_STATUS.ERROR;
    },

    postFilesDocumentRequest: (state) => {
      state.postFilesDocumentStatus = REQUEST_STATUS.REQUESTING;
    },

    postFilesDocumentSuccess: (state, { payload }) => {
      if (payload) {
        let documentsContracts = {};
        const job = { job: payload?.job };
        let filesDocumentsObject = Object.assign(job, {});
        const documentIndex = state.filesDocumentWithJobs?.findIndex(
          (item) => item.type === payload?.type,
        );

        if (documentIndex === -1) {
          state.filesDocumentWithJobs.push(payload);
        } else {
          state.filesDocumentWithJobs[documentIndex] = payload;
        }

        filesDocumentsObject = Object.assign(
          {
            files: state.filesDocumentWithJobs,
          },
          filesDocumentsObject,
        );
        documentsContracts = filesDocumentsObject;
        state.documentsContracts = documentsContracts;
      }
      state.postFilesDocumentStatus = REQUEST_STATUS.SUCCESS;
    },
    postFilesDocumentFail: (state) => {
      state.postFilesDocumentStatus = REQUEST_STATUS.ERROR;
    },

    clearDocumentsState: (state) => {
      state.filesDocuments = [];
      state.documentsContracts = [];
      state.filesDocumentWithJobs = [];
    },

    clearInitialState: (state) => {
      state.updateCandidateStatus = REQUEST_STATUS.IDLE;
      state.interviewDetailData = [];
      state.employeeHistoriesData = [];
      state.employeeEducationData = [];
      state.employeeOtherData = [];
      state.filesDocuments = [];
      state.documentsContracts = [];
      state.filesDocumentWithJobs = [];
    },
  },
});

export const {
  getQuestionGroupRequest,
  getQuestionGroupSuccess,
  getQuestionGroupFail,
  getFilesDocumentWithJobRequest,
  getFilesDocumentWithJobSuccess,
  getFilesDocumentWithJobFail,
  getFilesDocumentRequest,
  getFilesDocumentSuccess,
  getFilesDocumentFail,
  postFilesDocumentRequest,
  postFilesDocumentSuccess,
  postFilesDocumentFail,
  updateDocumentStatusRequest,
  updateDocumentStatusSuccess,
  updateDocumentStatusFail,
  deleteFilesDocumentRequest,
  deleteFilesDocumentSuccess,
  deleteFilesDocumentFail,
  getMissingInformationRequest,
  getMissingInformationSuccess,
  getMissingInformationFail,
  getEmployeeHistoriesRequest,
  getEmployeeHistoriesSuccess,
  getEmployeeHistoriesFail,
  getInterviewDetailRequest,
  getInterviewDetailSuccess,
  getInterviewDetailFail,
  getCommunicationNoteRequest,
  getCommunicationNoteSuccess,
  getCommunicationNoteFail,
  postMissingInformationRequest,
  postMissingInformationSuccess,
  postMissingInformationFail,
  postQuestionGroupAnswersRequest,
  postQuestionGroupAnswersSuccess,
  postQuestionGroupAnswersFail,
  updateCommunicationNoteRequest,
  updateCommunicationNoteSuccess,
  updateCommunicationNoteFail,
  escalatedIssuesRequest,
  escalatedIssuesSuccess,
  escalatedIssuesFail,
  updateEscalatedIssuesRequest,
  updateEscalatedIssuesSuccess,
  updateEscalatedIssuesFail,
  updateCandidateRequest,
  updateCandidateSuccess,
  updateCandidateFail,
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
  clearInitialState,
  clearDocumentsState,
  updateCandidateJobRequest,
  updateCandidateJobSuccess,
  updateCandidateJobFail,
} = slice.actions;

export const selectInterviewDetailStore = (state: any) =>
  state.interviewDetailSlice;

export default slice.reducer;

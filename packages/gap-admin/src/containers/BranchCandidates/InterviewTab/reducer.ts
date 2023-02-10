import { createSlice } from '@reduxjs/toolkit';
import {
  HISTORY_TYPE,
  QUESTION_GROUP_TYPE,
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
  name: 'branchInterviewSlice',
  initialState: {
    branchInterviewDetailData: [],
    branchInterviewTableData: [],
    employeeHistoriesData: [],
    employeeEducationData: [],
    employeeOtherData: [],
    communicationNoteData: '',
    filesDocuments: [],
    filesDocumentWithJobs: [],
    documentsContracts: {},
    questionGroupData: initialQuestionGroupData,
    interViewStatus: REQUEST_STATUS.IDLE,
    getFilesDocumentStatus: REQUEST_STATUS.IDLE,
    getQuestionGroupStatus: REQUEST_STATUS.IDLE,
    interViewDetailStatus: REQUEST_STATUS.IDLE,
    communicationNoteStatus: REQUEST_STATUS.IDLE,
    employeeHistoriesStatus: REQUEST_STATUS.IDLE,
  },
  reducers: {
    getBranchInterviewRequest: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.REQUESTING;
    },
    getBranchInterviewSuccess: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.SUCCESS;
      state.branchInterviewTableData = action.payload;
    },
    getBranchInterviewFail: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.ERROR;
    },

    getBranchInterviewDetailsRequest: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.REQUESTING;
    },
    getBranchInterviewDetailsSuccess: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.SUCCESS;
      state.branchInterviewDetailData = action.payload;
    },
    getBranchInterviewDetailsFail: (state, action) => {
      if (action) state.interViewStatus = REQUEST_STATUS.ERROR;
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

    getFilesDocumentRequest: (state) => {
      state.getFilesDocumentStatus = REQUEST_STATUS.REQUESTING;
    },

    getFilesDocumentSuccess: (state, { payload }) => {
      if (payload?.files?.length) {
        state.filesDocuments.push(payload?.files[0]);
        state.filesDocuments.forEach((item) => {
          const blobObject = [item.urlDownload];
          item.urlDownload = window.URL.createObjectURL(
            new Blob(blobObject, {
              type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }),
          );
        });
      }
      state.getFilesDocumentStatus = REQUEST_STATUS.SUCCESS;
    },
    getFilesDocumentFail: (state) => {
      state.getFilesDocumentStatus = REQUEST_STATUS.ERROR;
    },

    clearDocumentsState: (state) => {
      state.filesDocuments = [];
      state.documentsContracts = [];
      state.filesDocumentWithJobs = [];
    },
  },
});

export const {
  getBranchInterviewRequest,
  getBranchInterviewSuccess,
  getBranchInterviewFail,
  getQuestionGroupRequest,
  getQuestionGroupSuccess,
  getQuestionGroupFail,
  getBranchInterviewDetailsRequest,
  getBranchInterviewDetailsSuccess,
  getBranchInterviewDetailsFail,
  getCommunicationNoteRequest,
  getCommunicationNoteSuccess,
  getCommunicationNoteFail,
  getEmployeeHistoriesRequest,
  getEmployeeHistoriesSuccess,
  getEmployeeHistoriesFail,
  getFilesDocumentRequest,
  getFilesDocumentSuccess,
  getFilesDocumentFail,
  clearDocumentsState,
} = slice.actions;

export const selectBranchInterviewStore = (state: any) =>
  state.branchInterviewSlice;

export default slice.reducer;

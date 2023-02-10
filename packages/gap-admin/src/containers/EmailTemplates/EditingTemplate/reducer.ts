import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../../constants/common';

const sliceName = 'emailTemplateSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    emailTemplatesStatus: REQUEST_STATUS.IDLE,
    emailTemplate: {},
  },
  reducers: {
    emailTemplateRequest: (state, _action) => {
      state.emailTemplatesStatus = REQUEST_STATUS.REQUESTING;
    },
    emailTemplateSuccess: (state, { payload }) => {
      state.emailTemplatesStatus = REQUEST_STATUS.SUCCESS;
      state.emailTemplate = payload;
    },
    emailTemplateFail: (state) => {
      state.emailTemplatesStatus = REQUEST_STATUS.ERROR;
    },
    updateEmailTemplateRequest: (state, _action) => {
      state.emailTemplatesStatus = REQUEST_STATUS.REQUESTING;
    },
    updateEmailTemplateSuccess: (state, { payload }) => {
      state.emailTemplatesStatus = REQUEST_STATUS.SUCCESS;
      state.emailTemplate = payload;
    },
    updateEmailTemplateFail: (state) => {
      state.emailTemplatesStatus = REQUEST_STATUS.ERROR;
    },
    clearInitialState: (state) => {
      state.emailTemplatesStatus = REQUEST_STATUS.IDLE;
      state.emailTemplate = {};
    },
  },
});

export const {
  emailTemplateRequest,
  emailTemplateSuccess,
  emailTemplateFail,
  updateEmailTemplateRequest,
  updateEmailTemplateSuccess,
  updateEmailTemplateFail,
  clearInitialState,
} = slice.actions;

export const selectEmailTemplateSlice = (state: any) => state[sliceName];

export default slice.reducer;

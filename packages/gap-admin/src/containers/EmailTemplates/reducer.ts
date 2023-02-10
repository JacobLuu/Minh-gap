import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../../constants/common';

const sliceName = 'emailTemplatesSlice';

export const slice = createSlice({
  name: sliceName,
  initialState: {
    emailTemplatesStatus: REQUEST_STATUS.IDLE,
    emailTemplates: [],
  },
  reducers: {
    emailTemplatesRequest: (state, _action) => {
      state.emailTemplatesStatus = REQUEST_STATUS.REQUESTING;
    },
    emailTemplatesSuccess: (state, { payload }) => {
      state.emailTemplatesStatus = REQUEST_STATUS.SUCCESS;
      state.emailTemplates = payload;
    },
    emailTemplatesFail: (state) => {
      state.emailTemplatesStatus = REQUEST_STATUS.ERROR;
    },
  },
});

export const {
  emailTemplatesRequest,
  emailTemplatesSuccess,
  emailTemplatesFail,
} = slice.actions;

export const selectEmailTemplatesSlice = (state: any) => state[sliceName];

export default slice.reducer;

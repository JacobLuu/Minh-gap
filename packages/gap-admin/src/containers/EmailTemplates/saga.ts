import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../constants/common';
import EmailTemplateService from '../../services/compliance/EmailTemplateService';
import { EmailTemplatesRequests } from '../../types/Requests';

import {
  emailTemplatesRequest,
  emailTemplatesSuccess,
  emailTemplatesFail,
} from './reducer';

function* EmailTemplatesFlow<
  T extends EmailTemplatesRequests = EmailTemplatesRequests,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<EmailTemplatesRequests> =
      yield EmailTemplateService.getEmailTemplates(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = emailTemplatesSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: emailTemplatesFail.type });
    }
  } catch (error) {
    yield put({
      type: emailTemplatesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* EmailTemplatesWatcher() {
  yield takeEvery(emailTemplatesRequest, EmailTemplatesFlow);
}

export default EmailTemplatesWatcher;

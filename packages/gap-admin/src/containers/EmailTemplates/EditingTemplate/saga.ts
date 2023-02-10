import axios, { AxiosResponse } from 'axios';
import { debounce, put, takeEvery } from 'redux-saga/effects';

import { STATUS_CODE } from '../../../constants/common';
import EmailTemplateService from '../../../services/compliance/EmailTemplateService';
import { setSuccessMessages } from '../../Global/reducer';
import {
  EmailTemplateIdRequest,
  EmailTemplateRequest,
} from '../../../types/Requests';

import {
  emailTemplateRequest,
  emailTemplateSuccess,
  emailTemplateFail,
  updateEmailTemplateRequest,
  updateEmailTemplateSuccess,
  updateEmailTemplateFail,
} from './reducer';

function* EmailTemplateFlow<
  T extends EmailTemplateIdRequest = EmailTemplateIdRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<EmailTemplateIdRequest> =
      yield EmailTemplateService.getEmailTemplateId(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = emailTemplateSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: emailTemplateFail.type });
    }
  } catch (error) {
    yield put({
      type: emailTemplateFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* UpdateEmailTemplateFlow<
  T extends EmailTemplateRequest = EmailTemplateRequest,
>({ payload }: { payload: T }) {
  try {
    const response: AxiosResponse<EmailTemplateRequest> =
      yield EmailTemplateService.updateEmailTemplate(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateEmailTemplateSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Update success.'],
      });
    } else {
      yield put({ type: updateEmailTemplateFail.type });
    }
  } catch (error) {
    yield put({
      type: updateEmailTemplateFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* EmailTemplateWatcher() {
  yield takeEvery(emailTemplateRequest, EmailTemplateFlow);
  yield debounce(500, updateEmailTemplateRequest, UpdateEmailTemplateFlow);
}

export default EmailTemplateWatcher;

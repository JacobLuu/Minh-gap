import { AxiosResponse } from 'axios';
import ComplianceBaseService from './ComplianceBaseService';

import {
  EmailTemplatesRequest,
  EmailTemplateIdRequest,
  EmailTemplateRequest,
} from '../../types/Requests';
import { EmailTemplatesResponse } from '../../types/Responses';

import { END_POINT } from '../../request/constants';

const getEmailTemplates = (
  requestData: EmailTemplatesRequest,
): Promise<AxiosResponse<EmailTemplatesResponse>> => {
  return ComplianceBaseService.get(`${END_POINT.EMAIL_TEMPLATES}`, {
    params: {
      limit: requestData.limit,
      offset: requestData.offset,
      filter: requestData.filter,
    },
  });
};

const getEmailTemplateId = (
  requestData: EmailTemplateIdRequest,
): Promise<AxiosResponse<EmailTemplatesResponse>> => {
  return ComplianceBaseService.get(
    `${END_POINT.EMAIL_TEMPLATES}/${requestData.id}`,
  );
};

const updateEmailTemplate = (
  requestData: EmailTemplateRequest,
): Promise<AxiosResponse<{ content: string }>> => {
  return ComplianceBaseService.put(
    `${END_POINT.EMAIL_TEMPLATES}/${requestData.id}`,
    requestData,
  );
};

export default {
  getEmailTemplates,
  getEmailTemplateId,
  updateEmailTemplate,
};

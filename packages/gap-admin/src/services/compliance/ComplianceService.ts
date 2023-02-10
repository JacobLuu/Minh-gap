import { AxiosResponse } from 'axios';
import ComplianceBaseService from './ComplianceBaseService';

import {
  DocumentRequest,
  CandidatesIdRequests,
  CandidatesRequests,
  EmploymentHistoriesRequests,
  QuestionGroupRequests,
} from '../../types/Requests';
import {
  CandidatesId,
  CandidatesResponse,
  FilesDocumentResponse,
  EmploymentHistoriesResponse,
  QuestionGroupResponse,
} from '../../types/Responses';

import { END_POINT } from '../../request/constants';

const getComplianceCandidates = (
  requestData: CandidatesRequests,
): Promise<AxiosResponse<CandidatesResponse>> => {
  return ComplianceBaseService.get(`${END_POINT.CANDIDATES}`, {
    params: {
      limit: requestData.limit,
      offset: requestData.offset,
      filter: requestData.filter,
      job_status: requestData.jobStatus,
      contact_dates: requestData.contactDates,
      contact_times: requestData.contactTimes,
    },
  });
};

const getComplianceCandidatesId = (
  requestData: CandidatesIdRequests,
): Promise<AxiosResponse<CandidatesId>> => {
  return ComplianceBaseService.get(
    `${END_POINT.COMPLIANCE_CANDIDATES}/${requestData.id}`,
  );
};

const getCommunicationNote = (requestData: {
  candidate_id: number;
}): Promise<AxiosResponse<{ content: string }>> => {
  return ComplianceBaseService.get(
    `${END_POINT.COMPLIANCE_CANDIDATES}/${requestData.candidate_id}${END_POINT.COMMUNICATION_NOTE}`,
  );
};

const getEmploymentHistories = (
  requestData: EmploymentHistoriesRequests,
): Promise<AxiosResponse<EmploymentHistoriesResponse>> => {
  return ComplianceBaseService.get(
    `${END_POINT.COMPLIANCE_CANDIDATES}/${requestData.id}${END_POINT.EMPLOYEE_HISTORIES}`,
  );
};

const getQuestionGroup = (
  requestData: QuestionGroupRequests,
): Promise<AxiosResponse<QuestionGroupResponse>> => {
  return ComplianceBaseService.get(
    `${END_POINT.COMPLIANCE_CANDIDATES}/${requestData.candidate_id}${END_POINT.QUESTION_GROUPS}/${requestData.type}`,
    {
      params: {
        job_id: requestData.job_id,
      },
    },
  );
};

const getFilesDocument = (
  requestData: DocumentRequest,
): Promise<AxiosResponse<FilesDocumentResponse>> => {
  return ComplianceBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/files/${requestData.type}`,
  );
};

export default {
  getFilesDocument,
  getQuestionGroup,
  getCommunicationNote,
  getEmploymentHistories,
  getComplianceCandidates,
  getComplianceCandidatesId,
};

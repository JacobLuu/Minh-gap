import { AxiosResponse } from 'axios';
import { FILE_STATUS } from 'gap-common/src/constants/enums';
import { AddAnswersRequest } from 'gap-common/src/types/Requests';

import { END_POINT } from '../../request/constants';
import { Job } from '../../types/models';
import {
  CandidateJobRequest,
  CandidateMissingInformationRequests,
  CandidatesIdRequests,
  CandidatesRequests,
  CommunicationNoteRequest,
  ContactLogRequest,
  DocumentRequest,
  EscalatedIssueRequest,
  InterviewBookingRequest,
  QuestionGroupRequests,
  SkillsRequest,
  UpdateCandidateRequest,
  UpdateEscalatedIssueRequest,
} from '../../types/Requests';
import {
  CandidateMissingInformationResponse,
  CandidatesId,
  CandidatesResponse,
  ContactLogResponse,
  EscalatedIssueResponse,
  FilesDocumentResponse,
  InterviewBookingResponse,
  QuestionGroupResponse,
  SkillsResponse,
  UpdateCandidateResponse,
} from '../../types/Responses';
import ConsultantBaseService from './ConsultantBaseService';

const getCandidates = (
  requestData: CandidatesRequests,
): Promise<AxiosResponse<CandidatesResponse>> => {
  return ConsultantBaseService.get(`${END_POINT.CANDIDATES}`, {
    params: {
      limit: requestData.limit,
      offset: requestData.offset,
      filter: requestData.filter,
      direction: requestData.direction,
      job_status: requestData.jobStatus,
      contact_dates: requestData.contactDates,
      contact_times: requestData.contactTimes,
      interview_date: requestData.interviewDate,
      interview_methods: requestData.interviewMethods,
    },
  });
};

const getCandidatesId = (
  requestData: CandidatesIdRequests,
): Promise<AxiosResponse<CandidatesId>> => {
  return ConsultantBaseService.get(`${END_POINT.CANDIDATES}/${requestData.id}`);
};

const postInterviewBooking = (
  requestData: InterviewBookingRequest,
): Promise<AxiosResponse<InterviewBookingResponse>> => {
  return ConsultantBaseService.post(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}${END_POINT.APPOINTMENTS}`,
    requestData,
  );
};

const updateCandidate = (
  requestData: UpdateCandidateRequest,
): Promise<AxiosResponse<UpdateCandidateResponse>> => {
  return ConsultantBaseService.put(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}`,
    requestData,
  );
};

const getContactLogs = (
  requestData: ContactLogRequest,
): Promise<AxiosResponse<ContactLogResponse>> => {
  return ConsultantBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/contact_logs`,
  );
};

const postContactLogs = (
  requestData: ContactLogRequest,
): Promise<AxiosResponse<ContactLogResponse>> => {
  return ConsultantBaseService.post(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/contact_logs`,
    {
      content: requestData?.content,
    },
  );
};

const getCommunicationNote = (requestData: {
  candidate_id: number;
}): Promise<AxiosResponse<{ content: string }>> => {
  return ConsultantBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}${END_POINT.COMMUNICATION_NOTE}`,
  );
};

const getFilesDocumentWithJob = (
  requestData: DocumentRequest,
): Promise<AxiosResponse<FilesDocumentResponse>> => {
  return ConsultantBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/jobs/${requestData.job_id}/files/${requestData.type}`,
  );
};

const getQuestionGroup = (
  requestData: QuestionGroupRequests,
): Promise<AxiosResponse<QuestionGroupResponse>> => {
  return ConsultantBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}${END_POINT.QUESTION_GROUPS}/${requestData.type}`,
    {
      params: {
        job_id: requestData?.job_id,
      },
    },
  );
};

const getFilesDocument = (
  requestData: DocumentRequest,
): Promise<AxiosResponse<FilesDocumentResponse>> => {
  return ConsultantBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/files/${requestData.type}`,
  );
};

const deleteFilesDocument = (
  requestData: DocumentRequest,
): Promise<AxiosResponse<FilesDocumentResponse>> => {
  return ConsultantBaseService.delete(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/jobs/${requestData.job_id}/files/${requestData.document_id}`,
  );
};

const updateFileStatusByFileId = (
  candidateId: number,
  fileId: number,
  status: FILE_STATUS,
): Promise<AxiosResponse<FilesDocumentResponse>> => {
  return ConsultantBaseService.put(
    `${END_POINT.CANDIDATES}/${candidateId}/files/${fileId}/status`,
    {
      status,
    },
  );
};

const updateDocumentStatus = (
  requestData: DocumentRequest,
): Promise<AxiosResponse<FilesDocumentResponse>> => {
  return ConsultantBaseService.put(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/jobs/${requestData.job_id}/files/all_job_associated_documents/status`,
    {
      status: requestData.status,
    },
  );
};

const postFilesDocument = (
  requestData: DocumentRequest,
): Promise<AxiosResponse<FilesDocumentResponse>> => {
  const data = new FormData();
  data.append('file', requestData.file);

  return ConsultantBaseService.post(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/jobs/${requestData.job_id}/files/${requestData.type}`,
    data,
  );
};

const postQuestionGroupAnswers = ({
  type,
  candidate_id,
  questions,
}: AddAnswersRequest): Promise<AxiosResponse<QuestionGroupResponse>> => {
  return ConsultantBaseService.post(
    `${END_POINT.CANDIDATES}/${candidate_id}/question_groups/${type}/answers`,
    questions,
  );
};

const updateCommunicationNote = (
  requestData: CommunicationNoteRequest,
): Promise<AxiosResponse<{ content: string }>> => {
  return ConsultantBaseService.put(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}${END_POINT.COMMUNICATION_NOTE}`,
    requestData,
  );
};

const updateCandidateJob = (
  requestData: CandidateJobRequest,
): Promise<AxiosResponse<Job>> => {
  return ConsultantBaseService.put(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/jobs/${requestData.job_id}`,
    { status: requestData.status },
  );
};

const escalatedIssues = (
  requestData: EscalatedIssueRequest,
): Promise<AxiosResponse<EscalatedIssueResponse>> => {
  return ConsultantBaseService.post(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}/escalated_issues`,
    requestData,
  );
};

const updateEscalatedIssue = (
  requestData: UpdateEscalatedIssueRequest,
): Promise<AxiosResponse<EscalatedIssueResponse>> => {
  return ConsultantBaseService.put(
    `/escalated_issues/${requestData.issue_id}`,
    requestData,
  );
};

const getCandidateMissingInformationRequests = (
  requestData: CandidateMissingInformationRequests,
): Promise<AxiosResponse<CandidateMissingInformationResponse>> => {
  return ConsultantBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.candidateId}${END_POINT.MISSING_INFORMATION_REQUESTS}`,
  );
};

const postCandidateMissingInformationRequests = (
  requestData: CandidateMissingInformationRequests,
): Promise<AxiosResponse<CandidateMissingInformationResponse>> => {
  return ConsultantBaseService.post(
    `${END_POINT.CANDIDATES}/${requestData.candidateId}${END_POINT.MISSING_INFORMATION_REQUESTS}`,
    {
      content: requestData.contentLog,
    },
  );
};

const getSkillsRequests = (): Promise<AxiosResponse<SkillsResponse>> => {
  return ConsultantBaseService.get(`${END_POINT.SKILLS}`);
};

const getCandidateSkills = (
  requestData: SkillsRequest,
): Promise<AxiosResponse<SkillsResponse>> => {
  return ConsultantBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}${END_POINT.SKILLS}`,
  );
};

const postCandidateSkills = (
  requestData: SkillsRequest,
): Promise<AxiosResponse<SkillsResponse>> => {
  return ConsultantBaseService.post(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}${END_POINT.SKILLS}`,
    {
      skill_id: requestData.skill_id,
    },
  );
};

const removeCandidateSkills = (
  requestData: SkillsRequest,
): Promise<AxiosResponse<SkillsResponse>> => {
  return ConsultantBaseService.delete(
    `${END_POINT.CANDIDATES}/${requestData.candidate_id}${END_POINT.SKILLS}/${requestData.skill_id}`,
  );
};

export default {
  getCandidates,
  getContactLogs,
  getFilesDocument,
  getQuestionGroup,
  getFilesDocumentWithJob,
  getCandidatesId,
  getCommunicationNote,
  getCandidateSkills,
  getCandidateMissingInformationRequests,
  deleteFilesDocument,
  postFilesDocument,
  postInterviewBooking,
  escalatedIssues,
  updateCandidate,
  updateFileStatusByFileId,
  updateDocumentStatus,
  updateCommunicationNote,
  updateEscalatedIssue,
  postContactLogs,
  postCandidateMissingInformationRequests,
  postQuestionGroupAnswers,
  postCandidateSkills,
  getSkillsRequests,
  removeCandidateSkills,
  updateCandidateJob,
};

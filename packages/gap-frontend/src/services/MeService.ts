import { AxiosResponse } from 'axios';

import { END_POINT } from '../constants/request';
import {
  AddMeJobRequest,
  UpdateMeAddressRequest,
  UpdateEmergencyContactRequest,
  UpdateFinancialInformationRequest,
  UpdateMePasswordRequest,
  UpdateMeRequest,
} from '../types/Requests';
import {
  AddressResponse,
  EmergencyContactResponse,
  FileResponse,
  FilesResponse,
  FinancialInformationResponse,
  SkillsResponse,
  StatusResponse,
  UserResponse,
} from '../types/Responses';
import BaseService from './BaseService';
import type { FILE_TYPE } from '../constants/enums';

import type { Skill, EmploymentHistory } from '../types/models';
import type { EmploymentHistoryForm } from '../containers/RegistrationJourney/components/EmploymentHistoryModal';

const getMe = (): Promise<AxiosResponse<UserResponse>> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.ME}`);
};

const updateMe = (
  data: UpdateMeRequest,
): Promise<AxiosResponse<StatusResponse>> => {
  return BaseService.put(`${END_POINT.ACCOUNT_INFO.ME}`, data);
};

const getSkills = (): Promise<AxiosResponse<SkillsResponse>> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.SKILLS}`);
};

const addSkill = (skill_id: number): Promise<AxiosResponse<Skill>> => {
  return BaseService.post(`${END_POINT.ACCOUNT_INFO.SKILLS}`, {
    skill_id,
  });
};

const deleteSkill = (
  skill_id: number,
): Promise<AxiosResponse<StatusResponse>> => {
  return BaseService.delete(`${END_POINT.ACCOUNT_INFO.SKILLS}/${skill_id}`);
};

const getJobs = (): Promise<AxiosResponse<SkillsResponse>> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.JOBS}`);
};

const addJob = (data: AddMeJobRequest): Promise<AxiosResponse<Skill>> => {
  return BaseService.post(`${END_POINT.ACCOUNT_INFO.JOBS}`, data);
};

const getEmergencyContact = (): Promise<
  AxiosResponse<EmergencyContactResponse>
> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.EMERGENCY_CONTACT}`);
};

const updateEmergencyContact = (
  data: UpdateEmergencyContactRequest,
): Promise<AxiosResponse<EmergencyContactResponse>> => {
  return BaseService.put(`${END_POINT.ACCOUNT_INFO.EMERGENCY_CONTACT}`, data);
};

const addEmploymentHistory = (
  data: EmploymentHistoryForm,
): Promise<AxiosResponse<EmploymentHistory>> => {
  return BaseService.post(
    `${END_POINT.ACCOUNT_INFO.EMPLOYMENT_HISTORIES}`,
    data,
  );
};

const getEmploymentHistories = (): Promise<
  AxiosResponse<EmploymentHistory[]>
> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.EMPLOYMENT_HISTORIES}`);
};

const deleteEmploymentHistory = (
  employment_history_id: number,
): Promise<AxiosResponse<StatusResponse>> => {
  return BaseService.delete(
    `${END_POINT.ACCOUNT_INFO.EMPLOYMENT_HISTORIES}/${employment_history_id}`,
  );
};

const updateEmploymentHistory = (
  data: Omit<EmploymentHistory, 'id'>,
  employment_history_id: number,
): Promise<AxiosResponse<EmploymentHistory>> => {
  return BaseService.put(
    `${END_POINT.ACCOUNT_INFO.EMPLOYMENT_HISTORIES}/${employment_history_id}`,
    data,
  );
};

const getFinancialInformation = (): Promise<
  AxiosResponse<FinancialInformationResponse>
> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.FINANCIAL_INFORMATION}`);
};

const updateFinancialInformation = (
  data: UpdateFinancialInformationRequest,
): Promise<AxiosResponse<FinancialInformationResponse>> => {
  return BaseService.put(
    `${END_POINT.ACCOUNT_INFO.FINANCIAL_INFORMATION}`,
    data,
  );
};

const getAddress = (): Promise<AxiosResponse<AddressResponse>> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.ADDRESS}`);
};

const updateAddress = (
  data: UpdateMeAddressRequest,
): Promise<AxiosResponse<AddressResponse>> => {
  return BaseService.put(`${END_POINT.ACCOUNT_INFO.ADDRESS}`, data);
};

const updatePassword = (
  data: UpdateMePasswordRequest,
): Promise<AxiosResponse<StatusResponse>> => {
  return BaseService.put(`${END_POINT.ACCOUNT_INFO.PASSWORD}`, data);
};

const getFiles = (
  fileType: FILE_TYPE,
  jobId: number,
): Promise<AxiosResponse<FilesResponse>> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.FILES}/${fileType}`, {
    headers: {
      'Gap-Job-ID': jobId,
    },
  });
};

const uploadFile = (
  fileType: FILE_TYPE,
  data: FormData,
  jobId: number,
): Promise<AxiosResponse<FileResponse>> => {
  return BaseService.post(`${END_POINT.ACCOUNT_INFO.FILES}/${fileType}`, data, {
    headers: {
      'Gap-Job-ID': jobId,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const signFile = (
  fileId: number,
  data: FormData,
  jobId: number,
): Promise<AxiosResponse<FileResponse>> => {
  return BaseService.post(
    `${END_POINT.ACCOUNT_INFO.FILES}/${fileId}/sign`,
    data,
    {
      headers: {
        'Gap-Job-ID': jobId,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

const checkShareCode = (
  shareCode: string,
): Promise<AxiosResponse<StatusResponse>> => {
  return BaseService.get(`${END_POINT.ACCOUNT_INFO.SHARE_CODES}/${shareCode}`);
};

export default {
  getMe,
  updateMe,
  getSkills,
  addSkill,
  deleteSkill,
  getJobs,
  addJob,
  getEmergencyContact,
  updateEmergencyContact,
  addEmploymentHistory,
  getEmploymentHistories,
  deleteEmploymentHistory,
  updateEmploymentHistory,
  getFinancialInformation,
  updateFinancialInformation,
  getAddress,
  updateAddress,
  updatePassword,
  getFiles,
  uploadFile,
  signFile,
  checkShareCode,
};

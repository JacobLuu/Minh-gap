import { AxiosResponse } from 'axios';

import { CANDIDATE_JOB_PROGRESS_TYPE } from '../constants/enums';
import { END_POINT } from '../constants/request';
import BaseService from './BaseService';

import type { ProgressesResponse } from '../types/Responses';
import type { UpdateProgressRequest } from '../types/Requests';

const getProgresses = (
  jobId: number,
): Promise<AxiosResponse<ProgressesResponse>> => {
  return BaseService.get(END_POINT.PROGRESSES, {
    headers: {
      'Gap-Job-ID': jobId,
    },
  });
};

const updateProgress = (
  type: CANDIDATE_JOB_PROGRESS_TYPE,
  data: UpdateProgressRequest,
  jobId: number,
): Promise<AxiosResponse<ProgressesResponse>> => {
  return BaseService.put(`${END_POINT.PROGRESSES}/${type}`, data, {
    headers: {
      'Gap-Job-ID': jobId,
    },
  });
};

export default {
  getProgresses,
  updateProgress,
};

import { AxiosResponse } from 'axios';

import { END_POINT } from '../constants/request';
import BaseService from './BaseService';

import type { FileResponse, StatusResponse } from '../types/Responses';
import type { UpdateFileStatusRequest } from '../types/Requests';

const updateStatus = (
  file_id: number,
  data: UpdateFileStatusRequest,
): Promise<AxiosResponse<FileResponse>> => {
  return BaseService.put(`${END_POINT.FILES}/${file_id}/status`, data);
};

const deleteFile = (
  file_id: number,
  jobId: number,
): Promise<AxiosResponse<StatusResponse>> => {
  return BaseService.delete(`${END_POINT.FILES}/${file_id}`, {
    headers: {
      'Gap-Job-ID': jobId,
    },
  });
};

export default {
  updateStatus,
  deleteFile,
};

import { AxiosResponse } from 'axios';
import ComplianceBaseService from './ComplianceBaseService';

import { CandidatesIdRequests, CandidatesRequests } from '../../types/Requests';
import { CandidatesId, CandidatesResponse } from '../../types/Responses';

import { END_POINT } from '../../request/constants';

const getBranchCandidates = (
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

const getCandidatesId = (
  requestData: CandidatesIdRequests,
): Promise<AxiosResponse<CandidatesId>> => {
  return ComplianceBaseService.get(`${END_POINT.CANDIDATES}/${requestData.id}`);
};

export default {
  getBranchCandidates,
  getCandidatesId,
};

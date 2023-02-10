import { AxiosResponse } from 'axios';
import ComplianceBaseService from './ComplianceBaseService';

import { EscalatedIssuesRequest } from '../../types/Requests';
import { EscalatedIssueResponse } from '../../types/Responses';

import { END_POINT } from '../../request/constants';

const getEscalatedIssuesCompliance = (
  requestData: EscalatedIssuesRequest,
): Promise<AxiosResponse<EscalatedIssueResponse>> => {
  return ComplianceBaseService.get(`${END_POINT.ESCALATED_ISSUES}`, {
    params: {
      limit: requestData.limit,
      offset: requestData.offset,
      filter: requestData.filter,
      journey_type: requestData.journey_type,
    },
  });
};

export default {
  getEscalatedIssuesCompliance,
};

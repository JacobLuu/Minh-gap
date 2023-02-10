import { AxiosResponse } from 'axios';
import ConsultantBaseService from './ConsultantBaseService';

import { EscalatedIssuesRequest } from '../../types/Requests';
import { EscalatedIssueResponse } from '../../types/Responses';

import { END_POINT } from '../../request/constants';

const getEscalatedIssuesConsultants = (
  requestData: EscalatedIssuesRequest,
): Promise<AxiosResponse<EscalatedIssueResponse>> => {
  return ConsultantBaseService.get(`${END_POINT.ESCALATED_ISSUES}`, {
    params: {
      limit: requestData.limit,
      offset: requestData.offset,
      filter: requestData.filter,
      journey_type: requestData.journey_type,
    },
  });
};

export default {
  getEscalatedIssuesConsultants,
};

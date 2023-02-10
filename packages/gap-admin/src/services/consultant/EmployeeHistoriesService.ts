import { AxiosResponse } from 'axios';
import ConsultantBaseService from './ConsultantBaseService';

import { EmploymentHistoriesRequests } from '../../types/Requests';
import { EmploymentHistoriesResponse } from '../../types/Responses';

import { END_POINT } from '../../request/constants';

const getEmploymentHistories = (
  requestData: EmploymentHistoriesRequests,
): Promise<AxiosResponse<EmploymentHistoriesResponse>> => {
  return ConsultantBaseService.get(
    `${END_POINT.CANDIDATES}/${requestData.id}${END_POINT.EMPLOYEE_HISTORIES}`,
  );
};

export default {
  getEmploymentHistories,
};

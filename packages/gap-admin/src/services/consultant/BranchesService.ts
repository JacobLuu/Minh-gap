import { AxiosResponse } from 'axios';
import ConsultantBaseService from './ConsultantBaseService';
import { Branch } from '../../types/models';
import { END_POINT } from '../../request/constants';

const getBranches = (): Promise<AxiosResponse<Branch>> => {
  return ConsultantBaseService.get(`${END_POINT.BRANCHES}`);
};

export default {
  getBranches,
};

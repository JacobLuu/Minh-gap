import { AxiosResponse } from 'axios';

import { END_POINT } from '../constants/request';
import BaseService from './BaseService';

import type { EthnicitiesResponse } from '../types/Responses';

const getEthnicities = (): Promise<AxiosResponse<EthnicitiesResponse>> => {
  return BaseService.get(END_POINT.ETHNICITIES);
};

export default {
  getEthnicities,
};

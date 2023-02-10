import { AxiosResponse } from 'axios';

import { END_POINT } from '../constants/request';
import BaseService from './BaseService';

import type { NationalitiesResponse } from '../types/Responses';

const getNationalities = (): Promise<AxiosResponse<NationalitiesResponse>> => {
  return BaseService.get(END_POINT.NATIONALITIES);
};

export default {
  getNationalities,
};

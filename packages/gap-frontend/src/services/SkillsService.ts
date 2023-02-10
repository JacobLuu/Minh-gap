import { AxiosResponse } from 'axios';

import { END_POINT } from '../constants/request';
import BaseService from './BaseService';

import type { SkillsResponse } from '../types/Responses/SkillsResponse';

const getSkills = (): Promise<AxiosResponse<SkillsResponse>> => {
  return BaseService.get(END_POINT.SKILLS);
};

export default {
  getSkills,
};

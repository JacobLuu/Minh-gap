import { AxiosResponse } from 'axios';

import { QUESTION_GROUP_TYPE } from '../constants/enums';
import { END_POINT } from '../constants/request';
import BaseService from './BaseService';

import type { AddAnswersRequest } from '../types/Requests';
import type { QuestionGroupResponse } from '../types/Responses';

const getQuestionGroup = (
  type: QUESTION_GROUP_TYPE,
): Promise<AxiosResponse<QuestionGroupResponse>> => {
  return BaseService.get(`${END_POINT.QUESTION_GROUPS}/${type}`, {});
};

const addAnswers = (
  type: QUESTION_GROUP_TYPE,
  data: AddAnswersRequest,
): Promise<AxiosResponse<QuestionGroupResponse>> => {
  return BaseService.post(`${END_POINT.QUESTION_GROUPS}/${type}/answers`, data);
};

export default {
  getQuestionGroup,
  addAnswers,
};

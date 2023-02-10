import { QUESTION_GROUP_TYPE } from 'gap-common/src/constants/enums';

export interface QuestionGroupRequests {
  job_id: number;
  candidate_id: number;
  type: QUESTION_GROUP_TYPE;
}

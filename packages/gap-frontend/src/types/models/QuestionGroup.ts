import type { BaseModel } from '.';
import { QUESTION_GROUP_TYPE } from '../../constants/enums';

interface QuestionGroup extends BaseModel {
  type: QUESTION_GROUP_TYPE;
}

export type { QuestionGroup };

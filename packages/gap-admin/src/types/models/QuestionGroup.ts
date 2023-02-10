import { QUESTION_GROUP_TYPE } from 'gap-common/src/constants/enums';
import type { BaseModel } from '.';

interface QuestionGroup extends BaseModel {
  type: QUESTION_GROUP_TYPE;
}

export type { QuestionGroup };

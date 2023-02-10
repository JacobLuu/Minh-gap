import { QUESTION_TYPE } from 'gap-common/src/constants/enums';
import type { BaseModel } from '.';

interface Question extends BaseModel {
  text: string;
  type: QUESTION_TYPE;
}

export type { Question };

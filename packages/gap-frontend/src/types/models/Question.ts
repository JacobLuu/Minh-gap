import type { BaseModel } from '.';
import { QUESTION_TYPE } from '../../constants/enums';

interface Question extends BaseModel {
  text: string;
  type: QUESTION_TYPE;
}

export type { Question };

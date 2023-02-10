import { ANSWER_TYPE } from 'gap-common/src/constants/enums';
import type { BaseModel } from '.';

interface Answer extends BaseModel {
  answer: ANSWER_TYPE;
}

export type { Answer };

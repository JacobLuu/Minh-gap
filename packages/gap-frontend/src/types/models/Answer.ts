import type { BaseModel } from '.';

import { ANSWER_TYPE } from '../../constants/enums';

interface Answer extends BaseModel {
  answer: ANSWER_TYPE[];
}

export type { Answer };

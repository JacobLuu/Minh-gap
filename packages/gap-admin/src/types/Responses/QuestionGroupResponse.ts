import type { QuestionResponse } from '.';
import type { QuestionGroup } from '../models';

interface QuestionGroupResponse extends QuestionGroup {
  questions: QuestionResponse[];
}

export type { QuestionGroupResponse };

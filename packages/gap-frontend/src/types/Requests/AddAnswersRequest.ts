import { ANSWER_TYPE } from '../../constants/enums';

interface AddAnswersRequest {
  answers: {
    question_id: number;
    answer: ANSWER_TYPE[] | string[];
  }[];
}

export type { AddAnswersRequest };

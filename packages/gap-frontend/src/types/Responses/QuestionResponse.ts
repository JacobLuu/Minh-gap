import type { AnswerResponse } from '.';
import type { Question } from '../models';

interface QuestionResponse extends Question {
  description: any;
  required: boolean;
  options: any[];
  answer: AnswerResponse;
}

export type { QuestionResponse };

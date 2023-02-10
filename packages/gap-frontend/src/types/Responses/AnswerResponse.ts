import type { Answer } from '../models';

interface AnswerResponse extends Answer {
  answered_at: number;
}

export type { AnswerResponse };

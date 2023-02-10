import { Job, User } from '../models';

export interface EscalatedIssueResponse {
  id: number;
  job: Job;
  user: User;
  type: string;
  content: string;
  posted_at: number;
}

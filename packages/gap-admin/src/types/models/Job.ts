import { User } from '.';

export interface Job {
  id: number;
  content: string;
  posted_at: number;
  type: string;
  user: User;
}

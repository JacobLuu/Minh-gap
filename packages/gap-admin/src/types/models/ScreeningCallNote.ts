import { User } from '.';

export interface ScreeningCallNote {
  id: string;
  type: string;
  content: string;
  posted_at: number;
  user: User;
}

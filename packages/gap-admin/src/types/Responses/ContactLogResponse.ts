import { Log } from '../models';

export interface ContactLogResponse {
  logs: Log[];
  count: number;
}

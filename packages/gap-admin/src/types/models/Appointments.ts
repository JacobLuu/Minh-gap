import { Job, Candidate, Branch } from '.';

export interface Appointments {
  id: number;
  type: string;
  candidate_id: Candidate;
  job: Job;
  branch_id: Branch;
  method: string;
  meeting_url: string;
  documents: string[];
  location_detail: string;
  date: string;
  time: string;
  note: string;
  status: string;
}

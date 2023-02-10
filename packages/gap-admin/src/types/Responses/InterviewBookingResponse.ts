import { Job, Candidate, Branch } from '../models';

export interface InterviewBookingResponse {
  id: string;
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

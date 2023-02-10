export interface InterviewBookingRequest {
  type: string;
  candidate_id: number;
  job_id: number;
  branch_id: number;
  method: string;
  meeting_url: string;
  documents: string[];
  location_detail: string;
  date: string;
  time: string;
  note: string;
  status: string;
}

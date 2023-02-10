import { CandidateJob, Appointments, Skills } from '../models';

export interface CandidatesResponse {
  candidates: Candidates[];
  count: number;
}

export interface ScreeningCallNote {
  content: string;
  id: number;
  posted_at: number;
  type: string;
  user: string;
}

export interface Candidates {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
  phone_number_country_code: string;
  phone_number: string;
  date_of_birth: string;
  jobs: CandidateJob[];
  contact_date: string[];
  contact_time: string[];
  status: string;
  most_progressed_job_status: string;
  title: string;
  right_to_work_status: string;
}
export interface CandidatesId {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number_country_code: string;
  phone_number: string;
  date_of_birth: string;
  jobs: CandidateJob[];
  contact_dates: [];
  contact_times: [];
  screening_call_note: ScreeningCallNote;
  journey_type: string;
  status: string;
  title: string;
  right_to_work_status: string;
  appointments: Appointments[];
  skills: Skills[];
}

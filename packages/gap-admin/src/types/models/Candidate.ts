import { CandidateJob } from '.';

export interface Candidate {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number_country_code: string;
  phone_number: string;
  date_of_birth: string;
  jobs: CandidateJob[];
  contact_date: string[];
  contact_time: string[];
  status: string;
  title: string;
  journey_type: string;
  is_pathway_unlocked: true;
}

export interface UpdateCandidateRequest {
  candidate_id: number;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  contact_dates: string[];
  contact_times: string[];
  journey_type: string;
}

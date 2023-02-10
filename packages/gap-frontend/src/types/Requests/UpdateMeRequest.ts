export interface UpdateMeRequest {
  title: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_number_country_code: string;
  date_of_birth: any;
  contact_date: string[];
  contact_time: string[];
  right_to_work_status: string;
  gender?: string;
  nationality_code?: string;
  ethnicity_code?: string;
}

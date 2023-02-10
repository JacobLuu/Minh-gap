export interface EmploymentHistoriesResponse {
  histories: EmploymentHistory[];
}

export interface EmploymentHistory {
  id: number;
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string;
  history_type: string;
  employment_status: string;
  job_description: string;
}

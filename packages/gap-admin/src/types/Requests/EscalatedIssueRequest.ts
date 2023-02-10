export interface EscalatedIssueRequest {
  candidate_id: number;
  job_id: number;
  journey_type: string;
  content: string;
  category: string;
  offset: number;
  limit: number;
  filter: string;
  status: string;
}

export interface UpdateEscalatedIssueRequest {
  candidate_id: number;
  job_id: number;
  journey_type: string;
  content: string;
  category: string;
  status: string;
  type: string;
  issue_id: string;
  message: string;
}

export interface CandidatesRequests {
  offset: number;
  limit: number;
  order: string;
  filter: string;
  direction: string;
  contactDates: string[];
  contactTimes: string[];
  interviewMethods: string;
  interviewDate: string;
  branchId: number;
  jobStatus: string;
}

export interface CandidatesIdRequests {
  id: number;
  branchId: number;
}

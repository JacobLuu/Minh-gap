import type { Job } from '../models';

interface JobsResponse {
  jobs: Job[];
}

export type { JobsResponse, Job as JobResponse };

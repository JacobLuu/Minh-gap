import { CANDIDATE_JOB_PROGRESS_STATUS } from '../../constants/enums';

export interface UpdateProgressRequest {
  progress: CANDIDATE_JOB_PROGRESS_STATUS;
}

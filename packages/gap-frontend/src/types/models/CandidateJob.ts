import type { BaseModel } from '.';
import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
} from '../../constants/enums';

interface CandidateJob extends BaseModel {
  status: string;
  progresses: Progress[];
}

interface Progress {
  type: CANDIDATE_JOB_PROGRESS_TYPE;
  progress: CANDIDATE_JOB_PROGRESS_STATUS;
}

export type { CandidateJob, Progress };

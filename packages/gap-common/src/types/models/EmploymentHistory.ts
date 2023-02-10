import type { BaseModel } from './BaseModel';

import { EMPLOYMENT_STATUS, HISTORY_TYPE } from '../../constants/enums';

interface EmploymentHistory extends BaseModel {
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string;
  history_type: HISTORY_TYPE;
  employment_status: EMPLOYMENT_STATUS;
  job_description: string;
}

export type { EmploymentHistory };

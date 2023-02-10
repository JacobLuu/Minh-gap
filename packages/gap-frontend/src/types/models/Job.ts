import type { BaseModel, Branch } from '.';

interface Job extends BaseModel {
  title: string;
  external_id: string;
  branch: Branch;
  status: string;
}

export type { Job };

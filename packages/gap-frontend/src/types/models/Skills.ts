import type { BaseModel } from '.';

interface Skill extends BaseModel {
  name: string;
  is_enabled: boolean;
}

export type { Skill };

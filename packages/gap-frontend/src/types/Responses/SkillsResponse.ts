import type { Skill } from '../models';

interface SkillsResponse {
  skills: Skill[];
  count: number;
}

export type { SkillsResponse };

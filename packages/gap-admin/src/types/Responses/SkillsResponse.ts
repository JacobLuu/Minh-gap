export interface Skill {
  id: number;
  name: string;
}

export interface SkillsResponse {
  skills: string[] | Skill;
}

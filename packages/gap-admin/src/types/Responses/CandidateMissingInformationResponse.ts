export interface CandidateMissingInformationResponse {
  logs: Logs[];
}

export interface Logs {
  id: number;
  content: string;
  posted_at: number;
  type: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  profile_image_url: string;
}

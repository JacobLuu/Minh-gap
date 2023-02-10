import { Job } from '../models';

export interface FilesDocumentResponse {
  id: number;
  type: string;
  url: string;
  uploaded_at: number;
  status: string;
  job: Job;
}

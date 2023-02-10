export interface StatusResponse {
  success: boolean;
  message: string;
  errors: Error[];
}

interface Error {
  code: number;
  message: string;
}

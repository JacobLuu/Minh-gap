export interface ResetPasswordResponse {
  message: string;
  errors: errors[];
}

interface errors {
  code: number;
  message: string;
}

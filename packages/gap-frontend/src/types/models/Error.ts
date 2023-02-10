interface BaseError {
  error: {
    status?: number;
    statusText?: string;
    data: unknown;
  };
}

export type { BaseError };

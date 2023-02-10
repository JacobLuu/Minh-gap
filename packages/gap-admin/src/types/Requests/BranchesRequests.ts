export interface BranchesRequest {
  offset: number;
  limit: number;
  order: string;
  filter: string;
  direction: string;
  branchId: number;
}

export interface BranchRequest {
  id: number;
  branchId: number;
}

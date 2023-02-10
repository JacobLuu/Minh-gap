export interface BranchesResponse {
  branches: Branch[];
  count: number;
}

export interface Branch {
  id: number;
  external_id: number;
  name: string;
  type: string;
  legal_entity: string;
  company_registration_number: number;
  email: string;
  phone_number: number;
  address: string;
  manager_name: string;
  director_name: string;
  client_name: string;
  parent_branch: string;
}

import { AxiosResponse } from 'axios';
import ComplianceBaseService from './ComplianceBaseService';

import { BranchesRequest, BranchRequest } from '../../types/Requests';
import { Branch, BranchesResponse } from '../../types/Responses';

import { END_POINT } from '../../request/constants';

const getBranches = (
  requestData: BranchesRequest,
): Promise<AxiosResponse<BranchesResponse>> => {
  return ComplianceBaseService.get(`${END_POINT.BRANCHES}`, {
    params: {
      limit: requestData.limit,
      offset: requestData.offset,
      filter: requestData.filter,
    },
  });
};

const getBranch = (
  requestData: BranchRequest,
): Promise<AxiosResponse<Branch>> => {
  return ComplianceBaseService.get(`${END_POINT.BRANCHES}/${requestData.id}`);
};

const updateBranch = (
  requestData: BranchRequest,
): Promise<AxiosResponse<Branch>> => {
  return ComplianceBaseService.put(
    `${END_POINT.BRANCHES}/${requestData.id}`,
    requestData,
  );
};

const createBranch = (
  requestData: BranchRequest,
): Promise<AxiosResponse<Branch>> => {
  return ComplianceBaseService.post(END_POINT.BRANCHES, requestData);
};

const deleteBranch = (
  requestData: BranchRequest,
): Promise<AxiosResponse<Branch>> => {
  return ComplianceBaseService.delete(
    `${END_POINT.BRANCHES}/${requestData.id}`,
  );
};

export default {
  getBranches,
  getBranch,
  updateBranch,
  createBranch,
  deleteBranch,
};

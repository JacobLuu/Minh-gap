import { AxiosResponse } from 'axios';
import BaseService from './BaseService';
import { LoginForm } from '../types/Requests';
import { UserResponse } from '../types/Responses';

const BASE_URL = '/api/v1';

const login = (data: LoginForm): Promise<AxiosResponse<UserResponse>> => {
  return BaseService.post(`${BASE_URL}/auth/signin`, data);
};

export default {
  login,
};

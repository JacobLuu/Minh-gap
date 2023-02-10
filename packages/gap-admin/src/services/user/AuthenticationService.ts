import { AxiosResponse } from 'axios';
import UserService from './UserService';

import {
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyTokenRequest,
} from '../../types/Requests';
import {
  LoginResponse,
  UserResponse,
  ResetPasswordResponse,
  ForgotPasswordResponse,
  VerifyTokenResponse,
} from '../../types/Responses';

import { END_POINT } from '../../request/constants';

const login = (data: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
  return UserService.post(`${END_POINT.AUTH.LOGIN}`, data);
};

const logout = (): Promise<AxiosResponse<LoginResponse>> => {
  return UserService.post(`${END_POINT.AUTH.LOGOUT}`);
};

const accountInfo = (): Promise<AxiosResponse<UserResponse>> => {
  return UserService.get(`${END_POINT.ACCOUNT_INFO.ME}`);
};

const forgotPassword = (
  data: ForgotPasswordRequest,
): Promise<AxiosResponse<ForgotPasswordResponse>> => {
  return UserService.post(`${END_POINT.AUTH.FORGOT_PASSWORD}`, data);
};

const resetPassword = (
  data: ResetPasswordRequest,
): Promise<AxiosResponse<ResetPasswordResponse>> => {
  return UserService.post(`${END_POINT.AUTH.RESET_PASSWORD}`, data);
};

const verifyToken = (
  data: VerifyTokenRequest,
): Promise<AxiosResponse<VerifyTokenResponse>> => {
  return UserService.get(`${END_POINT.AUTH.VERIFY_TOKEN}?token=${data.token}`);
};

export default {
  login,
  logout,
  accountInfo,
  forgotPassword,
  resetPassword,
  verifyToken,
};

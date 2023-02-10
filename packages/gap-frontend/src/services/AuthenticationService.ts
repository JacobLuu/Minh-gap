import { AxiosResponse } from 'axios';
import BaseService from './BaseService';
import {
  SigninRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from '../types/Requests';
import { TokenResponse, StatusResponse } from '../types/Responses';
import { END_POINT } from '../constants/request';

const login = (data: SigninRequest): Promise<AxiosResponse<TokenResponse>> => {
  return BaseService.post(`${END_POINT.AUTH.SIGNIN}`, data);
};

const logout = (): Promise<AxiosResponse<StatusResponse>> => {
  return BaseService.post(`${END_POINT.AUTH.LOG_OUT}`);
};

const signup = (data: SignupRequest): Promise<AxiosResponse<TokenResponse>> => {
  return BaseService.post(`${END_POINT.AUTH.SIGNUP}`, data);
};

const forgotPassword = (
  data: ForgotPasswordRequest,
): Promise<AxiosResponse<TokenResponse>> => {
  return BaseService.post(`${END_POINT.AUTH.FORGOT_PASSWORD}`, data);
};

const verifyResetPasswordToken = (
  token: string,
): Promise<AxiosResponse<TokenResponse>> => {
  return BaseService.get(`${END_POINT.AUTH.VERIFY_TOKEN}?token=${token}`);
};

const resetPassword = (
  data: ResetPasswordRequest,
): Promise<AxiosResponse<TokenResponse>> => {
  return BaseService.post(`${END_POINT.AUTH.RESET_PASSWORD}`, data);
};

export default {
  login,
  logout,
  signup,
  forgotPassword,
  resetPassword,
  verifyResetPasswordToken,
};

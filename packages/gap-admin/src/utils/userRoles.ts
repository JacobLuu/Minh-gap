/* eslint-disable import/no-cycle */
import { getAccountInfo } from './localStorage';
import { ROLES } from '../constants/enums';

const userRoles = getAccountInfo()?.roles;

export const isAdmin = () => {
  return userRoles?.includes(ROLES.ADMIN);
};

export const isConsultant = () => {
  return userRoles?.includes(ROLES.CONSULTANT);
};

export const isCompliance = () => {
  return userRoles?.includes(ROLES.COMPLIANCE);
};

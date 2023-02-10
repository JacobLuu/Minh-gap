export const METHOD = {
  get: 'get',
  post: 'post',
  put: 'put',
  del: 'delete',
};

export const END_POINT = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/login',
    LOG_OUT: '/auth/logout',
    VERIFY_TOKEN: '/auth/check_reset_token',
    FORGOT_PASSWORD: '/auth/forgot_password',
    RESET_PASSWORD: '/auth/reset_password',
  },
  ACCOUNT_INFO: {
    ME: '/me',
    SKILLS: '/me/skills',
    JOBS: '/me/jobs',
    EMERGENCY_CONTACT: '/me/emergency_contact',
    EMPLOYMENT_HISTORIES: '/me/employee_histories',
    FINANCIAL_INFORMATION: '/me/bank_account',
    ADDRESS: '/me/address',
    PASSWORD: '/me/password',
    FILES: '/me/files',
    SHARE_CODES: '/me/share_codes',
  },
  FILES: '/files',
  ADDRESSES: {
    GENERAL: '/addresses',
    SEARCH: '/addresses/search',
  },
  SKILLS: '/skills',
  QUESTION_GROUPS: '/question_groups',
  TRACKING_RECORDS: {
    GENERAL: '/tracking_records',
    ADVERT_REACTION: '/tracking_records/welcome',
  },
  PROGRESSES: '/progresses',
  ETHNICITIES: '/ethnicities',
  NATIONALITIES: '/nationalities',
};

export const METHOD = {
  get: 'get',
  post: 'post',
  put: 'put',
  del: 'delete',
};

export const END_POINT = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    LOGIN: '/auth/login',
    VERIFY_TOKEN: '/auth/check_reset_token',
    FORGOT_PASSWORD: '/auth/forgot_password',
    RESET_PASSWORD: '/auth/reset_password',
  },
  ACCOUNT_INFO: {
    ME: '/me',
  },
  CANDIDATES: '/candidates',
  QUESTION_GROUPS: '/question_groups',
  EMPLOYEE_HISTORIES: '/employee_histories',
  SKILLS: '/skills',
  ESCALATED_ISSUES: 'candidates/escalated_issues',
  MISSING_INFORMATION_REQUESTS: '/missing_information_requests',
  COMMUNICATION_NOTE: '/communication_note',
  BRANCHES: '/branches',
  APPOINTMENTS: '/appointments',
  EMAIL_TEMPLATES: '/email_templates',
};

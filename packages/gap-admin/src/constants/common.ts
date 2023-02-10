export const REQUEST_STATUS = {
  IDLE: 'IDLE',
  REQUESTING: 'REQUESTING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED_SUCCESS: 201,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

export const REQUIRED_DOCUMENTS = {
  NATIONAL_INSURANCE: 'national_insurance',
  BIRTH_CERTIFICATES: 'birth_certificates',
};

export const ESCALATED_ISSUE_OPTION = [
  { label: 'Right to Work', value: 'right_to_work' },
  { label: 'Duplicated data', value: 'duplicated_data' },
  { label: 'Others', value: 'others' },
];

export const DEFAULT_DEBOUNCE_TIME = 300;

export default {
  REQUEST_STATUS,
  STATUS_CODE,
  DEFAULT_DEBOUNCE_TIME,
};

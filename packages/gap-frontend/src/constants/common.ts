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
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  SERVER_ERROR: 500,
};

export const DEFAULT_INPUT_FIELD_MAX_CHARACTERS = 255;

export default {
  REQUEST_STATUS,
  STATUS_CODE,
  DEFAULT_INPUT_FIELD_MAX_CHARACTERS,
};

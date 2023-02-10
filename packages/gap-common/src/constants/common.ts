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

export const STATUS_ACTION = {
  SENT: 'Sent',
  NOT_SENT: 'Not sent',
  AWAITING_SIGNATURE: 'Awaiting signature',
};

export default {
  REQUEST_STATUS,
  STATUS_CODE,
  STATUS_ACTION,
};

import { FILE_STATUS_TYPE } from '../../constants/enums';

export interface UpdateFileStatusRequest {
  status: FILE_STATUS_TYPE;
}

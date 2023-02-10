import type { BaseModel } from '.';
import type { FILE_TYPE, FILE_STATUS_TYPE } from '../../constants/enums';

interface File extends BaseModel {
  url: string;
  original_file_name: string;
  type: FILE_TYPE;
  status: FILE_STATUS_TYPE;
  uploaded_at: number;
}

export type { File };

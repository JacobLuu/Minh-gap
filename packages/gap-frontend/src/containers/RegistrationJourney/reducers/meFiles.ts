import { AxiosResponse } from 'axios';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FILE_TYPE, REQUEST_STATUS } from '../../../constants/enums';

import type { RootState } from '../../../redux/store';
import type { BaseError, BaseState } from '../../../types/models';
import type { FilesResponse } from '../../../types/Responses';

interface MeFilesState extends BaseError, BaseState {
  files: Record<FILE_TYPE, FilesResponse>;
}

const initialFiles: Record<FILE_TYPE, FilesResponse> = {
  [FILE_TYPE.TYPE_CV]: null,
  [FILE_TYPE.TYPE_DECLARATION_AGREEMENT]: null,
  [FILE_TYPE.TYPE_ADDRESS_PROOF]: null,
  [FILE_TYPE.TYPE_PASSPORT]: null,
  [FILE_TYPE.TYPE_PASSPORT_CHECK_RESULT_REPORT]: null,
  [FILE_TYPE.TYPE_WORK_CONTRACT]: null,
  [FILE_TYPE.TYPE_MEDICAL_CONTRACT]: null,
  [FILE_TYPE.TYPE_KEY_INFORMATION_DOCUMENT]: null,
  [FILE_TYPE.TYPE_CANDIDATE_SIGNATURE]: null,
  [FILE_TYPE.TYPE_BANK_PROOF]: null,
  [FILE_TYPE.TYPE_RIGHT_TO_WORK]: null,
  [FILE_TYPE.TYPE_PROFILE_IMAGE_OF_RIGHT_TO_WORK]: null,
  [FILE_TYPE.TYPE_PROFILE_IMAGE]: null,
};

export type { MeFilesState };

const initialState: MeFilesState = {
  files: initialFiles,
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: null,
    statusText: '',
  },
};

type FilesResponseSuccess = FilesResponse & { fileType: FILE_TYPE };

export const slice = createSlice({
  name: 'meFilesSlice',
  initialState,
  reducers: {
    getMeFilesRequest: (
      state,
      _action: PayloadAction<{ fileType: FILE_TYPE; jobId: number }>,
    ) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getMeFilesSuccess: (state, action: PayloadAction<FilesResponseSuccess>) => {
      const { payload } = action;
      const { fileType } = payload;
      state.files[fileType] = { files: payload.files };
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getMeFilesFail: (state, action: PayloadAction<AxiosResponse>) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
    clearMeContractFiles: (state) => {
      state.files[FILE_TYPE.TYPE_KEY_INFORMATION_DOCUMENT] = null;
      state.files[FILE_TYPE.TYPE_WORK_CONTRACT] = null;
      state.files[FILE_TYPE.TYPE_MEDICAL_CONTRACT] = null;
    },
  },
});

export const {
  getMeFilesRequest,
  getMeFilesSuccess,
  getMeFilesFail,
  clearMeContractFiles,
} = slice.actions;

export const selectMeFilesSlice = (state: RootState) => state.meFilesSlice;

export default slice.reducer;

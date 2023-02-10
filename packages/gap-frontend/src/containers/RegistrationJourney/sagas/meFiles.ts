import axios, { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';

import { STATUS_CODE } from '../../../constants/common';
import { FILE_TYPE } from '../../../constants/enums';
import MeService from '../../../services/MeService';
import { setErrorMessages } from '../../Global/reducer';
import {
  getMeFilesFail,
  getMeFilesRequest,
  getMeFilesSuccess,
} from '../reducers/meFiles';

import type { FilesResponse } from '../../../types/Responses';

function* getMeFilesFlow(
  action: PayloadAction<{ fileType: FILE_TYPE; jobId: number }>,
) {
  try {
    const response: AxiosResponse<FilesResponse> = yield call(
      MeService.getFiles,
      action.payload.fileType,
      action.payload.jobId,
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getMeFilesSuccess.type,
        payload: { ...response.data, fileType: action.payload.fileType },
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getMeFilesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });

    let errorMessage = error?.response?.data?.message;
    if (!errorMessage && error?.response?.data?.errors?.length > 0) {
      errorMessage = error?.response?.data?.errors[0]?.message;
    }
    if (!errorMessage) errorMessage = 'Something went wrong';
    yield put({
      type: setErrorMessages.type,
      payload: [errorMessage],
    });
  }
}

function* meFilesWatcher() {
  yield takeEvery(getMeFilesRequest, getMeFilesFlow);
}

export default meFilesWatcher;

import axios, { AxiosResponse } from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import BranchesService from '../../services/compliance/BranchesService';
import { BranchesRequest } from '../../types/Requests';
import { STATUS_CODE } from '../../constants/common';
import {
  getBranchesRequest,
  getBranchesSuccess,
  getBranchesFail,
} from './reducer';

function* branchManagementFlow<T extends BranchesRequest = BranchesRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<BranchesRequest> =
      yield BranchesService.getBranches(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getBranchesSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getBranchesFail.type });
    }
  } catch (error) {
    yield put({
      type: getBranchesFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* branchManagementWatcher() {
  yield takeEvery(getBranchesRequest, branchManagementFlow);
}

export default branchManagementWatcher;

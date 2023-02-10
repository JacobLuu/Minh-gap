import axios, { AxiosResponse } from 'axios';
import { debounce, put, takeEvery } from 'redux-saga/effects';
import BranchService from '../../../services/compliance/BranchesService';
import { setErrorMessages, setSuccessMessages } from '../../Global/reducer';
import { BranchRequest } from '../../../types/Requests';
import { STATUS_CODE } from '../../../constants/common';
import {
  getBranchRequest,
  getBranchSuccess,
  getBranchFail,
  updateBranchRequest,
  updateBranchSuccess,
  updateBranchFail,
  createBranchRequest,
  createBranchSuccess,
  createBranchFail,
  deleteBranchRequest,
  deleteBranchSuccess,
  deleteBranchFail,
} from './reducer';

function* branchFlow<T extends BranchRequest = BranchRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<BranchRequest> =
      yield BranchService.getBranch(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getBranchSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      yield put({ type: getBranchFail.type });
    }
  } catch (error) {
    yield put({
      type: getBranchFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* UpdateBranchFlow<T extends BranchRequest = BranchRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<BranchRequest> =
      yield BranchService.updateBranch(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateBranchSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Update success.'],
      });
    } else {
      yield put({ type: updateBranchFail.type });
    }
  } catch (error) {
    yield put({
      type: updateBranchFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* CreateBranchFlow<T extends BranchRequest = BranchRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<BranchRequest> =
      yield BranchService.createBranch(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = createBranchSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Create success.'],
      });
    } else {
      yield put({ type: createBranchFail.type });
    }
  } catch (error) {
    yield put({
      type: setErrorMessages.type,
      payload: ['Something went wrong.'],
    });
    yield put({
      type: createBranchFail.type,
      payload: axios.isAxiosError(error)
        ? error.response
        : {
            data: error,
          },
    });
  }
}

function* DeleteBranchFlow<T extends BranchRequest = BranchRequest>({
  payload,
}: {
  payload: T;
}) {
  try {
    const response: AxiosResponse<BranchRequest> =
      yield BranchService.deleteBranch(payload);

    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = deleteBranchSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Deleted'],
      });
    } else {
      yield put({ type: deleteBranchFail.type });
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: ['Delete Fail'],
    });
    yield put({
      type: deleteBranchFail.type,
      payload: error.response.data.message,
    });
  }
}

function* branchWatcher() {
  yield takeEvery(getBranchRequest, branchFlow);
  yield debounce(500, updateBranchRequest, UpdateBranchFlow);
  yield debounce(500, createBranchRequest, CreateBranchFlow);
  yield debounce(500, deleteBranchRequest, DeleteBranchFlow);
}

export default branchWatcher;

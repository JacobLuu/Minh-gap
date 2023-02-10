import axios, { AxiosResponse } from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';
import { parsePhoneNumber } from 'libphonenumber-js';
import { setErrorMessages, setSuccessMessages } from '../Global/reducer';
import MeService from '../../services/MeService';
import { STATUS_CODE } from '../../constants/common';
import type {
  JobsResponse,
  JobResponse,
  StatusResponse,
} from '../../types/Responses';
import {
  updateMeRequest,
  updateMeSuccess,
  updateMeFail,
  getMeRequest,
  getMeSuccess,
  getMeFail,
  getMeJobsFail,
  getMeJobsRequest,
  getMeJobsSuccess,
  addNewJobRequest,
  addNewJobSuccess,
  addNewJobFail,
} from './reducer';

export interface ContactDate {
  label: string;
  value: string;
}

export interface ContactTime {
  label: string;
  value: string;
}

export interface IUpdateMeInput {
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: any;
  contactDates: ContactDate[];
  contactTimes: ContactTime[];
  journeyType: string;
}

function* updateMeFlow(data: PayloadAction<IUpdateMeInput>) {
  try {
    const {
      title,
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      contactDates,
      contactTimes,
      journeyType,
    } = data.payload;

    const parsedPhoneNumber = parsePhoneNumber(phoneNumber);

    const requestBody = {
      title: title,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      email: email,
      phone_number: parsedPhoneNumber?.number || '',
      phone_number_country_code: parsedPhoneNumber?.countryCallingCode || '',
      date_of_birth: dateOfBirth,
      status: '',
      contact_dates: contactDates || [],
      contact_times: contactTimes || [],
      journey_type: journeyType,
    };

    const response = yield call(MeService.updateMe, requestBody);
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = updateMeSuccess;
      yield put({
        type,
        payload: response.data,
      });
      yield put({
        type: setSuccessMessages.type,
        payload: ['Update me success.'],
      });
    } else {
      let errorMessage = response.data?.message;
      if (!errorMessage && response.data?.errors?.length > 0) {
        errorMessage = response.data.errors[0]?.message;
      }

      throw new Error(errorMessage);
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.message],
    });
    yield put({
      type: updateMeFail.type,
      payload: error.message,
    });
  }
}

function* getMeFlow() {
  try {
    const response = yield call(MeService.getMe);
    if (response.status === STATUS_CODE.SUCCESS) {
      const { type } = getMeSuccess;
      yield put({
        type,
        payload: response.data,
      });
    } else {
      let errorMessage = response.data?.message;
      if (!errorMessage && response.data?.errors?.length > 0) {
        errorMessage = response.data.errors[0]?.message;
      }

      throw new Error(errorMessage);
    }
  } catch (error: any) {
    yield put({
      type: setErrorMessages.type,
      payload: [error.message],
    });
    yield put({
      type: getMeFail.type,
      payload: error.message,
    });
  }
}

function* getMeJobsFlow() {
  try {
    const response: AxiosResponse<JobsResponse> = yield call(MeService.getJobs);
    if (response.status === STATUS_CODE.SUCCESS) {
      yield put({
        type: getMeJobsSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: getMeJobsFail.type,
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

function* addMeJobFlow({ payload }) {
  try {
    const addJobBody = { ...payload };
    const response: AxiosResponse<JobResponse | StatusResponse> = yield call(
      MeService.addJob,
      addJobBody,
    );
    if (response.status === STATUS_CODE.CREATED_SUCCESS) {
      yield put({
        type: addNewJobSuccess.type,
        payload: response.data,
      });
    } else {
      throw new Error(response.data as unknown as string);
    }
  } catch (error: any) {
    yield put({
      type: addNewJobFail.type,
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

function* getStartedWatcher() {
  yield takeEvery(updateMeRequest, updateMeFlow);
  yield takeEvery(getMeRequest, getMeFlow);
  yield takeEvery(getMeJobsRequest, getMeJobsFlow);
  yield takeEvery(addNewJobRequest, addMeJobFlow);
}

export default getStartedWatcher;

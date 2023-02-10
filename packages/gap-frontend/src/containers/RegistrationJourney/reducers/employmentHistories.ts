import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { REQUEST_STATUS } from '../../../constants/enums';
import type { RootState } from '../../../redux/store';
import type {
  BaseError,
  BaseState,
  EmploymentHistory as EmploymentHistoryModel,
} from '../../../types/models';

type EmploymentHistory = EmploymentHistoryModel & {
  isDeleted?: boolean;
  isNew?: boolean;
  isUpdated?: boolean;
};

interface EmploymentHistoriesState extends BaseState, BaseError {
  histories: EmploymentHistory[];
}

export type { EmploymentHistoriesState };

const initialState: EmploymentHistoriesState = {
  histories: [],
  status: REQUEST_STATUS.IDLE,
  error: {
    data: null,
    status: null,
    statusText: '',
  },
};

export const slice = createSlice({
  name: 'employmentHistoriesSlice',
  initialState,
  reducers: {
    getEmploymentHistoriesRequest: (state) => {
      state.status = REQUEST_STATUS.REQUESTING;
    },
    getEmploymentHistoriesSuccess: (
      state,
      action: PayloadAction<EmploymentHistoriesState>,
    ) => {
      const { payload } = action;
      state.histories = payload.histories;
      state.status = REQUEST_STATUS.SUCCESS;
    },
    getEmploymentHistoriesFail: (
      state,
      action: PayloadAction<AxiosResponse>,
    ) => {
      const { payload } = action;
      state.status = REQUEST_STATUS.ERROR;
      state.error = {
        status: payload.status,
        statusText: payload.statusText,
        data: payload.data,
      };
    },
    addEmploymentHistory: (state, action: PayloadAction<EmploymentHistory>) => {
      const { payload } = action;
      const maxId =
        state.histories.length > 0
          ? Math.max(...state.histories.map((history) => history.id)) + 1
          : 1;
      state.histories.push({
        ...payload,
        isNew: true,
        id: maxId,
      });
    },
    updateEmploymentHistory: (
      state,
      action: PayloadAction<EmploymentHistory>,
    ) => {
      const { payload } = action;
      state.histories = state.histories.map((history) => {
        if (history.id === payload.id) {
          return {
            ...history,
            ...payload,
            isUpdated: !history.isNew,
          };
        }
        return history;
      });
    },
    deleteEmploymentHistory: (state, action: PayloadAction<{ id: number }>) => {
      const { payload } = action;
      state.histories = state.histories
        .filter((history) => {
          return !(history.id === payload.id && history.isNew);
        })
        .map((history) => {
          if (history.id === payload.id) {
            return {
              ...history,
              isDeleted: true,
              isNew: false,
              isUpdated: false,
            };
          }
          return history;
        });
    },
  },
});

export const {
  getEmploymentHistoriesRequest,
  getEmploymentHistoriesSuccess,
  getEmploymentHistoriesFail,
  addEmploymentHistory,
  updateEmploymentHistory,
  deleteEmploymentHistory,
} = slice.actions;

export const selectEmploymentHistories = (state: RootState) =>
  state.employmentHistoriesSlice;

export default slice.reducer;

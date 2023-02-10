import { PROGRESS_STATUS } from 'gap-common/src/constants/enums';

export const calculateProgress = (progress) => {
  if (progress) {
    if (progress === PROGRESS_STATUS.NO_INFO) {
      return {
        progressColor: 'error',
        status: 'No information present',
        textColor: 'text.error',
        progressValue: 20,
      };
    }
    if (progress === PROGRESS_STATUS.COMPLETED) {
      return {
        progressColor: 'success',
        status: 'Complete',
        textColor: 'text.success',
        progressValue: 100,
      };
    }
    if (progress === PROGRESS_STATUS.IN_PROGRESS) {
      return {
        progressColor: 'warning',
        status: 'Some information present',
        textColor: 'text.warning',
        progressValue: 70,
      };
    }
    if (progress === PROGRESS_STATUS.LOCKED) {
      return {
        progressColor: 'inactive',
        status: 'Locked',
        textColor: 'text.content',
        progressValue: 0,
      };
    }
  }
  return {
    progressColor: 'inactive',
    status: 'No information present',
    textColor: 'text.content',
    progressValue: 0,
  };
};

export const getProgress = (data, categoryType) => {
  return data?.find((item) => item.type === categoryType)?.progress;
};

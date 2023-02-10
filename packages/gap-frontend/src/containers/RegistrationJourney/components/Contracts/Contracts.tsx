import InputSelectField from 'gap-common/src/components/InputSelectField';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
  FILE_STATUS_TYPE,
  FILE_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import ProgressesService from '../../../../services/ProgressesService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import {
  getMeFilesRequest,
  clearMeContractFiles,
  selectMeFilesSlice,
} from '../../reducers/meFiles';
import { selectMeJobsSlice } from '../../reducers/meJobs';
import { getProgressesRequest } from '../../reducers/progresses';
import Contract from '../Contract';

interface ContractsForm {
  jobId: number;
}

const DEFAULT_FORM_VALUES: ContractsForm = {
  jobId: null,
};

const Contracts = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isScreenSm } = useBreakPoints();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { files } = useAppSelector(selectMeFilesSlice);
  const { jobs: meJobs } = useAppSelector(selectMeJobsSlice);
  const jobOptions = meJobs.map((job) => {
    return { label: job.title, value: job.id };
  });

  const form = useForm<ContractsForm>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const selectedJobId = form.watch('jobId');

  const updateProgressStatus = (
    status: CANDIDATE_JOB_PROGRESS_STATUS,
    successMessage: string,
  ) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.CONTRACTS,
      {
        progress: status,
      },
      selectedJobId,
    )
      .then(() => {
        dispatch(setSuccessMessages([successMessage]));
        dispatch(getProgressesRequest());
      })
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });

  const submitForm = () => {
    setIsSubmitting(true);
    updateProgressStatus(
      CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED,
      t<string>('registrationJourney:common.submit_success'),
    );
  };

  const handleSaveProgress = () => {
    setIsSubmitting(true);
    updateProgressStatus(
      CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS,
      t<string>('registrationJourney:common.save_success'),
    );
  };

  useEffect(() => {
    return () => {
      dispatch(clearMeContractFiles());
    };
  }, []);

  useEffect(() => {
    if (selectedJobId) {
      dispatch(
        getMeFilesRequest({
          fileType: FILE_TYPE.TYPE_KEY_INFORMATION_DOCUMENT,
          jobId: selectedJobId,
        }),
      );
      dispatch(
        getMeFilesRequest({
          fileType: FILE_TYPE.TYPE_WORK_CONTRACT,
          jobId: selectedJobId,
        }),
      );
      dispatch(
        getMeFilesRequest({
          fileType: FILE_TYPE.TYPE_MEDICAL_CONTRACT,
          jobId: selectedJobId,
        }),
      );
    }
  }, [selectedJobId]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <form>
        <Box mb={10}>
          <Typography variant="subtitle1" mb={1}>
            {t<string>('registrationJourney:contracts.header.title')}
          </Typography>
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            fontWeight={400}
          >
            {t<string>('registrationJourney:contracts.header.subtitle')}
          </Typography>
        </Box>

        <Box mb={10}>
          <InputSelectField
            name="jobId"
            label={t('registrationJourney:contracts.body.select_a_job')}
            placeholder={t('registrationJourney:contracts.body.select_a_job')}
            required
            form={form}
            options={jobOptions}
            sx={{ width: '100%' }}
          />
        </Box>

        <Box>
          {files[FILE_TYPE.TYPE_KEY_INFORMATION_DOCUMENT]?.files.map((file) => {
            return (
              <Contract
                key={file.id}
                fileId={file.id}
                fileType={FILE_TYPE.TYPE_KEY_INFORMATION_DOCUMENT}
                isViewable
                isSignable={false}
                selectedJobId={selectedJobId}
              />
            );
          })}
          {files[FILE_TYPE.TYPE_WORK_CONTRACT]?.files.map((file) => {
            return (
              <Contract
                key={file.id}
                fileId={file.id}
                fileType={FILE_TYPE.TYPE_WORK_CONTRACT}
                isViewable={
                  files[FILE_TYPE.TYPE_KEY_INFORMATION_DOCUMENT]?.files[0]
                    .status === FILE_STATUS_TYPE.STATUS_READ
                }
                isSignable={
                  file.status === FILE_STATUS_TYPE.STATUS_READ ||
                  file.status === FILE_STATUS_TYPE.STATUS_SIGNED
                }
                selectedJobId={selectedJobId}
              />
            );
          })}
          {files[FILE_TYPE.TYPE_MEDICAL_CONTRACT]?.files.map((file) => {
            return (
              <Contract
                key={file.id}
                fileId={file.id}
                fileType={FILE_TYPE.TYPE_MEDICAL_CONTRACT}
                isViewable={
                  files[FILE_TYPE.TYPE_WORK_CONTRACT]?.files[0].status ===
                  FILE_STATUS_TYPE.STATUS_SIGNED
                }
                isSignable={
                  file.status === FILE_STATUS_TYPE.STATUS_READ ||
                  file.status === FILE_STATUS_TYPE.STATUS_SIGNED
                }
                selectedJobId={selectedJobId}
                shouldHaveBorder={false}
              />
            );
          })}
        </Box>

        <Box
          mt={6}
          display="flex"
          justifyContent={isScreenSm ? 'flex-end' : 'space-between'}
          width="100%"
        >
          <Box mr={isScreenSm ? 3 : 0} width={isScreenSm ? 'auto' : '45%'}>
            <Button
              onClick={handleSaveProgress}
              variant="outlined"
              disabled={!selectedJobId || isSubmitting}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:common.save_progress')}
            </Button>
          </Box>
          <Box width={isScreenSm ? 'auto' : '45%'}>
            <Button
              onClick={submitForm}
              variant="contained"
              disabled={!selectedJobId || isSubmitting}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:common.submit')}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default memo(Contracts);

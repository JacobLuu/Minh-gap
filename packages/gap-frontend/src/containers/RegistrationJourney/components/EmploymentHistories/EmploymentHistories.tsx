import { ReactComponent as EditIcon } from 'gap-common/src/assets/images/icon_log_edit.svg';
import EmploymentHistoryCard from 'gap-common/src/components/EmploymentHistoryCard';
import { HISTORY_TYPE } from 'gap-common/src/constants/enums';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import omit from 'lodash/omit';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { EmploymentHistory } from 'gap-common/src/types/models/EmploymentHistory';

import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import MeService from '../../../../services/MeService';
import ProgressesService from '../../../../services/ProgressesService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import {
  getEmploymentHistoriesRequest,
  selectEmploymentHistories,
} from '../../reducers/employmentHistories';
import { getProgressesRequest } from '../../reducers/progresses';
import EmploymentHistoryModal from '../EmploymentHistoryModal';
import type { JobOption } from '../../RegistrationJourney';

interface EmploymentHistoriesProps {
  selectedJob: JobOption;
}

const EmploymentHistories = (props: EmploymentHistoriesProps) => {
  const { selectedJob } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isScreenSm } = useBreakPoints();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { histories: employmentHistories } = useAppSelector(
    selectEmploymentHistories,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmploymentHistory, setSelectedEmploymentHistory] =
    useState<EmploymentHistory>(null);

  const employmentTypeHistories: EmploymentHistory[] = [];
  const educationTypeHistories: EmploymentHistory[] = [];
  const otherTypeHistories: EmploymentHistory[] = [];

  for (let i = 0; i < employmentHistories.length; i += 1) {
    if (
      employmentHistories[i].history_type === HISTORY_TYPE.EMPLOYMENT &&
      !employmentHistories[i].isDeleted
    ) {
      employmentTypeHistories.push(employmentHistories[i]);
    } else if (
      employmentHistories[i].history_type === HISTORY_TYPE.EDUCATION &&
      !employmentHistories[i].isDeleted
    ) {
      educationTypeHistories.push(employmentHistories[i]);
    } else if (
      employmentHistories[i].history_type === HISTORY_TYPE.OTHER &&
      !employmentHistories[i].isDeleted
    ) {
      otherTypeHistories.push(employmentHistories[i]);
    }
  }

  const handleAddNewRecord = () => {
    setIsDialogOpen(true);
    setSelectedEmploymentHistory(null);
  };

  const handleClickEdit = (employment_history: EmploymentHistory) => {
    setIsDialogOpen(true);
    setSelectedEmploymentHistory(employment_history);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) => {
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.EMPLOYMENT_HISTORY,
      {
        progress: status,
      },
      selectedJob.id,
    );
  };

  const addEmploymentHistories = () => {
    return Promise.all(
      employmentHistories
        .filter((employmentHistory) => employmentHistory.isNew)
        .map((employmentHistory) => {
          return MeService.addEmploymentHistory({
            ...employmentHistory,
            start_date: new Date(employmentHistory.start_date),
            end_date: new Date(employmentHistory.end_date),
          });
        }),
    );
  };

  const updateEmploymentHistories = () => {
    return Promise.all(
      employmentHistories
        .filter((employmentHistory) => employmentHistory.isUpdated)
        .map((employmentHistory) => {
          const payload: Omit<EmploymentHistory, 'id'> = omit(
            employmentHistory,
            'id',
          );
          return MeService.updateEmploymentHistory(
            payload,
            employmentHistory.id,
          );
        }),
    );
  };

  const deleteEmploymentHistories = () => {
    return Promise.all(
      employmentHistories
        .filter((employmentHistory) => employmentHistory.isDeleted)
        .map((employmentHistory) =>
          MeService.deleteEmploymentHistory(employmentHistory.id),
        ),
    );
  };
  const handleOnSubmitFulfilled = () => {
    dispatch(getEmploymentHistoriesRequest());
    dispatch(
      getProgressesRequest({
        jobId: selectedJob.id,
      }),
    );
  };

  const handleSaveProgress = () => {
    setIsSubmitting(true);
    addEmploymentHistories()
      .then(updateEmploymentHistories)
      .then(deleteEmploymentHistories)
      .then(() =>
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS),
      )
      .then(handleOnSubmitFulfilled)
      .then(() => {
        dispatch(
          setSuccessMessages([
            t<string>('registrationJourney:common.save_success'),
          ]),
        );
      })
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    addEmploymentHistories()
      .then(updateEmploymentHistories)
      .then(deleteEmploymentHistories)
      .then(() => updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED))
      .then(handleOnSubmitFulfilled)
      .then(() => {
        dispatch(
          setSuccessMessages([
            t<string>('registrationJourney:common.submit_success'),
          ]),
        );
      })
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    dispatch(getEmploymentHistoriesRequest());
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection={isScreenSm ? 'row' : 'column'}
        justifyContent="space-between"
        alignItems={isScreenSm ? 'center' : 'flex-start'}
        mb={9}
      >
        <Box>
          <Typography variant="subtitle1" mb={1}>
            {t<string>('registrationJourney:employment_history.header.title')}
          </Typography>
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            fontWeight={400}
          >
            {t<string>(
              'registrationJourney:employment_history.header.subtitle',
            )}
          </Typography>
        </Box>
        <Box width={isScreenSm ? 'auto' : '100%'}>
          <Button
            variant="contained"
            onClick={handleAddNewRecord}
            style={{
              width: isScreenSm ? 'auto' : '100%',
              marginTop: isScreenSm ? 0 : 20,
            }}
          >
            {t<string>(
              'registrationJourney:employment_history.header.add_button',
            )}
          </Button>
        </Box>
      </Box>

      <Box>
        <Box mb={10}>
          <Box mb={3}>
            <Typography variant="subtitle2">
              {t<string>(
                'registrationJourney:employment_history.body.employment',
              )}
              &nbsp;({employmentTypeHistories.length})
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {employmentTypeHistories.map(
              (employmentHistory: EmploymentHistory) => {
                return (
                  <Grid key={employmentHistory.id} item xs={12} md={6} lg={4}>
                    <EmploymentHistoryCard
                      buttonText={t<string>(
                        'registrationJourney:employment_history.body.edit',
                      )}
                      employmentHistory={employmentHistory}
                      handleClick={() => handleClickEdit(employmentHistory)}
                      icon={<EditIcon />}
                    />
                  </Grid>
                );
              },
            )}
          </Grid>
        </Box>
        <Box mb={10}>
          <Box mb={3}>
            <Typography variant="subtitle2">
              {t<string>(
                'registrationJourney:employment_history.body.education',
              )}
              &nbsp;({educationTypeHistories.length})
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {educationTypeHistories.map(
              (employmentHistory: EmploymentHistory) => {
                return (
                  <Grid key={employmentHistory.id} item xs={12} md={6} lg={4}>
                    <EmploymentHistoryCard
                      buttonText={t<string>(
                        'registrationJourney:employment_history.body.edit',
                      )}
                      employmentHistory={employmentHistory}
                      handleClick={() => handleClickEdit(employmentHistory)}
                      icon={<EditIcon />}
                    />
                  </Grid>
                );
              },
            )}
          </Grid>
        </Box>
        <Box>
          <Box mb={3}>
            <Typography variant="subtitle2">
              {t<string>('registrationJourney:employment_history.body.others')}
              &nbsp;({otherTypeHistories.length})
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {otherTypeHistories.map((employmentHistory: EmploymentHistory) => {
              return (
                <Grid key={employmentHistory.id} item xs={12} md={6} lg={4}>
                  <EmploymentHistoryCard
                    buttonText={t<string>(
                      'registrationJourney:employment_history.body.edit',
                    )}
                    employmentHistory={employmentHistory}
                    handleClick={() => handleClickEdit(employmentHistory)}
                    icon={<EditIcon />}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>

      <Box
        mt={10}
        display="flex"
        justifyContent={isScreenSm ? 'flex-end' : 'space-between'}
        width="100%"
      >
        <Box mr={isScreenSm ? 3 : 0} width={isScreenSm ? 'auto' : '45%'}>
          <Button
            onClick={handleSaveProgress}
            variant="outlined"
            style={{
              width: isScreenSm ? 'auto' : '100%',
            }}
            disabled={isSubmitting}
          >
            {t<string>('registrationJourney:common.save_progress')}
          </Button>
        </Box>
        <Box width={isScreenSm ? 'auto' : '45%'}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{
              width: isScreenSm ? 'auto' : '100%',
            }}
            disabled={isSubmitting}
          >
            {t<string>('registrationJourney:common.submit')}
          </Button>
        </Box>
      </Box>

      <EmploymentHistoryModal
        isOpen={isDialogOpen}
        handleClose={handleClose}
        selectedEmploymentHistory={selectedEmploymentHistory}
      />
    </>
  );
};

export default React.memo(EmploymentHistories);

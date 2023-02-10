import CheckBox from 'gap-common/src/components/CheckBox';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { MessageParams } from 'yup/lib/types';

import { DEFAULT_INPUT_FIELD_MAX_CHARACTERS } from '../../../../constants/common';
import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
  GBG_VERIFICATION_PROCESS_MESSAGE_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch } from '../../../../redux/hooks';
import ProgressesService from '../../../../services/ProgressesService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import type { JobOption } from '../../RegistrationJourney';
import { getAccessToken } from '../../../../utils/localStorage';

interface UKRightToWorkForm {
  code: string;
  cantTakePhoto: string;
  files: any[];
  passports: any[];
}

const DEFAULT_FORM_VALUES: UKRightToWorkForm = {
  code: '',
  cantTakePhoto: '',
  files: [],
  passports: [],
};

interface UKRightToWorkProps {
  selectedJob: JobOption;
}

const UKRightToWork = (props: UKRightToWorkProps) => {
  const { selectedJob } = props;
  const accessToken = getAccessToken();
  const { isScreenSm, isScreenMd } = useBreakPoints();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const options = [
    {
      option: '',
      value: 'yes',
    },
  ];

  const showMaxCharactersMessage = (
    params: {
      max: number;
    } & MessageParams,
  ) =>
    t('validation:common.max_characters', {
      max: params.max,
    });

  const schema = Yup.object().shape({
    code: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
  });

  const form = useForm<UKRightToWorkForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.RIGHT_TO_WORK_PROOFS,
      {
        progress: status,
      },
      selectedJob.id,
    );

  const handleSaveProgress = () => {
    setIsSubmitting(true);
    updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS)
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

  const submitForm = (_data: UKRightToWorkForm) => {
    setIsSubmitting(true);
    updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED)
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
  const receiveMessage = (event: any) => {
    const startMessage =
      GBG_VERIFICATION_PROCESS_MESSAGE_TYPE.START_PROCESS_TO_GET_RESULT;
    if (event.data.message === startMessage) {
      setIsSubmitting(true);
    }
    const endMessage =
      GBG_VERIFICATION_PROCESS_MESSAGE_TYPE.END_PROCESS_TO_GET_RESULT;
    if (event.data.message === endMessage) {
      updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED)
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
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    window.addEventListener('message', receiveMessage, false);
    return () => window.removeEventListener('message', receiveMessage, false);
  }, []);

  const getSdkUrl = () => {
    const url = process.env.REACT_APP_VERIFICATION_PROCESS_SDK_URL;
    return url.concat('?token=').concat(accessToken);
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box
          mt={10}
          display="flex"
          alignItems={isScreenMd ? 'center' : 'flex-start'}
          justifyContent={isScreenMd ? 'space-between' : 'flex-start'}
          flexDirection={isScreenMd ? 'row' : 'column'}
        >
          <Box>
            <Typography variant="subtitle1">
              {t<string>('registrationJourney:right_to_work.body.photo.title')}
            </Typography>
            <Typography variant="subtitle2" color={CONTENT_COLOR}>
              {t<string>(
                'registrationJourney:right_to_work.body.photo.subtitle_1',
              )}
            </Typography>
            <Typography variant="subtitle2" color={CONTENT_COLOR}>
              {t<string>(
                'registrationJourney:right_to_work.body.photo.subtitle_2',
              )}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CheckBox
              form={form}
              row
              options={options}
              name="cantTakePhoto"
              $multiOption={false}
            />
            <Typography variant="subtitle2">
              {t<string>(
                'registrationJourney:right_to_work.body.photo.cant_take',
              )}
            </Typography>
          </Box>
        </Box>

        <Box
          mt={10}
          display="flex"
          alignItems={isScreenMd ? 'center' : 'flex-start'}
          justifyContent={isScreenMd ? 'space-between' : 'flex-start'}
          flexDirection={isScreenMd ? 'row' : 'column'}
        >
          <Box>
            <Typography variant="subtitle1">
              {t<string>(
                'registrationJourney:right_to_work.body.passport.title',
              )}
            </Typography>
            <Typography variant="subtitle2" color={CONTENT_COLOR}>
              {t<string>(
                'registrationJourney:right_to_work.body.passport.subtitle_1',
              )}
            </Typography>
            <Typography variant="subtitle2" color={CONTENT_COLOR}>
              {t<string>(
                'registrationJourney:right_to_work.body.passport.subtitle_2',
              )}
            </Typography>
          </Box>
        </Box>
        <Box mt={8}>
          <Typography variant="subtitle1">
            {t<string>('registrationJourney:right_to_work.header.title')}
          </Typography>
        </Box>

        <iframe
          src={getSdkUrl()}
          allow="camera;"
          height={600}
          width="100%"
          title="GBG"
        />

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
              disabled={isSubmitting}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:common.save_progress')}
            </Button>
          </Box>
          <Box width={isScreenSm ? 'auto' : '45%'}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              style={{
                width: isScreenSm ? 'auto' : '100%',
              }}
            >
              {t<string>('registrationJourney:common.submit')}
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default memo(UKRightToWork);

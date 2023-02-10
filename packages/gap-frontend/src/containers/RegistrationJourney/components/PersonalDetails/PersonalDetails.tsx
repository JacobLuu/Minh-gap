import DatePicker from 'gap-common/src/components/DatePicker';
import InputField from 'gap-common/src/components/InputField';
import InputPhone from 'gap-common/src/components/InputPhone';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';

import InputSelectField from 'gap-common/src/components/InputSelectField';
import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { top } from '@popperjs/core';
import type { MessageParams } from 'yup/lib/types';

import { DEFAULT_INPUT_FIELD_MAX_CHARACTERS } from '../../../../constants/common';
import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import MeService from '../../../../services/MeService';
import ProgressesService from '../../../../services/ProgressesService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getMeRequest, selectLoginSlice } from '../../../Login/reducer';
import { getProgressesRequest } from '../../reducers/progresses';
import type { JobOption } from '../../RegistrationJourney';

const titles = [
  { label: 'Mr', value: 'mr' },
  { label: 'Mrs', value: 'mrs' },
  { label: 'Miss', value: 'miss' },
];

interface PersonalDetailsForm {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
}

const DEFAULT_FORM_VALUES: PersonalDetailsForm = {
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: null,
  email: '',
  phoneNumber: '',
};

interface PersonalDetailsProps {
  selectedJob: JobOption;
}

const PersonalDetails = (props: PersonalDetailsProps) => {
  const { selectedJob } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isScreenSm, isScreenMd } = useBreakPoints();
  const { userProfile } = useAppSelector(selectLoginSlice);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showMaxCharactersMessage = (
    params: {
      max: number;
    } & MessageParams,
  ) =>
    t('validation:common.max_characters', {
      max: params.max,
    });

  const schema = Yup.object().shape({
    title: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    firstName: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    middleName: Yup.string()
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage)
      .nullable(),
    lastName: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    dateOfBirth: Yup.date().typeError(t('validation:common.required')),
    email: Yup.string()
      .required(t('validation:common.required'))
      .email(t('validation:common.email'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    phoneNumber: Yup.string().test((value, { path, createError }) => {
      if (!isValidPhoneNumber(String(value))) {
        return createError({
          path,
          message: t('validation:common.phone_number'),
        });
      }
      return true;
    }),
  });

  const form = useForm<PersonalDetailsForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const createPayload = (data: PersonalDetailsForm) => {
    let parsedPhoneNumber = null;
    try {
      parsedPhoneNumber = parsePhoneNumberWithError(data.phoneNumber);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return {
      title: data.title,
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      email: data.email,
      date_of_birth: data.dateOfBirth,
      phone_number: parsedPhoneNumber?.number || '',
      phone_number_country_code: parsedPhoneNumber?.countryCallingCode || '',
      contact_date: userProfile.contact_dates,
      contact_time: userProfile.contact_times,
      right_to_work_status: userProfile.right_to_work_status,
    };
  };

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) => {
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.PERSONAL_DETAILS,
      {
        progress: status,
      },
      selectedJob.id,
    )
      .then(() => {
        dispatch(
          getProgressesRequest({
            jobId: selectedJob.id,
          }),
        );
      })
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
      });
  };

  const submitForm = (data: PersonalDetailsForm) => {
    setIsSubmitting(true);
    const payload = createPayload(data);
    MeService.updateMe(payload)
      .then(() => updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED))
      .then(() => {
        dispatch(getMeRequest());
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

  const handleSaveProgress = () => {
    setIsSubmitting(true);
    const data = form.getValues();
    const payload = createPayload(data);
    MeService.updateMe(payload)
      .then(() =>
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS),
      )
      .then(() => {
        dispatch(getMeRequest());
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

  useEffect(() => {
    dispatch(getMeRequest());
  }, []);

  useEffect(() => {
    if (userProfile) {
      form.reset({
        title: userProfile.title || DEFAULT_FORM_VALUES.title,
        firstName: userProfile.first_name || DEFAULT_FORM_VALUES.firstName,
        middleName: userProfile.middle_name || DEFAULT_FORM_VALUES.middleName,
        lastName: userProfile.last_name || DEFAULT_FORM_VALUES.lastName,
        dateOfBirth: userProfile.date_of_birth
          ? new Date(userProfile.date_of_birth)
          : DEFAULT_FORM_VALUES.dateOfBirth,
        email: userProfile.email || DEFAULT_FORM_VALUES.email,
        phoneNumber: userProfile.phone_number
          ? userProfile.phone_number
          : DEFAULT_FORM_VALUES.phoneNumber,
      });
    }
  }, [userProfile]);

  return (
    <>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box mb={8}>
          <Typography variant="subtitle1">
            {t<string>('registrationJourney:personal_details.header.title')}
          </Typography>
          <Typography
            variant="subtitle2"
            color={CONTENT_COLOR}
            fontWeight={400}
          >
            {t<string>('registrationJourney:personal_details.header.subtitle')}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Box mb={6}>
            <InputSelectField
              name="title"
              label={t('registrationJourney:personal_details.body.title')}
              placeholder={t('registrationJourney:personal_details.body.title')}
              required
              form={form}
              options={titles}
              sx={{ width: '100%' }}
            />
          </Box>

          <Box mb={6}>
            <Grid container justifyContent="space-between">
              <Grid item xs={12} md={3.75}>
                <InputField
                  form={form}
                  name="firstName"
                  label={t(
                    'registrationJourney:personal_details.body.first_name',
                  )}
                  placeholder={t(
                    'registrationJourney:personal_details.body.first_name',
                  )}
                  required
                />
              </Grid>
              <Grid item xs={12} md={3.75} mt={isScreenMd ? 0 : 6}>
                <InputField
                  form={form}
                  name="middleName"
                  label={t(
                    'registrationJourney:personal_details.body.middle_name',
                  )}
                  placeholder={t(
                    'registrationJourney:personal_details.body.middle_name',
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3.75} mt={isScreenMd ? 0 : 6}>
                <InputField
                  form={form}
                  name="lastName"
                  label={t(
                    'registrationJourney:personal_details.body.last_name',
                  )}
                  placeholder={t(
                    'registrationJourney:personal_details.body.last_name',
                  )}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Box mb={6}>
            <Grid container justifyContent="space-between">
              <Grid item xs={12} md={5.75}>
                <InputField
                  form={form}
                  name="email"
                  label={t('registrationJourney:personal_details.body.email')}
                  placeholder={t(
                    'registrationJourney:personal_details.body.email',
                  )}
                  required
                />
              </Grid>
              <Grid item xs={12} md={5.75} mt={isScreenMd ? 0 : 6}>
                <InputPhone
                  required
                  name="phoneNumber"
                  defaultCountry="gb"
                  label={t(
                    'registrationJourney:personal_details.body.phone_number',
                  )}
                  placeholder={t(
                    'registrationJourney:personal_details.body.phone_number',
                  )}
                  form={form}
                />
              </Grid>
            </Grid>
          </Box>

          <Box mb={6}>
            <DatePicker
              form={form}
              name="dateOfBirth"
              label={t(
                'registrationJourney:personal_details.body.date_of_birth',
              )}
              placeholder={t(
                'registrationJourney:personal_details.body.date_of_birth',
              )}
              required
              disabled={false}
              popperPlacement={top}
              maxDate={new Date()}
            />
          </Box>
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

export default memo(PersonalDetails);

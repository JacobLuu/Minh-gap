import InputField from 'gap-common/src/components/InputField';
import InputPhone from 'gap-common/src/components/InputPhone';
import { CONTENT_COLOR } from 'gap-common/src/themes/Colors';
import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';

import { REQUEST_STATUS } from '../../../../constants/common';
import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import ProgressesService from '../../../../services/ProgressesService';
import { setErrorMessages } from '../../../Global/reducer';
import {
  getEmergencyContactRequest,
  selectMeEmergencyContactSlice,
  updateEmergencyContactRequest,
} from '../../reducers/meEmergencyContact';
import { useBreakPoints } from '../../../../utils/customHooks';
import { getProgressesRequest } from '../../reducers/progresses';
import type { JobOption } from '../../RegistrationJourney';

export interface EmergencyContactForm {
  firstName: string;
  middleName: string;
  lastName: string;
  relationship: string;
  email: string;
  phoneNumber: string;
}

interface EmergencyContactProps {
  selectedJob: JobOption;
}

const EmergencyContact = (props: EmergencyContactProps) => {
  const { selectedJob } = props;
  const { t } = useTranslation();
  const { isScreenSm } = useBreakPoints();

  const [isInSubmitMode, setIsInSubmitMode] = useState(false);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { emergencyContact, updateEmergencyContactStatus } = useAppSelector(
    selectMeEmergencyContactSlice,
  );

  const schema = Yup.object().shape({
    firstName: Yup.string().required(t('common.validation.firstName.required')),
    middleName: Yup.string(),
    lastName: Yup.string().required(t('common.validation.lastName.required')),
    relationship: Yup.string().required(
      t('common.validation.relationship.required'),
    ),
    email: Yup.string()
      .email(t('common.validation.email.invalid_format'))
      .required(t('common.validation.email.required')),
    phoneNumber: Yup.string()
      .required(t('common.validation.phoneNumber.required'))
      .test((value, { path, createError }) => {
        if (!isValidPhoneNumber(String(value))) {
          return createError({
            path,
            message: t('common.validation.phoneNumber.invalid_format'),
          });
        }
        return true;
      }),
  });

  const form = useForm<EmergencyContactForm>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      relationship: '',
      email: '',
      phoneNumber: '',
    },
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.EMERGENCY_CONTACT,
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

  const createPayload = (data: EmergencyContactForm) => {
    let parsedPhoneNumber = null;
    try {
      parsedPhoneNumber = parsePhoneNumberWithError(data.phoneNumber);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return {
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      relationship: data.relationship,
      email: data.email?.toLowerCase(),
      phone_number: parsedPhoneNumber?.number || '',
      phone_number_country_code: parsedPhoneNumber?.countryCallingCode || '',
    };
  };

  const submitForm = (data: EmergencyContactForm) => {
    setIsInSubmitMode(true);
    const payload = createPayload(data);
    dispatch(updateEmergencyContactRequest(payload));
  };

  const handleSaveProgress = () => {
    setIsInSubmitMode(false);
    const data = form.getValues();
    const payload = createPayload(data);
    dispatch(updateEmergencyContactRequest(payload));
  };

  useEffect(() => {
    dispatch(getEmergencyContactRequest());
  }, []);

  useEffect(() => {
    form.reset({
      firstName: emergencyContact?.first_name || '',
      middleName: emergencyContact?.middle_name || '',
      lastName: emergencyContact?.last_name || '',
      relationship: emergencyContact?.relationship || '',
      email: emergencyContact?.email || '',
      phoneNumber: emergencyContact?.phone_number || '',
    });
  }, [emergencyContact]);

  useEffect(() => {
    if (updateEmergencyContactStatus === REQUEST_STATUS.REQUESTING) {
      setOnSubmitLoading(true);
    } else if (updateEmergencyContactStatus === REQUEST_STATUS.SUCCESS) {
      if (isInSubmitMode) {
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED);
      } else {
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS);
      }
      setOnSubmitLoading(false);
    } else if (updateEmergencyContactStatus === REQUEST_STATUS.ERROR) {
      setOnSubmitLoading(false);
    }
  }, [updateEmergencyContactStatus]);

  return (
    <>
      <Box mb={8}>
        <Typography variant="subtitle1">
          {t<string>('registrationJourney:emergency_contact.header.title')}
        </Typography>
        <Typography variant="subtitle2" color={CONTENT_COLOR} fontWeight={400}>
          {t<string>('registrationJourney:emergency_contact.header.subtitle')}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <form noValidate onSubmit={form.handleSubmit(submitForm)}>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid container spacing={{ xs: 2 }}>
              <Grid item xs={12} md={4} mb={6}>
                <InputField
                  required
                  name="firstName"
                  label="First name"
                  placeholder="First name"
                  form={form}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} md={4} mb={6}>
                <InputField
                  name="middleName"
                  label="Middle name (Optional)"
                  placeholder="Middle name"
                  form={form}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} md={4} mb={6}>
                <InputField
                  required
                  name="lastName"
                  label="Last name"
                  placeholder="Last name"
                  form={form}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} md={12} mb={6}>
                <InputField
                  required
                  name="relationship"
                  label="Relationship"
                  placeholder="Enter a relationship"
                  form={form}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} md={12} mb={6}>
                <InputPhone
                  required
                  name="phoneNumber"
                  label="Phone number"
                  defaultCountry="gb"
                  placeholder="Enter your phone number"
                  form={form}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} md={12} mb={6}>
                <InputField
                  required
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter contact email"
                  form={form}
                  disabled={false}
                />
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} />
            <Grid item xs={12} md={6} alignItems="flex-end">
              <Box
                mt={6}
                display="flex"
                justifyContent={isScreenSm ? 'flex-end' : 'space-between'}
                width="100%"
              >
                <Box
                  mr={isScreenSm ? 3 : 0}
                  width={isScreenSm ? 'auto' : '45%'}
                >
                  <Button
                    onClick={handleSaveProgress}
                    variant="outlined"
                    disabled={onSubmitLoading}
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
                    disabled={onSubmitLoading}
                    data-test="btn-submit"
                    style={{
                      width: isScreenSm ? 'auto' : '100%',
                    }}
                  >
                    {t<string>('registrationJourney:common.submit')}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default memo(EmergencyContact);

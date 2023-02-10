import DatePicker from 'gap-common/src/components/DatePicker';
import InputField from 'gap-common/src/components/InputField';
import InputSelectField from 'gap-common/src/components/InputSelectField';
import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { top } from '@popperjs/core';

import type { MessageParams } from 'yup/lib/types';
import { DEFAULT_INPUT_FIELD_MAX_CHARACTERS } from '../../../../constants/common';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import MeService from '../../../../services/MeService';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';
import { getMeRequest, selectLoginSlice } from '../../../Login/reducer';

interface ProfileForm {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: Date;
}

const titles = [
  { label: 'Mr', value: 'mr' },
  { label: 'Mrs', value: 'mrs' },
  { label: 'Miss', value: 'miss' },
];

const DEFAULT_FORM_VALUES: ProfileForm = {
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: null,
};

const BasicInformation = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userProfile } = useAppSelector(selectLoginSlice);

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
      .trim(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    middleName: Yup.string()
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage)
      .nullable(),
    lastName: Yup.string()
      .required(t('validation:common.required'))
      .trim(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    dateOfBirth: Yup.date().typeError(t('validation:common.required')),
  });

  const form = useForm<ProfileForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const submitForm = (data: ProfileForm) => {
    MeService.updateMe({
      ...userProfile,
      title: data.title,
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      date_of_birth: data.dateOfBirth,
    })
      .then(() => {
        dispatch(getMeRequest());
        dispatch(setSuccessMessages(['Update profile successful']));
      })
      .catch((error: unknown) => {
        dispatch(setErrorMessages([error]));
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
      });
    }
  }, [userProfile]);

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <Grid container rowSpacing={6}>
        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <InputSelectField
            name="title"
            label={t('profile.information_tab.title')}
            placeholder={t('profile.information_tab.title')}
            required
            form={form}
            options={titles}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item md={2} />

        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <InputField
            form={form}
            name="firstName"
            label={t('profile.information_tab.first_name')}
            placeholder={t('profile.information_tab.first_name')}
            required
          />
        </Grid>
        <Grid item md={2} />

        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <InputField
            form={form}
            name="middleName"
            label={t('profile.information_tab.middle_name')}
            placeholder={t('profile.information_tab.middle_name_placeholder')}
          />
        </Grid>
        <Grid item md={2} />

        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <InputField
            form={form}
            name="lastName"
            label={t('profile.information_tab.last_name')}
            placeholder={t('profile.information_tab.last_name')}
            required
          />
        </Grid>
        <Grid item md={2} />

        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <DatePicker
            form={form}
            name="dateOfBirth"
            label={t('profile.information_tab.date_of_birth')}
            placeholder={t('profile.information_tab.date_of_birth')}
            required
            disabled={false}
            popperPlacement={top}
            maxDate={new Date()}
          />
        </Grid>
        <Grid item md={2} />
      </Grid>

      <Box display="flex" justifyContent="center" mt={8}>
        <Button type="submit" variant="contained">
          {t<string>('profile.actions.save')}
        </Button>
      </Box>
    </form>
  );
};

export default memo(BasicInformation);

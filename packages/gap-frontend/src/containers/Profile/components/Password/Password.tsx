import axios from 'axios';
import InputFieldPassword from 'gap-common/src/components/InputFieldPassword';
import * as Validation from 'gap-common/src/constants/validation';
import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useAppDispatch } from '../../../../redux/hooks';
import MeService from '../../../../services/MeService';
import { isStatusResponse } from '../../../../types/guards';
import { setErrorMessages, setSuccessMessages } from '../../../Global/reducer';

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmedPassword: string;
}

const DEFAULT_FORM_VALUES: ChangePasswordForm = {
  currentPassword: '',
  newPassword: '',
  confirmedPassword: '',
};

const Password = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const schema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(Validation.PASSWORD_MIN_LENGTH)
      .test('hasUpperCase', t('validation:common.password'), (value) =>
        Validation.PASSWORD_CAPITAL_CHARACTER_REGEX.test(value),
      )
      .test('hasNumber', t('validation:common.password'), (value) =>
        Validation.PASSWORD_NUMBER_REGEX.test(value),
      ),
    newPassword: Yup.string()
      .min(Validation.PASSWORD_MIN_LENGTH)
      .test('hasUpperCase', t('validation:common.password'), (value) =>
        Validation.PASSWORD_CAPITAL_CHARACTER_REGEX.test(value),
      )
      .test('hasNumber', t('validation:common.password'), (value) =>
        Validation.PASSWORD_NUMBER_REGEX.test(value),
      ),
    confirmedPassword: Yup.string().test({
      name: 'confirmedPassword',
      test: (confirmedPassword, context) => {
        const { newPassword } = context.parent;
        return confirmedPassword === newPassword;
      },
      message: t('validation:common.repeat_password'),
    }),
  });

  const form = useForm<ChangePasswordForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && isStatusResponse(error.response.data)) {
      dispatch(
        setErrorMessages(
          error.response.data.errors.map((error) => error.message),
        ),
      );
    } else {
      dispatch(setErrorMessages([error]));
    }
  };

  const submitForm = (data: ChangePasswordForm) => {
    MeService.updatePassword({
      current_password: data.currentPassword,
      new_password: data.newPassword,
    })
      .then(() => {
        dispatch(setSuccessMessages(['Update password successfully.']));
        form.reset();
      })
      .catch(handleError);
  };

  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <Grid container rowSpacing={2}>
        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <InputFieldPassword
            form={form}
            name="currentPassword"
            label={t('profile.password_tab.current_password')}
            placeholder={t('profile.password_tab.current_password')}
          />
        </Grid>
        <Grid item md={2} />

        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <InputFieldPassword
            form={form}
            name="newPassword"
            label={t('profile.password_tab.new_password')}
            placeholder={t('profile.password_tab.new_password')}
          />
        </Grid>
        <Grid item md={2} />

        <Grid item md={2} />
        <Grid item xs={12} md={8}>
          <InputFieldPassword
            form={form}
            name="confirmedPassword"
            label={t('profile.password_tab.confirm_password')}
            placeholder={t('profile.password_tab.confirm_password')}
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

export default memo(Password);

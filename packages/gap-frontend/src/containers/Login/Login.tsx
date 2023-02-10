import logoImg from 'gap-common/src/assets/images/logo_mark.svg';
import InputField from 'gap-common/src/components/InputField';
import InputFieldPassword from 'gap-common/src/components/InputFieldPassword';
import React, { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Link, Typography } from '@mui/material';

import SelectLanguage from '../../components/SelectLanguage';
import CLIENT_PATH from '../../constants/clientPath';
import { REQUEST_STATUS } from '../../constants/common';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { BLACK_COLOR, WHITE_COLOR } from '../../themes/Colors';
import { useBreakPoints } from '../../utils/customHooks';
import history from '../../utils/history';
import {
  clearInitialState,
  getMeRequest,
  loginRequest,
  selectLoginSlice,
} from './reducer';
import { Wrapper } from './style';

interface ILoginInputs {
  email: string;
  password: string;
}

function Login() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const { isScreenSm } = useBreakPoints();

  const handleChangeLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t('common.validation.email.invalid_format'))
      .required(t('common.validation.email.required')),
    password: Yup.string().required(t('common.validation.password.required')),
  });

  const form = useForm<ILoginInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const { loginStatus, loginMessage, getMeStatus, userProfile } =
    useAppSelector(selectLoginSlice);

  useEffect(() => {
    if (loginStatus === REQUEST_STATUS.REQUESTING) {
      setOnSubmitLoading(true);
    } else if (loginStatus === REQUEST_STATUS.SUCCESS) {
      setOnSubmitLoading(false);
      dispatch(getMeRequest());
    } else {
      setOnSubmitLoading(false);
      if (loginMessage) {
        form.setError('email', {
          type: 'value',
          types: { key: 'value', result: '' },
        });
        form.setError('password', {
          type: 'value',
          types: { key: 'value', result: '' },
        });
      }
    }
  }, [loginStatus]);

  useEffect(() => {
    if (getMeStatus === REQUEST_STATUS.SUCCESS) {
      if (userProfile && userProfile.first_name) {
        // if user already updated profile in get-started page so redirect to next page
        history.replace(CLIENT_PATH.REGISTRATION_JOURNEY);
      } else {
        history.replace(CLIENT_PATH.GETSTARTED);
      }
    }
  }, [getMeStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearInitialState());
    };
  }, []);

  const handleSubmit = (data: ILoginInputs) => {
    dispatch(
      loginRequest({
        email: data.email.toLowerCase(),
        password: data.password,
      }),
    );
  };

  return (
    <Wrapper>
      <Box
        my={10}
        p={isScreenSm ? 3 : 4}
        py={isScreenSm ? 3 : 10}
        width="80%"
        maxWidth={460}
        borderRadius={5}
        bgcolor={WHITE_COLOR}
      >
        <Box display="flex" justifyContent="center">
          <img src={logoImg} alt="logo" width={79} height={79} />
        </Box>
        <Box mt={isScreenSm ? 2.5 : 5} display="flex" justifyContent="center">
          <Typography variant="h4">{t<string>('login.header')}</Typography>
        </Box>
        <Box
          mt={isScreenSm ? 2 : 4}
          mb={isScreenSm ? 0 : 4}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography
            variant="subtitle2"
            sx={{ textAlign: 'center' }}
            color={BLACK_COLOR}
          >
            {t<string>('login.welcome_message')}
          </Typography>
        </Box>
        <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
          <Box mt={2.5}>
            <InputField
              form={form}
              name="email"
              label={t<string>('login.form.email.label')}
              placeholder={t<string>('login.form.email.placeholder')}
              style={{ marginBottom: 24 }}
            />
          </Box>
          <Box>
            <InputFieldPassword
              form={form}
              name="password"
              label={t<string>('login.form.password.label')}
              placeholder={t<string>('login.form.password.placeholder')}
            />
          </Box>
          <Box display="flex" justifyContent="center">
            <Link
              variant="body3"
              color={BLACK_COLOR}
              to={CLIENT_PATH.FORGOT_PASSWORD}
              underline="none"
              component={RouterLink}
              data-test="forgot-password-link"
            >
              {t<string>('login.forgot_password_question')}
            </Link>
          </Box>
          <Box mt={2.5} display="flex" justifyContent="center">
            <Button
              variant="login"
              type="submit"
              disabled={onSubmitLoading}
              startIcon={
                onSubmitLoading && (
                  <CircularProgress size={14} color="secondary" />
                )
              }
            >
              {t<string>('login.form.button_login')}
            </Button>
          </Box>
        </form>

        <Box
          mt={isScreenSm ? 2.5 : 5}
          display="flex"
          justifyContent="center"
          flexDirection={isScreenSm ? 'row' : 'column'}
          alignItems="center"
        >
          <Typography pr={1} variant="body3" color={BLACK_COLOR}>
            {t<string>('login.dont_have_account_question')}{' '}
          </Typography>

          <Link
            variant="body3"
            to={CLIENT_PATH.CREATE_ACCOUNT}
            underline="none"
            component={RouterLink}
            data-test="create-new-account-link"
          >
            {t<string>('login.create_new_account')}
          </Link>
        </Box>
        <Box mt={6} display="flex" alignItems="center" justifyContent="center">
          <SelectLanguage
            language={language}
            handleOnChange={handleChangeLanguage}
          />
        </Box>
      </Box>
    </Wrapper>
  );
}

export default memo(Login);

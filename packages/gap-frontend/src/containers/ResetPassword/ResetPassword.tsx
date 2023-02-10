import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Box, Button, CircularProgress, FormHelperText } from '@mui/material';
import { ReactComponent as CheckCircleIcon } from 'gap-common/src/assets/images/icon_check.svg';
import { Link } from 'react-router-dom';
import { PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import InputFieldPassword from 'gap-common/src/components/InputFieldPassword';
import Dialog from 'gap-common/src/components/Dialog';
import * as Validation from 'gap-common/src/constants/validation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { REQUEST_STATUS } from '../../constants/common';
import AccessLayout from '../AccessLayout';
import {
  resetPasswordRequest,
  selectResetPasswordSlice,
  clearAPIMessage,
  verifyTokenRequest,
  clearInitialState,
} from './reducer';
import history from '../../utils/history';
import CLIENT_PATH from '../../constants/clientPath';
import useDidMountEffect from '../../utils/useDidMountEffect';
import { getParameterByName } from '../../utils';
import SelectLanguage from '../../components/SelectLanguage';

export interface IResetPassword {
  password: string;
  repeatPassword: string;
}

function ResetPasswordPage() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);

  const handleChangeLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(Validation.PASSWORD_MIN_LENGTH)
      .test('hasUpperCase', (value) =>
        Validation.PASSWORD_CAPITAL_CHARACTER_REGEX.test(value),
      )
      .test('hasNumber', (value) =>
        Validation.PASSWORD_NUMBER_REGEX.test(value),
      ),
    repeatPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      t('common.validation.repeat_password.not_match'),
    ),
  });

  const form = useForm<IResetPassword>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    criteriaMode: 'all',
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const passwordValidateCriteria = [
    { type: 'min', message: t('common.validation.password.min') },
    {
      type: 'hasUpperCase',
      message: t('common.validation.password.capital_required'),
    },
    {
      type: 'hasNumber',
      message: t('common.validation.password.number_required'),
    },
  ];

  const { trigger } = form;

  const password = useWatch({
    control: form.control,
    name: 'password',
  });

  useDidMountEffect(() => {
    trigger('repeatPassword');
  }, [password, trigger]);

  const dispatch = useAppDispatch();

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { resetPasswordStatus, verifyTokenStatus, resetPasswordMessage } =
    useAppSelector(selectResetPasswordSlice);

  const location = useLocation();
  const token = getParameterByName('token', location.search);

  const handleSubmit = (data: any) => {
    dispatch(
      resetPasswordRequest({
        password: data.password,
        token,
      }),
    );
  };

  useEffect(() => {
    if (resetPasswordStatus === REQUEST_STATUS.REQUESTING) {
      setOnSubmitLoading(true);
    } else {
      setOnSubmitLoading(false);
    }
    if (resetPasswordStatus === REQUEST_STATUS.SUCCESS) {
      form.setValue('password', '');
      form.setValue('repeatPassword', '');
      setIsOpenDialog(true);
    }

    return () => {
      dispatch(clearInitialState());
    };
  }, [resetPasswordStatus]);

  useEffect(() => {
    if (verifyTokenStatus === REQUEST_STATUS.REQUESTING) {
      setOnSubmitLoading(true);
    } else {
      setOnSubmitLoading(false);
    }
  }, [verifyTokenStatus]);

  useEffect(() => {
    if (!token) {
      history.push(CLIENT_PATH.LOGIN);
    }
    dispatch(
      verifyTokenRequest({
        token,
      }),
    );
    dispatch(clearAPIMessage());
  }, []);

  return (
    <AccessLayout
      scrollToTop
      title={t<string>('reset_password.header')}
      subTitle={t<string>('reset_password.sub_header')}
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InputFieldPassword
          name="password"
          label={t<string>('reset_password.form.password.label')}
          placeholder={t<string>('reset_password.form.password.placeholder')}
          form={form}
          showValidateCriteria
          validateCriterias={passwordValidateCriteria}
          onChange={() => {
            dispatch(clearAPIMessage());
          }}
        />

        <InputFieldPassword
          name="repeatPassword"
          label={t<string>('reset_password.form.repeat_password.label')}
          placeholder={t<string>(
            'reset_password.form.repeat_password.placeholder',
          )}
          form={form}
          onChange={() => {
            dispatch(clearAPIMessage());
          }}
        />

        <FormHelperText className="text_error" error>
          {resetPasswordMessage}
        </FormHelperText>

        <Button
          type="submit"
          disabled={onSubmitLoading}
          fullWidth
          variant="contained"
          color="primary"
          data-test="btn-submit"
          startIcon={
            onSubmitLoading && <CircularProgress size={14} color="secondary" />
          }
          style={{ marginTop: 4 }}
        >
          {t<string>('reset_password.form.button_reset_password')}
        </Button>
      </form>
      <Box className="link_redirect">
        {t<string>('reset_password.remember_password_question')}{' '}
        <Link to={CLIENT_PATH.LOGIN}>
          {t<string>('reset_password.login_message')}
        </Link>
      </Box>
      <Dialog
        maxWidth="md"
        isOpenDialog={isOpenDialog}
        title={t<string>('reset_password.dialog.title')}
        isContentAlignCenter
        urlIcon={
          <CheckCircleIcon width="104px" height="104px" fill={PRIMARY_COLOR} />
        }
      >
        <div className="description" data-test="reset-password-success">
          <p>{t<string>('reset_password.dialog.description')}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            name="submit"
            variant="contained"
            fullWidth
            onClick={() => setIsOpenDialog(false)}
            component={Link}
            to={CLIENT_PATH.LOGIN}
            data-test="btn-login-now"
            disabled={onSubmitLoading}
          >
            {t<string>('reset_password.login_message')}
          </Button>
        </div>
      </Dialog>

      <SelectLanguage
        language={language}
        handleOnChange={handleChangeLanguage}
      />
    </AccessLayout>
  );
}

export default ResetPasswordPage;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormHelperText,
  CircularProgress,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import InputField from 'gap-common/src/components/InputField';
import Dialog from 'gap-common/src/components/Dialog';
import { ReactComponent as IconEmail } from 'gap-common/src/assets/images/icon_email.svg';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { REQUEST_STATUS } from '../../constants/common';
import {
  forgotPasswordRequest,
  selectForgotPasswordSlice,
  clearInitialState,
} from './reducer';
import AccessLayout from '../AccessLayout';
import SelectLanguage from '../../components/SelectLanguage';

interface IForgotPassword {
  email: string;
}

function ForgotPasswordPage() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);

  const handleChangeLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(t('common.validation.email.invalid_format'))
      .required(t('common.validation.email.required')),
  });

  const form = useForm<IForgotPassword>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const dispatch = useAppDispatch();

  const { forgotPasswordStatus, forgotPasswordMessage } = useAppSelector(
    selectForgotPasswordSlice,
  );

  const handleSubmit = (data: IForgotPassword) => {
    dispatch(
      forgotPasswordRequest({
        email: data.email?.toLowerCase(),
      }),
    );
  };

  useEffect(() => {
    setOnSubmitLoading(forgotPasswordStatus === REQUEST_STATUS.REQUESTING);
    if (forgotPasswordStatus === REQUEST_STATUS.SUCCESS) {
      form.setValue('email', '');
      setIsOpenDialog(true);
    }
  }, [forgotPasswordStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearInitialState());
    };
  }, []);

  return (
    <AccessLayout
      scrollToTop
      title={t('forgot_password.header')}
      subTitle={t('forgot_password.sub_header')}
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InputField
          type="email"
          name="email"
          label={t('forgot_password.form.email.label')}
          placeholder={t('forgot_password.form.email.placeholder')}
          form={form}
          disabled={false}
          style={{ marginBottom: 24 }}
          data-test="input-email"
        />

        <FormHelperText
          className="text_error"
          error
          data-test="text-error-message"
        >
          {forgotPasswordMessage}
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
          {t<string>('forgot_password.form.button_submit')}
        </Button>
      </form>
      <Dialog
        maxWidth="md"
        isOpenDialog={isOpenDialog}
        title={t<string>('forgot_password.dialog.header')}
        isContentAlignCenter
        urlIcon={<IconEmail width="104px" height="104px" />}
      >
        <Box className="description">
          <Typography data-test="forgot-password-success">
            {t<string>('forgot_password.dialog.description')}
          </Typography>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="primary"
            variant="outlined"
            fullWidth
            onClick={() => setIsOpenDialog(false)}
          >
            Close
          </Button>
        </Box>
      </Dialog>
      <SelectLanguage
        language={language}
        handleOnChange={handleChangeLanguage}
      />
    </AccessLayout>
  );
}

export default ForgotPasswordPage;

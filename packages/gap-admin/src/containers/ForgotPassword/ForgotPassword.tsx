import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'gap-common/src/components/InputField';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from 'gap-common/src/components/Dialog';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { REQUEST_STATUS } from '../../constants/common';
import {
  forgotPasswordRequest,
  selectForgotPasswordSlice,
  clearInitialState,
} from './reducer';
import AccessLayout from '../AccessLayout';
import {
  getCachedUrl,
  isHavingToken,
  removeCachedUrl,
} from '../../utils/localStorage';
import history from '../../utils/history';
import CLIENT_PATH from '../../constants/clientPath';
import Images from '../../assets/images';

interface IForgotPassword {
  email: string;
}

function ForgotPasswordPage() {
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('This field must a valid email address')
      .required('Email is a required field'),
  });

  const form = useForm<IForgotPassword>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();

  const { forgotPasswordStatus, forgotPasswordMessage } = useAppSelector(
    selectForgotPasswordSlice,
  );

  const checkAndNavigate = () => {
    if (isHavingToken()) {
      const cachedUrl = getCachedUrl();
      if (cachedUrl) {
        history.replace(cachedUrl);
        removeCachedUrl();
      } else {
        history.replace(CLIENT_PATH.ROOT);
      }
    }
  };

  const handleSubmit = (data) => {
    dispatch(
      forgotPasswordRequest({
        email: data.email.toLowerCase(),
      }),
    );
  };

  useEffect(() => {
    checkAndNavigate();
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
      title="Forgot your password?"
      subTitle="Enter the email associated with your account and we will send you an email with instructions to reset your password"
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InputField
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          form={form}
          disabled={false}
          style={{ marginBottom: 24 }}
        />

        <FormHelperText className="text_error" error>
          {forgotPasswordMessage}
        </FormHelperText>

        <Button
          type="submit"
          disabled={onSubmitLoading}
          fullWidth
          variant="contained"
          color="primary"
          startIcon={
            onSubmitLoading && <CircularProgress size={14} color="secondary" />
          }
          style={{ marginTop: 4 }}
        >
          Submit
        </Button>
      </form>
      <Box className="link_redirect">
        Remember your password?
        <Link to={CLIENT_PATH.LOGIN}> Login now</Link>
      </Box>
      <Dialog
        maxWidth="391px"
        isContentAlignCenter
        isOpenDialog={isOpenDialog}
        title="Check your email"
        urlIcon={
          <img
            className="urlIcon"
            src={Images.icon_email}
            width="104px"
            height="104px"
            alt="Dialog icon"
          />
        }
      >
        <div className="description">
          <p>We have sent password reset instructions to your email</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            color="primary"
            variant="outlined"
            fullWidth
            onClick={() => setIsOpenDialog(false)}
          >
            Close
          </Button>
        </div>
      </Dialog>
    </AccessLayout>
  );
}

export default ForgotPasswordPage;

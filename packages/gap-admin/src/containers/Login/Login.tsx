import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from 'gap-common/src/components/InputField';
import InputFieldPassword from 'gap-common/src/components/InputFieldPassword';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { REQUEST_STATUS } from '../../constants/common';
import {
  getActionLoginRequest,
  clearInitialState,
  selectLoginSlice,
} from './reducer';
import AccessLayout from '../AccessLayout';
import {
  getCachedUrl,
  isHavingToken,
  removeCachedUrl,
} from '../../utils/localStorage';
import history from '../../utils/history';
import CLIENT_PATH from '../../constants/clientPath';

interface ILoginInputs {
  email: string;
  password: string;
}

function LoginPage() {
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('This field must a valid email address')
      .required('Email is a required field'),
    password: Yup.string().required('Password is a required field'),
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

  const { loginStatus, accountInfoStatus } = useAppSelector(selectLoginSlice);

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
    dispatch(getActionLoginRequest(data));
  };

  useEffect(() => {
    if (
      loginStatus === REQUEST_STATUS.SUCCESS &&
      accountInfoStatus === REQUEST_STATUS.SUCCESS
    ) {
      checkAndNavigate();
      window.location.reload(false);
    }
    setOnSubmitLoading(loginStatus === REQUEST_STATUS.REQUESTING);
  }, [loginStatus, accountInfoStatus]);

  useEffect(() => {
    checkAndNavigate();

    return () => {
      dispatch(clearInitialState());
    };
  }, []);

  return (
    <AccessLayout
      title="Login"
      subTitle="Welcome to gap personnel Administration"
      scrollToTop
    >
      <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          form={form}
          disabled={false}
          style={{ marginBottom: 24 }}
        />

        <InputFieldPassword
          name="password"
          label="Password"
          placeholder="Enter your password"
          form={form}
        />

        <Button
          type="submit"
          disabled={onSubmitLoading}
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: 24 }}
        >
          Login
        </Button>
      </form>
      <Box className="link_redirect">
        <Link to={CLIENT_PATH.FORGOT_PASSWORD}>Forgot your password?</Link>
      </Box>
    </AccessLayout>
  );
}

export default LoginPage;

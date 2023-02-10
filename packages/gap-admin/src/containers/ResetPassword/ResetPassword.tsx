import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation } from 'react-router';
import { Box, Button, CircularProgress, FormHelperText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import InputFieldPassword from 'gap-common/src/components/InputFieldPassword';
import Dialog from 'gap-common/src/components/Dialog';
import * as Validation from 'gap-common/src/constants/validation';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { REQUEST_STATUS } from '../../constants/common';
import { PRIMARY_COLOR } from '../../themes/Colors';
import AccessLayout from '../AccessLayout';
import {
  resetPasswordRequest,
  selectResetPasswordSlice,
  clearAPIMessage,
  clearInitialState,
  verifyTokenRequest,
} from './reducer';
import history from '../../utils/history';
import CLIENT_PATH from '../../constants/clientPath';
import useDidMountEffect from '../../utils/useDidMountEffect';
import utils from '../../utils';

export interface IResetPassword {
  password: string;
  repeatPassword: string;
}

function ResetPasswordPage() {
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
      Validation.PASSWORD_NOT_MATCH_MESSAGE,
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
    { type: 'min', message: Validation.PASSWORD_MIN_LENGTH_MESSAGE },
    {
      type: 'hasUpperCase',
      message: Validation.PASSWORD_CAPITAL_CHARACTER_MESSAGE,
    },
    { type: 'hasNumber', message: Validation.PASSWORD_NUMBER_MESSAGE },
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

  const { resetPasswordStatus, resetPasswordMessage, postVerifyTokenStatus } =
    useAppSelector(selectResetPasswordSlice);

  const location = useLocation();
  const token = utils.getParameterByName('token', location.search);

  const handleSubmit = (data) => {
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
    if (postVerifyTokenStatus === REQUEST_STATUS.REQUESTING) {
      setOnSubmitLoading(true);
    } else {
      setOnSubmitLoading(false);
    }
  }, [postVerifyTokenStatus]);

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
      title="Create new password"
      subTitle="Your new password must be different from previous password."
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <InputFieldPassword
          name="password"
          label="New password"
          form={form}
          showValidateCriteria
          validateCriterias={passwordValidateCriteria}
          onChange={() => {
            dispatch(clearAPIMessage());
          }}
        />

        <InputFieldPassword
          name="repeatPassword"
          label="Confirm new password"
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
          startIcon={
            onSubmitLoading && <CircularProgress size={14} color="secondary" />
          }
          style={{ marginTop: 4 }}
        >
          Reset password
        </Button>
      </form>
      <Box className="link_redirect">
        Remember your password? <Link to={CLIENT_PATH.LOGIN}>Login now</Link>
      </Box>
      <Dialog
        maxWidth="391px"
        isContentAlignCenter
        isOpenDialog={isOpenDialog}
        title="Congratulations"
        urlIcon={
          <CheckCircleIcon
            style={{ color: PRIMARY_COLOR, width: 104, height: 104 }}
          />
        }
      >
        <div className="description">
          <p>You have successfully reset your password</p>
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

export default ResetPasswordPage;

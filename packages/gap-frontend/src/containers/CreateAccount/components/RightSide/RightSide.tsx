import InputField from 'gap-common/src/components/InputField';
import InputFieldPassword from 'gap-common/src/components/InputFieldPassword';
import * as Validation from 'gap-common/src/constants/validation';
import React, { useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormHelperText,
  FormLabel,
  Link,
  Typography,
} from '@mui/material';

import checkedIcon from '../../../../assets/images/icon_checked.svg';
import uncheckedIcon from '../../../../assets/images/icon_unchecked.svg';
import SelectLanguage from '../../../../components/SelectLanguage';
import TermOfUseDialog from '../../../../components/TermOfUseDialog';
import CLIENT_PATH from '../../../../constants/clientPath';
import { REQUEST_STATUS } from '../../../../constants/common';
import { KEY } from '../../../../constants/cookie';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { BLACK_COLOR } from '../../../../themes/Colors';
import { useBreakPoints } from '../../../../utils/customHooks';
import history from '../../../../utils/history';
import useDidMountEffect from '../../../../utils/useDidMountEffect';
import {
  clearAPIMessage,
  selectCreateAccountSlice,
  signupRequest,
} from '../../reducer';

interface ICreateAccountInputs {
  email: string;
  password: string;
  repeatPassword: string;
}

function RightSide() {
  const { t, i18n } = useTranslation();
  const { isScreenSm } = useBreakPoints();
  const [language, setLanguage] = useState<string>(i18n.language);
  const [cookies] = useCookies([KEY]);

  const handleChangeLanguage = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  const dispatch = useAppDispatch();
  const { signupStatus, signupMessage } = useAppSelector(
    selectCreateAccountSlice,
  );

  const [checkedFullCondition, setCheckedFullCondition] =
    useState<boolean>(false);
  const [checkedTermOfUse, setCheckedTermOfUse] = useState<boolean>(false);
  const [openFullCondition, setOpenFullCondition] = useState<boolean>(false);
  const [openTermOfUse, setOpenTermOfUse] = useState<boolean>(false);

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(Validation.EMAIL_FORMAT_MESSAGE)
      .required(Validation.EMAIL_REQUIRED_MESSAGE),
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

  const form = useForm<ICreateAccountInputs>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    criteriaMode: 'all',
    resolver: yupResolver(schema),
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

  const enableCreateAccount = useMemo(() => {
    return checkedFullCondition && checkedTermOfUse;
  }, [checkedFullCondition, checkedTermOfUse]);

  const [onSubmitLoading, setOnSubmitLoading] = useState(false);

  const handleSubmit = (data: ICreateAccountInputs) => {
    const current_cookie = cookies.gap_personnel_welcome;
    dispatch(
      signupRequest({
        email: data.email?.toLowerCase(),
        password: data.password,
        cookie: current_cookie,
      }),
    );
  };

  useEffect(() => {
    if (signupStatus === REQUEST_STATUS.REQUESTING) {
      setOnSubmitLoading(true);
    } else {
      setOnSubmitLoading(false);
    }
    if (signupStatus === REQUEST_STATUS.SUCCESS) {
      history.replace(CLIENT_PATH.LOGIN);
    }

    return () => {
      dispatch(clearAPIMessage());
    };
  }, [signupStatus]);

  return (
    <Box>
      <Box
        px={isScreenSm ? 15 : 5}
        py={isScreenSm ? 15 : 15}
        display="flex"
        flexDirection="column"
      >
        <Box mb={isScreenSm ? 0 : 6}>
          <Typography variant="h2" color="primary.main">
            {t<string>('create_account.header')}
          </Typography>
          <Typography variant="subtitle3" color={BLACK_COLOR}>
            {t<string>('create_account.sub_header')}
          </Typography>
        </Box>
        <form noValidate onSubmit={form.handleSubmit(handleSubmit)}>
          <Box mt={2.5}>
            <InputField
              form={form}
              type="email"
              name="email"
              label={t<string>('create_account.form.email.label')}
              placeholder={t<string>('create_account.form.email.placeholder')}
              style={{ marginBottom: 24 }}
            />
          </Box>
          <Box>
            <InputFieldPassword
              form={form}
              name="password"
              label={t<string>('create_account.form.password.label')}
              placeholder={t<string>(
                'create_account.form.password.placeholder',
              )}
              showValidateCriteria
              validateCriterias={passwordValidateCriteria}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />
          </Box>
          <Box>
            <InputFieldPassword
              form={form}
              name="repeatPassword"
              label={t<string>('create_account.form.repeat_password.label')}
              placeholder={t<string>(
                'create_account.form.repeat_password.placeholder',
              )}
              onChange={() => {
                dispatch(clearAPIMessage());
              }}
            />
          </Box>
          <Box>
            {signupMessage && (
              <FormHelperText className="text_error" error>
                {signupMessage}
              </FormHelperText>
            )}
          </Box>
          <Box mt={4} display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" width="100%">
              <Checkbox
                id="checkbox_full_condition"
                checkedIcon={
                  <Avatar
                    src={checkedIcon}
                    variant="rounded"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                icon={
                  <Avatar
                    src={uncheckedIcon}
                    variant="rounded"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                onChange={() => setCheckedFullCondition(!checkedFullCondition)}
              />
              <Typography variant="label" component="span">
                <FormLabel htmlFor="checkbox_full_condition">
                  <Typography variant="label" component="span">
                    <>
                      {t<string>(
                        'create_account.agreement.checkbox_full_condition',
                      )}{' '}
                    </>
                  </Typography>
                </FormLabel>
                <Typography
                  component="span"
                  variant="link"
                  onClick={() => setOpenFullCondition(true)}
                >
                  {t<string>('create_account.agreement.full_condition')}
                </Typography>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" width="100%">
              <Checkbox
                id="checkbox_full_term_of_use"
                checkedIcon={
                  <Avatar
                    src={checkedIcon}
                    variant="rounded"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                icon={
                  <Avatar
                    src={uncheckedIcon}
                    variant="rounded"
                    sx={{ width: 20, height: 20 }}
                  />
                }
                onChange={() => setCheckedTermOfUse(!checkedTermOfUse)}
              />
              <Typography variant="label" component="span">
                <FormLabel htmlFor="checkbox_full_term_of_use">
                  <Typography variant="label" component="span">
                    <>
                      {t<string>(
                        'create_account.agreement.checkbox_full_term_of_use',
                      )}{' '}
                    </>
                  </Typography>
                </FormLabel>
                <Typography
                  component="span"
                  variant="link"
                  onClick={() => setOpenTermOfUse(true)}
                >
                  {t<string>('create_account.agreement.term_of_use')}
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={!enableCreateAccount || onSubmitLoading}
              startIcon={
                onSubmitLoading && (
                  <CircularProgress size={14} color="secondary" />
                )
              }
            >
              {t<string>('create_account.form.button_create_account')}
            </Button>
          </Box>
        </form>
        <Box mt={2.5} display="flex" justifyContent="center">
          <Typography variant="label">
            <>{t<string>('create_account.have_account_question')} </>
            <Link
              to={CLIENT_PATH.LOGIN}
              underline="none"
              component={RouterLink}
            >
              {t<string>('create_account.login_message')}
            </Link>
          </Typography>
        </Box>

        <Box mt={4} display="flex" justifyContent="center">
          <SelectLanguage
            language={language}
            handleOnChange={handleChangeLanguage}
          />
        </Box>
      </Box>
      <TermOfUseDialog
        open={openFullCondition}
        onClickClose={() => setOpenFullCondition(false)}
      />
      <TermOfUseDialog
        open={openTermOfUse}
        onClickClose={() => setOpenTermOfUse(false)}
      />
    </Box>
  );
}

export default React.memo(RightSide);

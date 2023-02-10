import InputField from 'gap-common/src/components/InputField';
import RadioGroup from 'gap-common/src/components/RadioGroup';
import { CONTENT_COLOR, PRIMARY_COLOR } from 'gap-common/src/themes/Colors';
import React, { memo, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { MessageParams } from 'yup/lib/types';

import {
  DEFAULT_INPUT_FIELD_MAX_CHARACTERS,
  REQUEST_STATUS,
} from '../../../../constants/common';
import {
  CANDIDATE_JOB_PROGRESS_STATUS,
  CANDIDATE_JOB_PROGRESS_TYPE,
} from '../../../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import ProgressesService from '../../../../services/ProgressesService';
import { useBreakPoints } from '../../../../utils/customHooks';
import { setErrorMessages } from '../../../Global/reducer';
import {
  getFinancialInformationRequest,
  selectMeFinancialInformationSlice,
  updateFinancialInformationRequest,
} from '../../reducers/meFinancialInformation';
import {
  getProgressesRequest,
  selectProgressesSlice,
} from '../../reducers/progresses';

import type { JobOption } from '../../RegistrationJourney';
import type { Progress } from '../../../../types/models';

export interface FinancialInformationForm {
  isUkBankAccount: boolean;
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankSortCode: string;
}

interface BankFormInterface {
  form: UseFormReturn<FinancialInformationForm, any>;
  // the <RadioGroup> transforms boolean type to string type
  isUkBankAccount: string;
}

const BankForm = (props: BankFormInterface) => {
  const { form, isUkBankAccount } = props;
  const { t } = useTranslation();

  switch (isUkBankAccount) {
    case 'true':
      return (
        <>
          <Grid item xs={12} md={8} mb={6}>
            <InputField
              required
              name="bankName"
              label={t<string>(
                'registrationJourney:financial_information.body.bank_name',
              )}
              placeholder={t<string>(
                'registrationJourney:financial_information.body.bank_name_placeholder',
              )}
              form={form}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} md={4} mb={6}>
            <InputField
              required
              name="accountNumber"
              label={t<string>(
                'registrationJourney:financial_information.body.account_number',
              )}
              placeholder={t<string>(
                'registrationJourney:financial_information.body.account_number_placeholder',
              )}
              form={form}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} md={8} mb={6}>
            <InputField
              required
              name="accountName"
              label={t<string>(
                'registrationJourney:financial_information.body.account_name',
              )}
              placeholder={t<string>(
                'registrationJourney:financial_information.body.account_name_placeholder',
              )}
              form={form}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} md={4} mb={6}>
            <InputField
              required
              name="bankSortCode"
              label={t<string>(
                'registrationJourney:financial_information.body.bank_sort_code',
              )}
              placeholder={t<string>(
                'registrationJourney:financial_information.body.bank_sort_code_placeholder',
              )}
              form={form}
              disabled={false}
            />
          </Grid>
        </>
      );
    case 'false':
      return (
        <>
          <Typography variant="subtitle2" color={CONTENT_COLOR}>
            {t<string>(
              'registrationJourney:financial_information.body.no_uk_bank_account.title_1',
            )}
            <Typography
              component="a"
              href="https://www.onepay.co.uk/"
              target="_blank"
              color={PRIMARY_COLOR}
              sx={{ textDecoration: 'none' }}
            >
              {t<string>(
                'registrationJourney:financial_information.body.no_uk_bank_account.title_2',
              )}
            </Typography>
            {t<string>(
              'registrationJourney:financial_information.body.no_uk_bank_account.title_3',
            )}
          </Typography>
          <Typography variant="subtitle2" color={CONTENT_COLOR}>
            {' '}
            {t<string>(
              'registrationJourney:financial_information.body.no_uk_bank_account.title_4',
            )}
          </Typography>
        </>
      );
    default:
      return null;
  }
};

const DEFAULT_FORM_VALUES: FinancialInformationForm = {
  isUkBankAccount: null,
  bankName: '',
  accountNumber: '',
  accountName: '',
  bankSortCode: '',
};

const radioOptions = [
  {
    value: true,
    option: 'Yes',
  },
  {
    value: false,
    option: 'No',
  },
];

interface FinancialInformationProps {
  selectedJob: JobOption;
}

const FinancialInformation = (props: FinancialInformationProps) => {
  const { selectedJob } = props;
  const { t } = useTranslation();
  const { isScreenSm } = useBreakPoints();

  const [isInSubmitMode, setIsInSubmitMode] = useState(false);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { progresses } = useAppSelector(selectProgressesSlice);
  const financialInformationProgress: Progress = progresses.find(
    (progress: Progress) => {
      return (
        progress.type === CANDIDATE_JOB_PROGRESS_TYPE.FINANCIAL_INFORMATION
      );
    },
  );
  const { financialInformation, updateFinancialInformationStatus } =
    useAppSelector(selectMeFinancialInformationSlice);

  const showMaxCharactersMessage = (
    params: {
      max: number;
    } & MessageParams,
  ) =>
    t('validation:common.max_characters', {
      max: params.max,
    });

  const schema = Yup.object().shape({
    isUkBankAccount: Yup.boolean()
      .required(t('validation:common.required'))
      .nullable(),
    bankName: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    accountNumber: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    accountName: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    bankSortCode: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
  });

  const form = useForm<FinancialInformationForm>({
    mode: 'onChange',
    defaultValues: DEFAULT_FORM_VALUES,
    criteriaMode: 'all',
    resolver: yupResolver(schema),
  });

  const updateProgressStatus = (status: CANDIDATE_JOB_PROGRESS_STATUS) =>
    ProgressesService.updateProgress(
      CANDIDATE_JOB_PROGRESS_TYPE.FINANCIAL_INFORMATION,
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

  const createPayload = (data: FinancialInformationForm) => {
    return {
      is_uk_bank_account: data.isUkBankAccount,
      bank_name: data.bankName,
      account_number: data.accountNumber,
      account_name: data.accountName,
      bank_sort_code: data.bankSortCode,
      can_skip_validation: false,
    };
  };

  const submitForm = (data: FinancialInformationForm) => {
    if (String(data.isUkBankAccount) === 'true') {
      setIsInSubmitMode(true);
      const payload = createPayload(data);
      dispatch(updateFinancialInformationRequest(payload));
    }
  };

  const handleSaveProgress = () => {
    const data = form.getValues();
    if (String(data.isUkBankAccount) === 'true') {
      setIsInSubmitMode(false);
      const payload = createPayload(data);
      payload.can_skip_validation = true;
      dispatch(updateFinancialInformationRequest(payload));
    }
  };

  const isUkBankAccount = form.watch('isUkBankAccount');

  useEffect(() => {
    dispatch(getFinancialInformationRequest());
  }, []);

  useEffect(() => {
    if (financialInformation) {
      form.reset({
        isUkBankAccount:
          financialInformation.is_uk_bank_account ||
          DEFAULT_FORM_VALUES.isUkBankAccount,
        bankName:
          financialInformation.bank_name || DEFAULT_FORM_VALUES.bankName,
        accountNumber:
          financialInformation.account_number ||
          DEFAULT_FORM_VALUES.accountNumber,
        accountName:
          financialInformation.account_name || DEFAULT_FORM_VALUES.accountName,
        bankSortCode:
          financialInformation.bank_sort_code ||
          DEFAULT_FORM_VALUES.bankSortCode,
      });
    }
  }, [financialInformation]);

  useEffect(() => {
    setOnSubmitLoading(
      updateFinancialInformationStatus === REQUEST_STATUS.REQUESTING,
    );
    if (updateFinancialInformationStatus === REQUEST_STATUS.SUCCESS) {
      if (isInSubmitMode) {
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED);
      } else {
        updateProgressStatus(CANDIDATE_JOB_PROGRESS_STATUS.IN_PROGRESS);
      }
    }
  }, [updateFinancialInformationStatus]);

  useEffect(() => {
    form.clearErrors();
  }, [isUkBankAccount]);

  return (
    <>
      <Box mb={8}>
        <Typography variant="subtitle1">
          {t<string>('registrationJourney:financial_information.header.title')}
        </Typography>
        <Typography variant="subtitle2" color={CONTENT_COLOR} fontWeight={400}>
          {t<string>(
            'registrationJourney:financial_information.header.subtitle',
          )}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <form noValidate onSubmit={form.handleSubmit(submitForm)}>
          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid container spacing={{ xs: 2 }}>
              <Grid item xs={12} md={8} mb={6} color={CONTENT_COLOR}>
                <Typography color="text.content" variant="body2">
                  {t<string>(
                    'registrationJourney:financial_information.body.have_uk_bank_account',
                  )}
                  &nbsp;
                  <Box component="span" color="text.error">
                    *
                  </Box>
                </Typography>
                <RadioGroup
                  form={form}
                  options={radioOptions}
                  name="isUkBankAccount"
                />
              </Grid>

              <BankForm form={form} isUkBankAccount={String(isUkBankAccount)} />
            </Grid>

            <Grid item xs={12} md={8} mb={6} color={CONTENT_COLOR}>
              {updateFinancialInformationStatus === REQUEST_STATUS.SUCCESS &&
                financialInformationProgress?.progress ===
                  CANDIDATE_JOB_PROGRESS_STATUS.COMPLETED && (
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CheckIcon fontSize="small" sx={{ color: green[500] }} />{' '}
                    <Typography color="text.success" variant="body2">
                      {t<string>(
                        'registrationJourney:financial_information.body.bank_account_verify_success',
                      )}
                    </Typography>
                  </Stack>
                )}
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

export default memo(FinancialInformation);

import ControlAutocompleteField from 'gap-common/src/components/AutocompleteField';
import DatePicker from 'gap-common/src/components/DatePicker';
import InputField from 'gap-common/src/components/InputField';
import RadioButtonGroup from 'gap-common/src/components/RadioGroup';
import capitalize from 'lodash/capitalize';
import isNaN from 'lodash/isNaN';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import type { OptionsType } from 'gap-common/src/components/AutocompleteField';
import type { MessageParams } from 'yup/lib/types';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { top } from '@popperjs/core';

import {
  EMPLOYMENT_STATUS,
  HISTORY_TYPE,
} from 'gap-common/src/constants/enums';
import type { EmploymentHistory } from 'gap-common/src/types/models/EmploymentHistory';
import { DEFAULT_INPUT_FIELD_MAX_CHARACTERS } from '../../../../constants/common';
import { useAppDispatch } from '../../../../redux/hooks';
import { useBreakPoints } from '../../../../utils/customHooks';
import {
  addEmploymentHistory as addEmploymentHistoryAction,
  updateEmploymentHistory as updateEmploymentHistoryAction,
  deleteEmploymentHistory as deleteEmploymentHistoryAction,
} from '../../reducers/employmentHistories';

interface EmploymentHistoryForm {
  id: number;
  company_name: string;
  job_title: string;
  start_date: Date;
  end_date: Date;
  history_type: HISTORY_TYPE;
  employment_status: EMPLOYMENT_STATUS;
  job_description: string;
}

export type { EmploymentHistoryForm };

interface EmploymentHistoryModalProps {
  isOpen: boolean;
  handleClose: () => void;
  selectedEmploymentHistory: EmploymentHistory;
}

const DEFAULT_FORM_VALUES: EmploymentHistoryForm = {
  id: null,
  company_name: '',
  job_title: '',
  start_date: null,
  end_date: null,
  history_type: HISTORY_TYPE.EMPLOYMENT,
  employment_status: EMPLOYMENT_STATUS.FULLTIME,
  job_description: '',
};

const EmploymentHistoryModal = (props: EmploymentHistoryModalProps) => {
  const { isOpen, handleClose, selectedEmploymentHistory } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isScreenSm } = useBreakPoints();

  const showMaxCharactersMessage = (
    params: {
      max: number;
    } & MessageParams,
  ) =>
    t('validation:common.max_characters', {
      max: params.max,
    });

  const schema = Yup.object().shape({
    company_name: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    job_title: Yup.string().when('history_type', {
      is: (value: HISTORY_TYPE) => value === HISTORY_TYPE.EMPLOYMENT,
      then: (schema) =>
        schema
          .required(t('validation:common.required'))
          .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
      otherwise: (schema) => schema.nullable(),
    }),
    start_date: Yup.date().typeError(t('validation:common.required')),
    end_date: Yup.date()
      .typeError(t('validation:common.required'))
      .when('start_date', {
        is: (start_date: Date) => {
          return start_date instanceof Date && !isNaN(start_date.valueOf());
        },
        then: (schema) =>
          schema.test({
            name: 'end_date_test',
            test: (end_date: Date, testContext) => {
              const { start_date } = testContext.parent;
              return end_date.getTime() >= start_date.getTime();
            },
            message: t('validation:common.end_date'),
          }),
      }),
    history_type: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
    employment_status: Yup.string().when('history_type', {
      is: (value: HISTORY_TYPE) => value === HISTORY_TYPE.EMPLOYMENT,
      then: (schema) => schema.required(t('validation:common.required')),
      otherwise: (schema) => schema.nullable(),
    }),
    job_description: Yup.string()
      .required(t('validation:common.required'))
      .max(DEFAULT_INPUT_FIELD_MAX_CHARACTERS, showMaxCharactersMessage),
  });

  const form = useForm<EmploymentHistoryForm>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const selectedHistoryType = form.watch('history_type');

  const historyTypes = [
    HISTORY_TYPE.EMPLOYMENT,
    HISTORY_TYPE.EDUCATION,
    HISTORY_TYPE.OTHER,
  ];

  const historyOptionTypes: OptionsType[] = historyTypes.map((historyType) => {
    return {
      label: capitalize(historyType),
      value: historyType,
    };
  });

  let company_name_title = t<string>(
    'registrationJourney:employment_history.employment_history_modal.body.company_name',
  );
  if (selectedHistoryType === HISTORY_TYPE.EDUCATION)
    company_name_title = t<string>(
      'registrationJourney:employment_history.employment_history_modal.body.institution_name',
    );
  if (selectedHistoryType === HISTORY_TYPE.OTHER)
    company_name_title = t<string>(
      'registrationJourney:employment_history.employment_history_modal.body.title_name',
    );

  const updateEmploymentHistory = (payload: EmploymentHistoryForm) => {
    dispatch(
      updateEmploymentHistoryAction({
        ...payload,
        start_date: moment(payload.start_date).format('YYYY-MM-DD'),
        end_date: moment(payload.end_date).format('YYYY-MM-DD'),
      }),
    );
    handleClose();
  };

  const addEmploymentHistory = (payload: EmploymentHistoryForm) => {
    dispatch(
      addEmploymentHistoryAction({
        ...payload,
        start_date: moment(payload.start_date).format('YYYY-MM-DD'),
        end_date: moment(payload.end_date).format('YYYY-MM-DD'),
      }),
    );
    handleClose();
  };

  const handleDelete = () => {
    dispatch(
      deleteEmploymentHistoryAction({
        id: selectedEmploymentHistory.id,
      }),
    );
    handleClose();
  };

  const submitForm = (data: EmploymentHistoryForm) => {
    const payload = {
      ...data,
      job_title:
        data.history_type !== HISTORY_TYPE.EMPLOYMENT
          ? data.history_type
          : data.job_title,
      employment_status:
        data.history_type === HISTORY_TYPE.EMPLOYMENT
          ? data.employment_status
          : EMPLOYMENT_STATUS.FULLTIME,
    };

    if (selectedEmploymentHistory) updateEmploymentHistory(payload);
    else addEmploymentHistory(payload);
  };

  useEffect(() => {
    if (isOpen && selectedEmploymentHistory) {
      const formData: EmploymentHistoryForm = {
        ...selectedEmploymentHistory,
        start_date: new Date(selectedEmploymentHistory.start_date),
        end_date: new Date(selectedEmploymentHistory.end_date),
      };
      form.reset(formData);
    }
    return () => {
      if (!isOpen) form.reset(DEFAULT_FORM_VALUES);
    };
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      fullWidth={!isScreenSm}
      PaperProps={{
        style: { borderRadius: 20 },
      }}
    >
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Box px={5} py={6} minWidth={isScreenSm ? 447 : 'auto'}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={8}
          >
            <Typography variant="subtitle1">
              {t<string>(
                `registrationJourney:employment_history.employment_history_modal.header.title_${
                  selectedEmploymentHistory ? 'update' : 'add'
                }`,
              )}
            </Typography>
            <Box width="50%">
              <Controller
                name="history_type"
                control={form.control}
                render={({ field }) => {
                  return (
                    <ControlAutocompleteField
                      fullWidth
                      options={historyOptionTypes}
                      value={historyOptionTypes.find(
                        (historyOptionType) =>
                          historyOptionType.value === selectedHistoryType,
                      )}
                      onSelect={(historyType: OptionsType) => {
                        field.onChange(historyType.value);
                      }}
                    />
                  );
                }}
              />
            </Box>
          </Box>

          {selectedHistoryType === HISTORY_TYPE.EMPLOYMENT && (
            <Box display="flex" flexDirection="column" mb={4}>
              <Typography color="text.content" variant="caption">
                {t<string>(
                  'registrationJourney:employment_history.employment_history_modal.body.type_of_work',
                )}
                &nbsp;
                <Box component="span" color="text.error">
                  *
                </Box>
              </Typography>
              <RadioButtonGroup
                form={form}
                row={isScreenSm}
                options={[
                  {
                    value: EMPLOYMENT_STATUS.FULLTIME,
                    option: t<string>(
                      'registrationJourney:employment_history.body.full_time',
                    ),
                  },
                  {
                    value: EMPLOYMENT_STATUS.PARTTIME,
                    option: t<string>(
                      'registrationJourney:employment_history.body.part_time',
                    ),
                  },
                ]}
                name="employment_status"
              />
            </Box>
          )}

          <Box mb={4}>
            <InputField
              form={form}
              name="company_name"
              label={company_name_title}
              required
            />
          </Box>

          {selectedHistoryType === HISTORY_TYPE.EMPLOYMENT && (
            <Box mb={4}>
              <InputField
                form={form}
                name="job_title"
                label={t<string>(
                  'registrationJourney:employment_history.employment_history_modal.body.job_title',
                )}
                required
              />
            </Box>
          )}

          <Box mb={4}>
            <DatePicker
              form={form}
              name="start_date"
              label={t<string>(
                'registrationJourney:employment_history.employment_history_modal.body.start_date',
              )}
              required
              disabled={false}
              placeholder=""
              popperPlacement={top}
            />
          </Box>

          <Box mb={4}>
            <DatePicker
              form={form}
              name="end_date"
              label={t<string>(
                'registrationJourney:employment_history.employment_history_modal.body.end_date',
              )}
              required
              disabled={false}
              placeholder=""
              popperPlacement={top}
            />
          </Box>

          <Box mb={6}>
            <InputField
              form={form}
              name="job_description"
              label={t<string>(
                'registrationJourney:employment_history.employment_history_modal.body.job_description',
              )}
              required
            />
          </Box>

          <Box display="flex" flexDirection="column" rowGap={3}>
            <Box display="flex" justifyContent="center" columnGap={3}>
              <Button variant="outlined" onClick={handleClose}>
                {t<string>(
                  'registrationJourney:employment_history.employment_history_modal.actions.close',
                )}
              </Button>
              <Button type="submit" variant="contained">
                {t<string>(
                  'registrationJourney:employment_history.employment_history_modal.actions.save',
                )}
              </Button>
            </Box>
            {selectedEmploymentHistory && (
              <Box display="flex" justifyContent="center">
                <Button variant="text" color="error" onClick={handleDelete}>
                  {t<string>(
                    'registrationJourney:employment_history.employment_history_modal.actions.delete',
                  )}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};

export default React.memo(EmploymentHistoryModal);

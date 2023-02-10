import ControlAutocompleteField from 'gap-common/src/components/AutocompleteField';
import DatePicker from 'gap-common/src/components/DatePicker';
import InputField from 'gap-common/src/components/InputField';
import RadioButtonGroup from 'gap-common/src/components/RadioGroup';
import type { OptionsType } from 'gap-common/src/components/AutocompleteField';
import type { EmploymentHistory } from 'gap-common/src/types/models/EmploymentHistory';
import {
  EMPLOYMENT_STATUS,
  HISTORY_TYPE,
} from 'gap-common/src/constants/enums';

import capitalize from 'lodash/capitalize';
import omit from 'lodash/omit';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { top } from '@popperjs/core';

import TextareaAutoSize from '../../../../../components/TextareaAutoSize';

interface EmploymentHistoryForm {
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

  const schema = Yup.object().shape({
    company_name: Yup.string(),
    job_title: Yup.string(),
    start_date: Yup.date(),
    end_date: Yup.date(),
    history_type: Yup.string(),
    employment_status: Yup.string(),
    job_description: Yup.string(),
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

  const getHistoryTitle = (type: string) => {
    if (type === HISTORY_TYPE.EDUCATION) {
      return 'Institution name';
    }
    if (type === HISTORY_TYPE.OTHER) {
      return 'Title';
    }
    return 'Company Name';
  };

  const companyNameTitle = getHistoryTitle(selectedHistoryType);

  useEffect(() => {
    if (isOpen && selectedEmploymentHistory) {
      const formData: EmploymentHistoryForm = {
        ...omit(selectedEmploymentHistory, ['id']),
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
      PaperProps={{
        style: { borderRadius: 20 },
      }}
    >
      <form>
        <Box px={5} py={6} minWidth={447}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={8}
          >
            <Typography variant="subtitle1">Record</Typography>
            <Box width="50%">
              <Controller
                name="history_type"
                control={form.control}
                render={({ field }) => {
                  return (
                    <ControlAutocompleteField
                      fullWidth
                      disabled
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
                Type of work{' '}
                <Box component="span" color="text.error">
                  *
                </Box>
              </Typography>
              <RadioButtonGroup
                disabled
                form={form}
                row
                options={[
                  {
                    value: EMPLOYMENT_STATUS.FULLTIME,
                    option: 'Full time',
                  },
                  {
                    value: EMPLOYMENT_STATUS.PARTTIME,
                    option: 'Part-time',
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
              label={companyNameTitle}
              $hasReadOnly
              required
            />
          </Box>

          {selectedHistoryType === HISTORY_TYPE.EMPLOYMENT && (
            <Box mb={4}>
              <InputField
                form={form}
                name="job_title"
                label="Job Title"
                $hasReadOnly
                required
              />
            </Box>
          )}

          <Box mb={4}>
            <DatePicker
              form={form}
              name="start_date"
              label="Start Date"
              required
              disabled={false}
              placeholder=""
              popperPlacement={top}
              readOnly
            />
          </Box>

          <Box mb={4}>
            <DatePicker
              form={form}
              name="end_date"
              label="End Date"
              required
              disabled={false}
              placeholder=""
              popperPlacement={top}
              readOnly
            />
          </Box>

          <Box mb={6}>
            <Controller
              name="job_description"
              control={form.control}
              render={({ field }) => {
                return (
                  <TextareaAutoSize
                    minRows={8}
                    placeholder="This is a placeholder"
                    value={field.value}
                    style={{
                      width: '100%',
                      marginTop: '12px',
                    }}
                  />
                );
              }}
            />
          </Box>

          <Box display="flex" flexDirection="column" rowGap={3}>
            <Box display="flex" justifyContent="center" columnGap={3}>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Dialog>
  );
};

export default React.memo(EmploymentHistoryModal);

import 'react-datepicker/dist/react-datepicker.css';

import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, UseFormReturn } from 'react-hook-form';
import InputMask from 'react-input-mask';

import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Placement } from '@popperjs/core';

import Images from '../../../../gap-admin/src/assets/images';
import { Wrapper } from './style';

interface DatePickerComponentProps {
  label: string;
  required: boolean;
  form: UseFormReturn<any, any>;
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder: string;
  popperPlacement?: Placement;
  maxDate?: Date;
}

const DatePickerComponent = ({
  label,
  required,
  form,
  name,
  disabled,
  placeholder,
  readOnly,
  popperPlacement,
  maxDate,
}: DatePickerComponentProps) => {
  const { formState } = form;
  const hasError = formState.errors[name];

  return (
    <Wrapper>
      <Controller
        control={form.control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            {label && (
              <Box pb={2}>
                <Typography
                  color={hasError ? 'text.error' : 'text.content'}
                  variant="caption"
                >
                  {label}{' '}
                </Typography>
                {required && (
                  <Typography component="span" color="text.error">
                    *
                  </Typography>
                )}
              </Box>
            )}
            <DatePicker
              readOnly={readOnly}
              dateFormat="dd/MM/yyyy"
              maxDate={maxDate}
              popperPlacement={popperPlacement}
              renderCustomHeader={({
                monthDate,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    className="btn_decrease"
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    <NavigateNextRoundedIcon />
                  </Button>

                  <span className="react-datepicker__current-month">
                    {monthDate
                      .toLocaleString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })
                      .replace(' ', ' - ')}
                  </span>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    <NavigateNextRoundedIcon />
                  </Button>
                </div>
              )}
              selected={value || ''}
              formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
              disabled={disabled}
              onChange={(e) => {
                onChange(e);
              }}
              popperProps={{ strategy: 'fixed' }}
              customInput={
                <InputMask mask="99/99/9999">
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      placeholder={placeholder}
                      fullWidth
                      variant="outlined"
                      error={Boolean(form.formState.errors[name])}
                      helperText={form.formState.errors[name]?.message}
                      InputProps={{
                        endAdornment: (
                          <img
                            src={Images.icon_calendar}
                            width="18"
                            height="18"
                            alt="Time picker"
                          />
                        ),
                      }}
                    />
                  )}
                </InputMask>
              }
            />
          </>
        )}
      />
    </Wrapper>
  );
};

DatePickerComponent.defaultProps = {
  popperPlacement: 'auto',
  disabled: false,
  readOnly: false,
  maxDate: null,
};

export default DatePickerComponent;
